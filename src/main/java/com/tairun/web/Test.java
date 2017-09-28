package com.tairun.web;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.web.client.RestTemplate;

import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by THINK on 2017/9/13.
 */
public class Test {
    private int i ;

    public int getI() {
        return i;
    }

    public void setI(int i) {
        this.i = i;
    }

    private void hello(){
        System.out.println("hello");
    }

}

