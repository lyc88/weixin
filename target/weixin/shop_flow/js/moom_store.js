var moom = {
    more:function(){
        $('.icon-gengduo').click(function(){
            $('.wicket').show()
            $('.opa').show()
        })
        $('.opa').click(function(){
            $('.wicket').hide()
            $('.opa')   .hide()
        })
    },
    back: function () {
        $('header .icon-llmainpageback').click(function(){
            window.history.back()
        })
    },
    data:function(){
        $.ajax(
            {
                'url':'http://song.85nv.cn/mobile/shop',
                'dataType':'Json',
                type:'post',
                data:{
                    'shopId':1241,
                },
                success:function(res){
                    console.log(res)
                    var D = res.data.shopDetail;
                    var  Src = 'http://song.85nv.cn//photoserver/photo/'
                    //logoPic
                    console.log(D.shopPic)
                    $('.user_message').css({
                        'background':'url('+Src+D.shopPic+')',
                        'background-size':'100% 100%',
                    })
                    $('.user_message>h1').html( D.siteName )
                }
            }
        )

        $.ajax(
            {
                'url':'http://song.85nv.cn/mobile/store/prodcts',
                'dataType':'Json',
                type:'post',
                data:{
                    'shopId':1241,
                    'curPageNO':1,
                },
                success:function(res){
                    console.log(res)
                    var D = res.data.shopDetail;
                    var  Src = 'http://song.85nv.cn//photoserver/photo/'
                    //logoPic

                }
            }
        )
    }
}
moom.more()
moom.back()
moom.data()

