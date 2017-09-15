
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
    Width:function(){
        $('section>div:odd').css('margin-right',0+'px')
    }
}
moom.more()
moom.back()
moom.Width()
