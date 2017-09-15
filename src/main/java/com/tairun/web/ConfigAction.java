package com.tairun.web;

import com.tairun.utils.SecurityKit;
import com.tairun.utils.WeixinContext;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

/**
 * Created by lyc on 2017/8/28.
 * 微信第一步 配置服务器所需
 */
@Controller
@RequestMapping("weixin")
public class ConfigAction {

    /**
     * 配置请求
     * @param req
     * @param resp
     */
    @RequestMapping("wx")
    public @ResponseBody void config(HttpServletRequest req, HttpServletResponse resp){

        String signature = req.getParameter("signature");
        String timestamp = req.getParameter("timestamp");
        String nonce = req.getParameter("nonce");
        String echostr = req.getParameter("echostr");
        String[] arrs = {WeixinContext.getInstance().getToken(),nonce,timestamp};
        Arrays.sort(arrs);
        StringBuffer sb = new StringBuffer();
        for(String a:arrs) {
            sb.append(a);
        }
        String sha1 = SecurityKit.sha1(sb.toString());
        System.out.println(sha1);
        System.out.println(sha1.equals(signature));
        if(sha1.equals(signature)) {
            try {
                resp.getWriter().println(echostr);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }
    @RequestMapping("cookie")
    @ResponseBody
    public String jessionid(HttpServletResponse response,HttpServletRequest request){
        Cookie[] cookies = request.getCookies();

        for(Cookie c:cookies){
            System.out.println(c.getName()+"--"+c.getValue());
        }

        return "hello";
    }

}
