<%--
  Created by IntelliJ IDEA.
  User: THINK
  Date: 2017/8/29
  Time: 10:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="black" name="apple-mobile-web-app-status-bar-style">
    <meta content="telephone=no" name="format-detection">
    <meta content="email=no" name="format-detection">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/style/Common-moble.css">
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/style/iconfont.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/phone_amend.css">
    <script src="${pageContext.request.contextPath}/js/src/flexible.js"></script>
    <script src="${pageContext.request.contextPath}/js/src/jquery-2.1.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/js/src/jquery.cookie.js"></script>
    <script src="${pageContext.request.contextPath}/js/src/auth.js"></script>
    <script type="text/javascript" src="https://cdn.webfont.youziku.com/wwwroot/js/wf/youziku.api.min.js"></script>
    <title>绑定手机号</title>

</head>
<body>
<header>
    <i id="goBack" class="iconfont icon-llmainpageback"></i>
    <span >快速注册</span>
</header>
<form id="registerForm">
    <section class="container">
        <input type="text" required placeholder="请输入需要绑定的手机号" id="mobileNum" name="mobile">

    </section>
    <div id="register">
        <!--<p>验证码已发送到您的手机! <span id="getSecond">60</span>s后可重新获取</p>-->
        <!--<p>请输入您所收到的验证码</p>-->
        <section class="registerPlace">
            <div class="CaptchaPlace"><input type="text" required placeholder="请输入验证码" id="CAPTCHA" name="mobileCode"><a href="javascript:void(0)" id="bindYourNum">获取验证码</a></div>
            <div class="passwordPlace">
                <input type="password" required placeholder="请输入注册密码" id="pWd" name="password">
            </div>
            <input type="button" id="sureForRegis" value="注册">
            <input type="text" name="type" value="weixin" class="hidenInput">
            <input type="text" name="openId" value="${openid}" class="hidenInput">

        </section>
    </div>
</form>
<div id="mask"></div>
<div id="maskOfBindLogin">
    <div id="bindLogin">
        <div id="closeMask">X</div>
        <h3>您的手机号已使用</h3>
        <div id="describeInfo">
            <p>1、请确认是否输入有误</p>
            <p>2、如果确认拥有该手机号请直接关联该泰润账号</p>
            <p>3、如仍有问题则拨打客服热线4000000000</p>

        </div>
        <div id="toOtherLink">
            <button id="del">重新输入</button>
            <button id="toBind">去关联</button>

        </div>
    </div>
</div>
<script type="text/javascript">
    //字体库
    $youziku.load("body", "fd898c6b80054000ae83272ec467e83d", "HiraginoGBW3");
    $youziku.draw();
</script>
<script>
    /*
     * Created By Eason 8.25 492760446@qq.com
     */

    $(function(){

        $('#goBack').click(function(){
            window.history.go(-1)
        })

        //获取验证码cookie存储验证状态，避免重复刷新表单提交，判断如果当前倒计时不为0或者这个倒计时存在，按钮开启disable属性。
        var status = $.cookie('TrflagStatus')
        if(status!=0&&($.cookie('TrflagStatus'))){
            $('#bindYourNum').addClass('disAble')
            var totalTime = $.cookie('TrflagStatus')
            var clock = window.setInterval(function(){
                totalTime--
                $.cookie('TrflagStatus',totalTime)
                if(totalTime==0){
                    //判断如果当前倒计时为0移除disable属性，并关闭计时器
                    $('#bindYourNum').text('获取验证码').removeClass('disAble')
                    $.cookie('TrflagStatus',0)
                    window.clearInterval(clock)
                    return
                }
                $('#bindYourNum').text(totalTime+'s后可重新获取')
            },1000)
        }
        //点击提交号码发送短信
        $('#bindYourNum').click(function(){
            //表单验证判断是否为手机号码
            if(_Auth.isMobile($('#mobileNum').val())){
                console.log($.cookie('TrflagStatus'))
                //如果TrflagStatus状态为空或者1则进入
                if(!($.cookie('TrflagStatus'))||$.cookie('TrflagStatus')==0){
                    console.log($.cookie('TrflagStatus'))
                    //TrflagStatus状态修改为0
                    var mobileNum = $('#mobileNum').val()
                    $.ajax({
                        type: "post",
                        dataType: "Json",
                        url: 'http://song.85nv.cn/mobile/user/reg_mobile_bing',
                        data: {mobile:mobileNum},
                        success: function (data) {
                            //判断如果返回值表示手机已存在则需要弹窗提示绑定第三方
                            if(data.status==0){
                                $('#maskOfBindLogin').addClass('active')
                                $('#toBind').click(function(){
                                    window.location.href="/weixin/conect"
                                })
                                return false;
                            }
                            $('#mask').text(data.message)
                            $('#mask').fadeIn(1000).fadeOut(1000)
                            console.log(data)
                            //判断数据是否符合规格

                            $('#bindYourNum').text('60s后可重新获取')
                            var totalTime = 60
                            $.cookie('TrflagStatus',totalTime)
                            $('#bindYourNum').addClass('disAble')
                            var clock = window.setInterval(function(){
                                totalTime--
                                $.cookie('TrflagStatus',totalTime)
                                if(totalTime==0){
                                    $('#bindYourNum').text('获取验证码').removeClass('disAble')
                                    $.cookie('TrflagStatus',0)
                                    window.clearInterval(clock)
                                    return
                                }
                                $('#bindYourNum').text(totalTime+'s后可重新获取')
                            },1000)
                        }

                    });
                }
            }else{
                $('#mask').text('手机号码不合法')
                $('#mask').fadeIn(1000).fadeOut(1000)
                $('#mobileNum').addClass('active')
            }
        })
        //关闭关联遮罩层,同时清空手机号
        $('#closeMask,#del').click(function(){
            $('#mobileNum').val('')
            $('#maskOfBindLogin').removeClass('active')
        })
        //注册
        $('#sureForRegis').click(function(){
            var dataInfo = $('#registerForm').serialize()
            $.ajax({
                type: "post",
                dataType: "Json",
                url: 'http://song.85nv.cn/mobile/user/reg_setpwd_bing',
                data: dataInfo,
                success:function(data){
                    $('#mask').text(data.message)
                    $('#mask').fadeIn(1000).fadeOut(1000)
                }
            })
            return false;
        })
    })
</script>
</body>
</html>
