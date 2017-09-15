package com.tairun.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by lyc on 2017/7/6.
 */
public class SecurityKit {
    public static String sha1(String str) {
        try {
            StringBuffer sb = new StringBuffer();
            MessageDigest md = MessageDigest.getInstance("sha1");
            md.update(str.getBytes());
            byte[] msg = md.digest();
            for (byte b : msg) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }
}
