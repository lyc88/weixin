package com.tairun.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

/**
 * Created by lyc on 2017/8/25.
 * 系统常量
 */
public class Constants {
    /**
     * appid
     */
    public static final String APPID = "wx2684abab04c7017d";
    public static final String SECRET = "a51eec122277dd08afa447f90008e8ba";
    /**
     * 调用其他不是h5页面 的接口 ，的token
     */
    public static final String TOKEN = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";

    public static final String ACCESS_TOKEN = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";

    public static final String JSTOKEN = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi";
    /** 授权url */
    public static final String OAUTH2 = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code";
    /** */
    public static final String OAUTH2ADDR = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect";

    /**
     * 拉去用户url
     */
    public static final String userUrl = "https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN";
    /**
     * 分享等页面需要
     */
    //public static final String JSTOKEN = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi";


    public static String token;
    public static String jstoken;

    static {
        token = getAccessToken();
        jstoken = getJstoken();
    }

    /**
     * 获取微信调用其他接口的token
     *
     * @return
     */
    public static String getAccessToken() {

        if (StringUtils.isNotBlank(token)) return token;

        RestTemplate restTemplate = new RestTemplate();

        String first = ACCESS_TOKEN;
        try {
            first = first.replace("APPID", APPID)
                    .replace("APPSECRET", SECRET);

            ResponseEntity<String> at = restTemplate.getForEntity(first, String.class);
            JSONObject jsonObject1 = (JSONObject) JSON.parse(at.getBody());
            System.out.println("==================" + at.getBody());
            return jsonObject1.get("access_token").toString();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * 获取jstoken
     *
     * @return
     */
    public static String getJstoken() {
        if (StringUtils.isNotBlank(jstoken)) return jstoken;
        RestTemplate restTemplate = new RestTemplate();
        try {

            String jstoken = JSTOKEN.replace("ACCESS_TOKEN", token);
            System.out.println(jstoken);
            ResponseEntity<String> response = restTemplate.getForEntity(jstoken, String.class);

            JSONObject jsonObject1 = (JSONObject) JSON.parse(response.getBody());
            System.out.println("=======================" + response.getBody());
            String ticket = jsonObject1.get("ticket").toString();
            return ticket;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static void main(String[] args) {
        String path = "http://lyc88.51vip.biz"+"/weixin"+"/getOpenid";
        path = "http://lyc88.51vip.biz"+"/shop_flow"+"/shop_car.html";
        String uri = Constants.OAUTH2ADDR;
        try {
            uri = uri.replace("APPID", Constants.APPID)
                    .replace("REDIRECT_URI", URLEncoder.encode(path, "UTF-8"))
                    .replace("STATE", "1");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        System.out.println(uri);

    }
}
