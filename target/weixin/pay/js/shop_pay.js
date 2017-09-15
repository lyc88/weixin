var pay = {
    chooose:function(){
        $('article .pay').on('click',function(){
            $(this).append('<em><i class="iconfont icon-gou">'+'</i></em>').siblings().find('em').remove('em')
        })
    },
    //跳转页面
    jump:function(){
        $('#sureForPay').on('click',function(){
            $.ajax({
                type:'get',
                dataType:'Json',
                url:'http://lyc88.51vip.biz/pay/pay',
                data:{
                    money:'0.09'
                },
                success:function(res){
                    console.log(res)
                }
            })
        })
        $('header .icon-llmainpageback').on('click',function(){
            $('.shot').show()
        })
        $('.shot-btn a').eq(0).click(function(){
            $('.shot').hide()
        })
        $('.shot-btn a').eq(1).click(function(){
            $('.shot').hide()
            window.location.href="../shop_flow/search.html"
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
            }
        })
    }
}
// pay.chooose();
pay.jump();
// pay.date();