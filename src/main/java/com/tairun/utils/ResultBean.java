package com.tairun.utils;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by lyc on 2017/8/28.
 * 统一 接口返回数对象
 */
public class ResultBean<T> implements Serializable {

    public static final int SUCCESS = 0;
    public static final int FAIL = 1;

    private String msg = "sucess";

    private int code = SUCCESS;

    private T data;


    public static void main(String[] args) {
        RestTemplate restTemplate = new RestTemplate();
        MultiValueMap<String, String> form = new LinkedMultiValueMap<String, String>();
        form.add("openId", "oDoUJ1T7gX5EzBYgqpI6oqe7j9Ao");
        form.add("type", "weixin");
        String result = restTemplate.postForObject("http://song.85nv.cn/mobile/user/app/login", form, String.class);
        System.out.println(result);
        //String b = restTemplate.postForEntity("http://song.85nv.cn/mobile/user/app/login","POST",String.class,map).getBody();
       // System.out.println(b);
    }

}
