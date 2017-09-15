package com.tairun.web;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.tairun.utils.Constants;
import com.tairun.utils.Sign;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by lyc on 2017/8/25.
 * 微信接口
 */
@Controller
@RequestMapping("/weixin")
public class WeiXinInterface {

    /**
     * 得到签名
     * @param url
     * @return
     */
    @RequestMapping("/signature")
    @ResponseBody
    public Map getSignature(String url, HttpServletRequest request, HttpServletResponse response){

        response.setHeader("Access-Control-Allow-Origin","*");
        Map msg = new HashMap();
        try {
            if(StringUtils.isNotBlank(url)){
                String jsapi_ticket = Constants.getJstoken();
                Map map = Sign.sign(jsapi_ticket,url);
                //Sha1Util
                msg.put("code","1");
                msg.put("msg",map);
            }else {
                msg.put("code","0");
                msg.put("msg","url不能为空");
            }
        }catch (Exception e){
            msg.put("code","0");
            msg.put("msg",e.getMessage());
        }
        return msg;
    }



    @RequestMapping("getOpenid")
    @ResponseBody
    public String getOpenid(HttpServletRequest request, String code,HttpServletResponse response) {

        response.setHeader("Access-Control-Allow-Origin","*");
        String agent = request.getHeader("User-Agent");
        if (agent != null && agent.toLowerCase().indexOf("micromessenger") >= 0) {
            String state = request.getParameter("state");
            if (code != null && state != null && state.equals("1")) {
                //通过Code获取openid来进行授权
                String url = Constants.OAUTH2;
                url = url.replace("APPID", Constants.APPID)
                        .replace("CODE", code)
                        .replace("SECRET", Constants.SECRET);
                RestTemplate restTemplate = new RestTemplate();
                System.out.println(url);
                ResponseEntity<String> result = restTemplate.getForEntity(url, String.class);

                String body = result.getBody();
                JSONObject jsonObject = (JSONObject) JSON.parse(body);
                String accessToken = jsonObject.get("access_token").toString();
                String openid = jsonObject.get("openid").toString();
                request.getSession().setAttribute("openid", openid);
                //根据openid 去接口 查询 1.如果有保存 直接过 2.没有 跳转 手机绑定数
               return openid;
            }
        }
        return "openid";
    }
    /**
     * 去注册页面
     * @return
     */
    @RequestMapping("conect")
    public String amend(){

       return "phone_conect";
    }
}
