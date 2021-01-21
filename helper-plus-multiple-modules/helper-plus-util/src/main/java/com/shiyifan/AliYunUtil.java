//package com.shiyifan;
//
//import com.aliyuncs.DefaultAcsClient;
//import com.aliyuncs.IAcsClient;
//import com.aliyuncs.dcdn.model.v20180115.PreloadDcdnObjectCachesRequest;
//import com.aliyuncs.dcdn.model.v20180115.PreloadDcdnObjectCachesResponse;
//import com.aliyuncs.dcdn.model.v20180115.RefreshDcdnObjectCachesRequest;
//import com.aliyuncs.dcdn.model.v20180115.RefreshDcdnObjectCachesResponse;
//import com.aliyuncs.exceptions.ClientException;
//import com.aliyuncs.profile.DefaultProfile;
//import com.google.gson.Gson;
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
//    @Value("${aliyun.path}")
//    private String path;
//
//    /**
//     * @return void
//     * @author ZouCha
//     * @date 2020-12-01 12:14:08
//     * @method refreshDcdn
//     * @params []
//     **/
//    public void refreshDcdn() throws ClientException {
//        DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, accessKeySecret);
//        IAcsClient client = new DefaultAcsClient(profile);
//        RefreshDcdnObjectCachesRequest request = new RefreshDcdnObjectCachesRequest();
//        request.setObjectPath(path);
//        try {
//            RefreshDcdnObjectCachesResponse response = client.getAcsResponse(request);
//            log.info(new Gson().toJson(response));
//        } catch (ClientException e) {
//            log.error("阿里云刷新Dcdn错误"+e.toString());
//            throw new ClientException("阿里云刷新Dcdn错误"+e.toString());
//        }
//    }
//
//    /**
//     * @return void
//     * @author ZouCha
//     * @date 2020-12-01 12:07:44
//     * @method preLoadDcdn
//     * @params []
//     **/
//    public void preLoadDcdn() throws ClientException {
//        DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", accessKeyId, accessKeySecret);
//        IAcsClient client = new DefaultAcsClient(profile);
//        PreloadDcdnObjectCachesRequest request = new PreloadDcdnObjectCachesRequest();
//        request.setObjectPath(path);
//        try {
//            PreloadDcdnObjectCachesResponse response = client.getAcsResponse(request);
//            log.info(new Gson().toJson(response));
//        } catch (ClientException e) {
//            log.error("阿里云预载Dcdn错误"+e.toString());
//            throw new ClientException("阿里云预载Dcdn错误"+e.toString());
//        }
//    }
//}
