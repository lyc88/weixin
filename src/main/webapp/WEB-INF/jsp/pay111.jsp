<%--
  Created by IntelliJ IDEA.
  User: THINK
  Date: 2017/8/30
  Time: 20:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<html>
<head>


    <title>微信支付</title>

    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="This is my page">
    <!--
    <link rel="stylesheet" type="text/css" href="styles.css">
    -->

</head>

<body>
<br><br><br><br><br><br><br>${package1}
<div style="text-align:center;size:30px;"><input type="button" style="width:200px;height:80px;" value="微信支付" onclick="callpay()"></div>

</body>
<script type="text/javascript">

     function callpay(){
     WeixinJSBridge.invoke('getBrandWCPayRequest',{
     "appId" : "${appid}","timeStamp" : "${timeStamp}", "nonceStr" : "${nonceStr}", "package" : "${package1}","signType" : "MD5", "paySign" : "${sign}"
     },function(res){
         alert(res.err_msg);
     WeixinJSBridge.log(res.err_msg);
     // 				alert(res.err_code + res.err_desc + res.err_msg);
     if(res.err_msg == "get_brand_wcpay_request:ok"){
     alert("微信支付成功!");
     }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
     alert("用户取消支付!");
     }else{
     alert("支付失败!");
     }
     })
     }
</script>

</html>

