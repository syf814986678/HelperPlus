//package com.shiyifan;
//
//import com.aliyuncs.DefaultAcsClient;
//import com.aliyuncs.IAcsClient;
//import com.aliyuncs.cloudauth.model.v20190307.DescribeVerifyResultRequest;
//import com.aliyuncs.cloudauth.model.v20190307.DescribeVerifyResultResponse;
//import com.aliyuncs.cloudauth.model.v20190307.DescribeVerifyTokenRequest;
//import com.aliyuncs.cloudauth.model.v20190307.DescribeVerifyTokenResponse;
//import com.aliyuncs.http.ProtocolType;
//import com.aliyuncs.profile.DefaultProfile;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
///**
// * @author ZouCha
// * @name AliYunUtil
// * @date 2020-12-01 12:06
// **/
//@Component
//@Log4j2
//public class AliYunUtil {
//
//    @Value("${aliyun.accessKeyId}")
//    private String accessKeyId;
//
//    @Value("${aliyun.accessKeySecret}")
//    private String accessKeySecret;
//
//    public void aliyunCertificate() {
//        DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou",accessKeyId, accessKeySecret);
//        IAcsClient client = new DefaultAcsClient(profile);
//
//        //1. 接入方服务端发起认证请求，获得认证token，接口文档：
//        DescribeVerifyTokenRequest request = new DescribeVerifyTokenRequest();
////具体传参
////        request.setRegionId("cn-hangzhou");
//        request.setSysProtocol(ProtocolType.HTTPS);
//        request.setBizId("认证ID, 由接入方指定, 发起不同的认证任务需要更换不同的认证ID");
//        request.setBizType("实人认证控制台上创建场景时对应的场景标识"); //创建方法请参见https://help.aliyun.com/document_detail/127885.html
//        request.setName("用户正确的姓名");
//        request.setIdCardNumber("用户正确的身份证号");
//
//        DescribeVerifyTokenResponse response = client.getAcsResponse(request);
//        String verifyToken = response.getVerifyToken();
//
////2. 接入方服务端将token传递给接入方无线客户端
////3. 接入方无线客户端用token调起无线认证SDK
////4. 用户按照由无线认证SDK组织的认证流程页面的指引，提交认证资料
////5. 认证流程结束退出无线认证SDK，进入客户端回调函数
////6. 接入方服务端获取认证状态和认证资料（注：客户端无线认证SDK回调中也会携带认证状态, 但建议以服务端调接口获取的为准进行业务上的判断和处理）
////查询认证结果接口文档：https://help.aliyun.com/document_detail/154606.html
//        DescribeVerifyResultRequest verifyResultRequest = new DescribeVerifyResultRequest();
////具体传参
//        verifyResultRequest.setRegionId("cn-hangzhou");
//        verifyResultRequest.setSysProtocol(ProtocolType.HTTPS);
//        verifyResultRequest.setBizId("调用DescribeVerifyToken时传入的bizId");
//        verifyResultRequest.setBizType("调用DescribeVerifyToken时传入的bizType");
//
//        DescribeVerifyResultResponse verifyResultResponse = client.getAcsResponse(verifyResultRequest);
//
////常见问题：https://help.aliyun.com/document_detail/127993.html
////        DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, accessKeySecret);
////        IAcsClient client = new DefaultAcsClient(profile);
////        RefreshDcdnObjectCachesRequest request = new RefreshDcdnObjectCachesRequest();
////        request.setObjectPath(path);
////        try {
////            RefreshDcdnObjectCachesResponse response = client.getAcsResponse(request);
////            log.info(new Gson().toJson(response));
////        } catch (ClientException e) {
////            log.error("阿里云刷新Dcdn错误"+e.toString());
////            throw new ClientException("阿里云刷新Dcdn错误"+e.toString());
////        }
//    }
//
//}
