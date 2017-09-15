var succeed = {
    //跳转页面
    jump:function(){
        $('.btn a').eq(1).on('click',function(){

            window.location.href="index.html"
        })
    }
}
succeed.jump();
