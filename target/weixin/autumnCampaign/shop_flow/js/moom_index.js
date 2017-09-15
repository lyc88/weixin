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
    jump:function(){
            $('section').on('click','.shop',function(){
                window.location.href='./shop_details.html'
         })

    }
}
moom.more()
moom.back()
moom.jump()

