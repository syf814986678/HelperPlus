package com.shiyifan.interceptor;

import com.alibaba.druid.util.StringUtils;
import com.aliyun.oss.common.utils.BinaryUtil;
import com.google.gson.Gson;
import com.shiyifan.JwtUtil;
import com.shiyifan.ResultUtil;
import com.shiyifan.pojo.CodeState;
import io.jsonwebtoken.Claims;
import lombok.extern.log4j.Log4j2;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;

/**
 * @author ZouCha
 * @name MyJwtInterceptor
 * @date 2020-11-20 15:22:10
 **/
@Component
@Log4j2
public class JwtInterceptor implements HandlerInterceptor {

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * @return boolean
     * @author ZouCha
     * @date 2020-11-20 15:22:16
     * @method preHandle
     * @params [request, response, handler]
     **/
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        try {
            //1.通过request获取请求头
            String authorization = request.getHeader("Authorization");
            //获取oss请求头
            String pubKey = request.getHeader("x-oss-pub-key-url");
            //2.判断请求头是否为空或者以Bearer开头
            if (!StringUtils.isEmpty(authorization)) {
                if (!StringUtils.isEmpty(pubKey)) {
                    byte[] authorizationByte = BinaryUtil.fromBase64String(authorization);
                    byte[] pubKeyByte = BinaryUtil.fromBase64String(pubKey);
                    String pubKeyAddr = new String(pubKeyByte);
                    String ossCallbackBody = getPostBody(request.getInputStream(), Integer.parseInt(request.getHeader("content-length")));
                    if (pubKeyAddr.startsWith("http://gosspublic.alicdn.com/") || pubKeyAddr.startsWith("https://gosspublic.alicdn.com/")) {
                        String retString = executeGet(pubKeyAddr);
                        retString = retString.replace("-----BEGIN PUBLIC KEY-----", "");
                        retString = retString.replace("-----END PUBLIC KEY-----", "");
                        String queryString = request.getQueryString();
                        String uri = request.getRequestURI();
                        String authStr = URLDecoder.decode(uri, StandardCharsets.UTF_8);
                        if (queryString != null && !"".equals(queryString)) {
                            authStr += "?" + queryString;
                        }
                        authStr += "\n" + ossCallbackBody;
                        if (doCheck(authStr, authorizationByte, retString)) {
                            String[] strings = ossCallbackBody.split("&");
                            for (String string : strings) {
                                String[] split = string.split("=");
                                request.setAttribute(split[0], URLDecoder.decode(split[1], StandardCharsets.UTF_8));
                            }
                            return true;
                        } else {
                            returnJson(response, 0);
                        }
                    } else {
                        returnJson(response, 0);
                    }
                } else {
                    if (authorization.startsWith("Bearer")) {
                        String token = authorization.replace("Bearer ", "");
                        Claims claims = jwtUtil.parseToken(token);
                        if (claims != null) {
                            request.setAttribute(CodeState.USER_CLAIMS_STR, claims);
                            return true;
                        } else {
                            returnJson(response, 0);
                        }
                    } else {
                        returnJson(response, 0);
                    }
                }
            } else {
                returnJson(response, 0);
            }
        } catch (io.jsonwebtoken.MalformedJwtException | io.jsonwebtoken.SignatureException e) {
            returnJson(response, 0);
        } catch (io.jsonwebtoken.ExpiredJwtException e) {
            returnJson(response, 1);
        } catch (Exception e) {
            log.error(e);
        }
        return false;
    }

    /**
     * type:0 tokenError,type:1 tokenTimeLimit
     *
     * @return void
     * @author ZouCha
     * @date 2020-12-05 12:27:23
     * @method returnJson
     * @params [response, type]
     **/
    private void returnJson(HttpServletResponse response, int type) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");
        try {
            PrintWriter writer = response.getWriter();
            if (type == 0) {
                writer.print(new Gson().toJson(ResultUtil.tokenError("TOKEN验证异常", null)));
            } else {
                writer.print(new Gson().toJson(ResultUtil.tokenTimeLimit("TOKEN已过期", null)));
            }
        } catch (IOException e) {
            log.error(e);
        }
    }

    /**
     * 获取public key
     *
     * @return java.lang.String
     * @author ZouCha
     * @date 2020-12-29 13:41:00
     * @method executeGet
     * @params [url]
     **/
    public String executeGet(String url) {
        BufferedReader in = null;

        String content = null;
        try {
            // 定义HttpClient
            @SuppressWarnings("resource")
            DefaultHttpClient client = new DefaultHttpClient();
            // 实例化HTTP方法
            HttpGet request = new HttpGet();
            request.setURI(new URI(url));
            HttpResponse response = client.execute(request);

            in = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            StringBuffer sb = new StringBuffer("");
            String line = "";
            String NL = System.getProperty("line.separator");
            while ((line = in.readLine()) != null) {
                sb.append(line + NL);
            }
            in.close();
            content = sb.toString();
        } catch (Exception e) {
            log.error(e);
        } finally {
            if (in != null) {
                try {
                    in.close();// 最后要关闭BufferedReader
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        return content;
    }

    /**
     * 获取Post消息体
     *
     * @return java.lang.String
     * @author ZouCha
     * @date 2020-12-29 13:44:59
     * @method GetPostBody
     * @params [is, contentLen]
     **/
    public String getPostBody(InputStream is, int contentLen) {
        if (contentLen > 0) {
            int readLen = 0;
            int readLengthThisTime = 0;
            byte[] message = new byte[contentLen];
            try {
                while (readLen != contentLen) {
                    readLengthThisTime = is.read(message, readLen, contentLen - readLen);
                    // Should not happen.
                    if (readLengthThisTime == -1) {
                        break;
                    }
                    readLen += readLengthThisTime;
                }
                return new String(message);
            } catch (IOException e) {
                log.error(e);
            }
        }
        return "";
    }

    /**
     * 验证RSA
     *
     * @return boolean
     * @author ZouCha
     * @date 2020-12-29 13:52:41
     * @method doCheck
     * @params [content, sign, publicKey]
     **/
    public static boolean doCheck(String content, byte[] sign, String publicKey) {
        try {
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            byte[] encodedKey = BinaryUtil.fromBase64String(publicKey);
            PublicKey pubKey = keyFactory.generatePublic(new X509EncodedKeySpec(encodedKey));
            java.security.Signature signature = java.security.Signature.getInstance("MD5withRSA");
            signature.initVerify(pubKey);
            signature.update(content.getBytes());
            return signature.verify(sign);

        } catch (Exception e) {
            log.error(e);
        }

        return false;
    }


}
