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
    }
}
pay.chooose();
pay.jump();
