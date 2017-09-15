var moom = {
    Width:function(){
        $('section .list:odd').css('margin-right',0+'px')
    },
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
}
moom.Width()
moom.more()
moom.back()