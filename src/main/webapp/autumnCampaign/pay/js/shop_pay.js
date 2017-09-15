var toWxGZHpaynum;
var trOpenId = localStorage.getItem('trOpenId')
var pay = {
    chooose:function(){
        $('article .pay').on('click',function(){
            $(this).append('<em><i class="iconfont icon-gou">'+'</i></em>').siblings().find('em').remove('em')
        })
    },
    //跳转页面
    jump:function(){
        $('.surePay a').on('click',function(){
            window.location.href="pay_succeed.html"
        })
        $('header .icon-llmainpageback').on('click',function(){
            $('.shot').show()
        })
        $('.shot-btn a').eq(0).click(function(){
            $('.shot').hide()
        })
        $('.shot-btn a').eq(1).click(function(){
            $('.shot').hide()
            window.location.href="../myInfo.html"
        })
    },
    date:function(){
        var nums = localStorage.getItem('orderSubNums')
        $.ajax({
            'url':'http://song.85nv.cn/mobile/p/order/payment',
            dataType:'Json',
            type:'post',
            data:{'subNums':nums},
            success:function(res){
                console.log(res)
                $('.right').html('￥'+res.data.totalAmount+'')
                toWxGZHpaynum = res.data.subNums
                //成功的回调调用获取微信支付订单配置信息
                console.log(toWxGZHpaynum,trOpenId)
                $.ajax({
                    'url':'http://song.85nv.cn/mobile/p/payment/confirmAllPay',
                    type:'post',
                    dataType:'json',
                    data:{'tradingNumbers':toWxGZHpaynum,'payTypeId':'WX_GZH',openId:trOpenId},
                    success:function(res){
                        console.log(res)
                        var gzhConfig = JSON.parse(res.data.gzh_pay)
                        console.log(gzhConfig)
                        pay.weChatConfig[appId]=gzhConfig.appId
                        pay.weChatConfig[timeStamp]=gzhConfig.timeStamp
                        pay.weChatConfig[nonceStr]=gzhConfig.nonceStr
                        pay.weChatConfig[paySign]=gzhConfig.paySign
                        pay.weChatConfig[package]=gzhConfig.package
                        
                    }
                })
            }
        })
    },
    weChatConfig:{}//配置对象
    ,
    weChatPay:function(obj){
        WeixinJSBridge.invoke('getBrandWCPayRequest', {
                            "appId": obj.appId,
                            "timeStamp": obj.timeStamp,
                            "nonceStr": obj.nonceStr,
                            "package": obj.package,
                            "signType": "MD5",
                            "paySign": obj.paySign
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
}
pay.chooose();
// pay.jump();
pay.date();
$('#sureForPay').click(function(){
    console.log('点击触发事件')
    pay.weChatPay(pay.weChatConfig)
})