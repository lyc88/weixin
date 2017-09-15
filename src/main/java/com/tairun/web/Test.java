package com.tairun.web;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.web.client.RestTemplate;

import java.security.MessageDigest;

/**
 * Created by THINK on 2017/9/13.
 */
public class Test {
    public static void main(String[] args) {

           /* RestTemplate restTemplate = new RestTemplate();
            String url = "http://127.0.0.1/weixin/cookie";
            ResponseEntity<String> result = restTemplate.getForEntity(url, String.class);
            System.out.println(result.getBody());*/
        String password = "123";
        String name = "lisi";


        Md5PasswordEncoder coder = new Md5PasswordEncoder();
        coder.setEncodeHashAsBase64(false);
        System.out.println(coder.encodePassword(password, name));


        System.out.println(DigestUtils.md5Hex(password+name).toString());

        System.out.println();
    }
}
