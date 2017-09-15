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
    }
}
moom.more()
moom.back()

