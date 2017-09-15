package com.tairun.web;

import com.alibaba.fastjson.JSONObject;
import com.tairun.utils.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.SortedMap;
import java.util.TreeMap;

/**
 * Created by lyc on 2017/8/30.
 */
@Controller
@RequestMapping("pay")
public class PayAction {

    /**
     * 支付 网页授权获取用户信息
     *
     * @param request
     * @param response
     */
    @RequestMapping("pay")
    public void pay(HttpServletRequest request, HttpServletResponse response, String money) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        //共账号及商户相关参数
        String appid = "wx2684abab04c7017d";
        String backUri = PropertiesUtil.getPropsAsString("domain")+"pay/topay";
        //授权后要跳转的链接所需的参数一般有会员号，金额，订单号之类，
        //最好自己带上一个加密字符串将金额加上一个自定义的key用MD5签名或者自己写的签名,
        //比如 Sign = %3D%2F%CS%
        String orderNo = appid + Sha1Util.getTimeStamp();
        String userid = "b88001";
        backUri = backUri + "?userId=" + userid + "&orderNo=" + orderNo + "&describe=test&money=" + money;
        //URLEncoder.encode 后可以在backUri 的url里面获取传递的所有参数
        try {
            backUri = URLEncoder.encode(backUri, "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        //scope 参数视各自需求而定，这里用scope=snsapi_base 不弹出授权页面直接授权目的只获取统一支付接口的openid
        String url = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
                "appid=" + appid +
                "&redirect_uri=" +
                backUri +
                "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
        try {
            response.sendRedirect(url);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping("topay")
    public String toPay(HttpServletRequest request, HttpServletResponse response, Model model) {
        //网页授权后获取传递的参数
        String userId = request.getParameter("userId");
        String orderNo = request.getParameter("orderNo");
        String money = request.getParameter("money");
        String code = request.getParameter("code");
        //金额转化为分为单位
        float sessionmoney = Float.parseFloat(money);
        String finalmoney = String.format("%.2f", sessionmoney);
        finalmoney = finalmoney.replace(".", "");

        //商户相关资料
        String appid = PropertiesUtil.getPropsAsString("appid");
        String appsecret = PropertiesUtil.getPropsAsString("appsecret");
        String partner = PropertiesUtil.getPropsAsString("partner");
        String partnerkey = PropertiesUtil.getPropsAsString("partnerkey");

        //String openId = "";
        String openid = (String) request.getSession().getAttribute("openid");//"oDoUJ1T7gX5EzBYgqpI6oqe7j9Ao";

        if (!StringUtils.isNotBlank(openid)) {
            String URL = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + appid + "&secret=" + appsecret + "&code=" + code + "&grant_type=authorization_code";

            JSONObject jsonObject = CommonUtil.httpsRequest(URL, "GET", null);
            if (null != jsonObject) {
                openid = jsonObject.getString("openid");
                request.getSession().setAttribute("openid", openid);
            }
        }
        //获取openId后调用统一支付接口https://api.mch.weixin.qq.com/pay/unifiedorder
        String currTime = TenpayUtil.getCurrTime();
        //8位日期
        String strTime = currTime.substring(8, currTime.length());
        //四位随机数
        String strRandom = TenpayUtil.buildRandom(4) + "";
        //10位序列号,可以自行调整。
        String strReq = strTime + strRandom;


        //商户号
        String mch_id = partner;
        //子商户号  非必输
        //String sub_mch_id="";
        //设备号   非必输
        String device_info = "";
        //随机数
        String nonce_str = strReq;
        //商品描述
        //String body = describe;

        //商品描述根据情况修改
        String body = "美食";
        //附加数据
        String attach = userId;
        //商户订单号
        String out_trade_no = orderNo;
        int intMoney = Integer.parseInt(finalmoney);

        //总金额以分为单位，不带小数点
        int total_fee = intMoney;
        //订单生成的机器 IP
        String spbill_create_ip = request.getRemoteAddr();
        //订 单 生 成 时 间 非必输
        //String time_start ="";
        //订单失效时间  非必输
        //String time_expire = "";
        //商品标记非必输
        //String goods_tag = "";

        //这里notify_url是 支付完成后微信发给该链接信息，可以判断会员是否支付成功，改变订单状态等。
        String notify_url = PropertiesUtil.getPropsAsString("notify_url");//"http://lyc88.51vip.biz/pay/weixin_return_url";

        String trade_type = "JSAPI";
        //非必输
        //String product_id = "";
        SortedMap<String, String> packageParams = new TreeMap<String, String>();
        packageParams.put("appid", appid);
        packageParams.put("mch_id", mch_id);
        packageParams.put("nonce_str", nonce_str);
        packageParams.put("body", body);
        packageParams.put("attach", attach);
        packageParams.put("out_trade_no", out_trade_no);
        //这里写的金额为1 分到时修改
        packageParams.put("total_fee", "1");
        packageParams.put("spbill_create_ip", spbill_create_ip);
        packageParams.put("notify_url", notify_url);

        packageParams.put("trade_type", trade_type);
        packageParams.put("openid", openid);

        RequestHandler reqHandler = new RequestHandler(request, response);
        reqHandler.init(appid, appsecret, partnerkey);

        String sign = reqHandler.createSign(packageParams);
        String xml = "<xml>" +
                "<appid>" + appid + "</appid>" +
                "<mch_id>" + mch_id + "</mch_id>" +
                "<nonce_str>" + nonce_str + "</nonce_str>" +
                "<sign>" + sign + "</sign>" +
                "<body><![CDATA[" + body + "]]></body>" +
                "<attach>" + attach + "</attach>" +
                "<out_trade_no>" + out_trade_no + "</out_trade_no>" +
                //金额，这里写的1 分到时修改
                //"<total_fee>"+1+"</total_fee>"+
                "<total_fee>" + intMoney + "</total_fee>" +
                "<spbill_create_ip>" + spbill_create_ip + "</spbill_create_ip>" +
                "<notify_url>" + notify_url + "</notify_url>" +
                "<trade_type>" + trade_type + "</trade_type>" +
                "<openid>" + openid + "</openid>" +
                "</xml>";

        String allParameters = "";
        try {
            allParameters = reqHandler.genPackage(packageParams);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        String createOrderURL = "https://api.mch.weixin.qq.com/pay/unifiedorder";
        String prepay_id = "";
        try {
            prepay_id = new GetWxOrderno().getPayNo(createOrderURL, xml);
            if (prepay_id.equals("")) {
                request.setAttribute("ErrorMsg", "统一支付接口获取预支付订单出错");
                response.sendRedirect("error.jsp");
            }
        } catch (Exception e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        SortedMap<String, String> finalpackage = new TreeMap<String, String>();
        String appid2 = appid;
        String timestamp = Sha1Util.getTimeStamp();
        String nonceStr2 = nonce_str;
        String prepay_id2 = "prepay_id=" + prepay_id;
        String packages = prepay_id2;
        finalpackage.put("appId", appid2);
        finalpackage.put("timeStamp", timestamp);
        finalpackage.put("nonceStr", nonceStr2);
        finalpackage.put("package", packages);
        finalpackage.put("signType", "MD5");
        String finalsign = reqHandler.createSign(finalpackage);
        System.out.println("pay.jsp?appid=" + appid2 + "&timeStamp=" + timestamp + "&nonceStr=" + nonceStr2 + "&package=" + packages + "&sign=" + finalsign);

        model.addAttribute("appid", appid2);
        model.addAttribute("timeStamp", timestamp);
        model.addAttribute("nonceStr", nonceStr2);
        model.addAttribute("package1", packages);
        model.addAttribute("sign", finalsign);
        return "pay";
    }


    @RequestMapping("topay1")
    @ResponseBody
    public Map toPay1(HttpServletRequest request, HttpServletResponse response, Model model) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        //网页授权后获取传递的参数
        String userId = "b88001";//request.getParameter("userId");
        String orderNo = PropertiesUtil.getPropsAsString("appid") + Sha1Util.getTimeStamp();//request.getParameter("orderNo");
        String money = "0.01";//request.getParameter("money");
        //金额转化为分为单位
        float sessionmoney = Float.parseFloat(money);
        String finalmoney = String.format("%.2f", sessionmoney);
        finalmoney = finalmoney.replace(".", "");

        //商户相关资料
        String appid = PropertiesUtil.getPropsAsString("appid");
        String appsecret = PropertiesUtil.getPropsAsString("appsecret");
        String partner = PropertiesUtil.getPropsAsString("partner");
        String partnerkey = PropertiesUtil.getPropsAsString("partnerkey");

        //String openId = "";
        String openid = (String) request.getSession().getAttribute("openid");//"oDoUJ1T7gX5EzBYgqpI6oqe7j9Ao";

        if(openid == null){
            Map<String,String> map  = new HashMap();
            map.put("msg","没有openid");
            map.put("data","");
            return map;
        }
        //获取openId后调用统一支付接口https://api.mch.weixin.qq.com/pay/unifiedorder
        String currTime = TenpayUtil.getCurrTime();
        //8位日期
        String strTime = currTime.substring(8, currTime.length());
        //四位随机数
        String strRandom = TenpayUtil.buildRandom(4) + "";
        //10位序列号,可以自行调整。
        String strReq = strTime + strRandom;


        //商户号
        String mch_id = partner;
        //子商户号  非必输
        //String sub_mch_id="";
        //设备号   非必输
        String device_info = "";
        //随机数
        String nonce_str = strReq;
        //商品描述
        //String body = describe;

        //商品描述根据情况修改
        String body = "美食";
        //附加数据
        String attach = userId;
        //商户订单号
        String out_trade_no = orderNo;
        int intMoney = Integer.parseInt(finalmoney);

        //总金额以分为单位，不带小数点
        int total_fee = intMoney;
        //订单生成的机器 IP
        String spbill_create_ip = request.getRemoteAddr();
        //订 单 生 成 时 间 非必输
        //String time_start ="";
        //订单失效时间  非必输
        //String time_expire = "";
        //商品标记非必输
        //String goods_tag = "";

        //这里notify_url是 支付完成后微信发给该链接信息，可以判断会员是否支付成功，改变订单状态等。
        String notify_url = PropertiesUtil.getPropsAsString("notify_url");//"http://lyc88.51vip.biz/pay/weixin_return_url";

        String trade_type = "JSAPI";
        //非必输
        //String product_id = "";
        SortedMap<String, String> packageParams = new TreeMap<String, String>();
        packageParams.put("appid", appid);
        packageParams.put("mch_id", mch_id);
        packageParams.put("nonce_str", nonce_str);
        packageParams.put("body", body);
        packageParams.put("attach", attach);
        packageParams.put("out_trade_no", out_trade_no);
        //这里写的金额为1 分到时修改
        packageParams.put("total_fee", "1");
        packageParams.put("spbill_create_ip", spbill_create_ip);
        packageParams.put("notify_url", notify_url);

        packageParams.put("trade_type", trade_type);
        packageParams.put("openid", openid);

        RequestHandler reqHandler = new RequestHandler(request, response);
        reqHandler.init(appid, appsecret, partnerkey);

        String sign = reqHandler.createSign(packageParams);
        String xml = "<xml>" +
                "<appid>" + appid + "</appid>" +
                "<mch_id>" + mch_id + "</mch_id>" +
                "<nonce_str>" + nonce_str + "</nonce_str>" +
                "<sign>" + sign + "</sign>" +
                "<body><![CDATA[" + body + "]]></body>" +
                "<attach>" + attach + "</attach>" +
                "<out_trade_no>" + out_trade_no + "</out_trade_no>" +
                //金额，这里写的1 分到时修改
                //"<total_fee>"+1+"</total_fee>"+
                "<total_fee>" + intMoney + "</total_fee>" +
                "<spbill_create_ip>" + spbill_create_ip + "</spbill_create_ip>" +
                "<notify_url>" + notify_url + "</notify_url>" +
                "<trade_type>" + trade_type + "</trade_type>" +
                "<openid>" + openid + "</openid>" +
                "</xml>";

        String allParameters = "";
        try {
            allParameters = reqHandler.genPackage(packageParams);
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        String createOrderURL = "https://api.mch.weixin.qq.com/pay/unifiedorder";
        String prepay_id = "";
        try {
            prepay_id = new GetWxOrderno().getPayNo(createOrderURL, xml);
            if (prepay_id.equals("")) {
                request.setAttribute("ErrorMsg", "统一支付接口获取预支付订单出错");
                response.sendRedirect("error.jsp");
            }
        } catch (Exception e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        SortedMap<String, String> finalpackage = new TreeMap<String, String>();
        String appid2 = appid;
        String timestamp = Sha1Util.getTimeStamp();
        String nonceStr2 = nonce_str;
        String prepay_id2 = "prepay_id=" + prepay_id;
        String packages = prepay_id2;
        finalpackage.put("appId", appid2);
        finalpackage.put("timeStamp", timestamp);
        finalpackage.put("nonceStr", nonceStr2);
        finalpackage.put("package", packages);
        finalpackage.put("signType", "MD5");
        String finalsign = reqHandler.createSign(finalpackage);
        System.out.println("pay.jsp?appid=" + appid2 + "&timeStamp=" + timestamp + "&nonceStr=" + nonceStr2 + "&package=" + packages + "&sign=" + finalsign);
        Map<String,String> map  = new HashMap();
        map.put("appid", appid2);
        map.put("timeStamp", timestamp);
        map.put("nonceStr", nonceStr2);
        map.put("package1", packages);
        map.put("sign", finalsign);
       return map;
    }
    /**
     * @param request
     */
    @RequestMapping("weixin_return_url")
    public void weixin_return_url(HttpServletRequest request, HttpServletResponse response) {
        BufferedReader br = null;
        try {
            br = new BufferedReader(new InputStreamReader(request.getInputStream()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        String line = null;
        StringBuilder sb = new StringBuilder();
        System.out.println("支付完成后跳转---------------");
        try {
            while ((line = br.readLine()) != null) {
                sb.append(line);
            }
            System.out.println("支付完成后跳转---------------" + sb.toString());
            response.getWriter().write("SUCCESS");
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
