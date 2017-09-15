<%--
  Created by IntelliJ IDEA.
  User: THINK
  Date: 2017/8/30
  Time: 20:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="black" name="apple-mobile-web-app-status-bar-style">
    <meta content="telephone=no" name="format-detection">
    <meta content="email=no" name="format-detection">
    <link rel="stylesheet" href="../css/style/Common-moble.css">
    <link rel="stylesheet" type="text/css" href="../css/style/iconfont.css">
    <link rel="stylesheet" href="../css/shop_pay.css">
    <script src="../js/src/flexible.js"></script>
    <script src="../js/src/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="https://cdn.webfont.youziku.com/wwwroot/js/wf/youziku.api.min.js"></script>
    <title>支付</title>
</head>
<body>
<header>
    <i class="iconfont icon-llmainpageback"></i>
    <h2>支付中心</h2>
</header>
<div class="gray"></div>
<article>
    <div class="payMoney">
        <span class="left">需付款</span>
        <span class="right red">￥150.00</span>
    </div>
    <div class="pay">
        泰润宝支付 <i class="iconfont icon-qiandai"></i>
        <em><i class="iconfont  icon-gou"></i></em>
    </div>
    <div class="pay">
        支付宝支付 <i class="iconfont icon-alipay"></i>
    </div>
    <div class="pay">
        微信支付 <i class="iconfont icon-weixinzhifu"></i>
    </div>
    <div class="surePay">
        <a href="javascript:callpay(); ">确认付款</a>
    </div>

</article>
<script type="text/javascript">
    $youziku.load("body", "fd898c6b80054000ae83272ec467e83d", "HiraginoGBW3");
    /*$youziku.load("#id1,.class1,h1", "fd898c6b80054000ae83272ec467e83d", "HiraginoGBW3");*/
    /*．．．*/
    $youziku.draw();
</script>
<script src="./js/shop_pay.js"></script>
</body>
<script type="text/javascript">
    function callpay() {

        WeixinJSBridge.invoke('getBrandWCPayRequest', {
            "appId": "${appid}",
            "timeStamp": "${timeStamp}",
            "nonceStr": "${nonceStr}",
            "package": "${package1}",
            "signType": "MD5",
            "paySign": "${sign}"
        }, function (res) {
            WeixinJSBridge.log(res.err_msg);
            if (res.err_msg == "get_brand_wcpay_request:ok") {
                alert("微信支付成功!");
            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                alert("用户取消支付!");
            } else {
                alert("支付失败!");
            }
        })
    }
</script>


