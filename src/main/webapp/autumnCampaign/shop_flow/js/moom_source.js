var moom = {
    commonApi:'http://song.85nv.cn/',
    Width: function () {
        $('section .list:odd').css('margin-right', 0 + 'px')
    },
    more: function () {
        $('.icon-gengduo').click(function () {
            $('.wicket').show()
            $('.opa').show()
        })
        $('.opa').click(function () {
            $('.wicket').hide()
            $('.opa').hide()
        })
    },
    back: function () {
        $('header .icon-llmainpageback').click(function () {
            window.history.back()
        })
    },
    jump: function () {
        $('section').on('click', '.list', function () {
            window.location.href = './shop_details.html?prodId='+$(this).attr('data-id')
        })

    },
    data: function(){
        $.ajax(
            {
                'url':moom.commonApi+'mobile/mooncake/sysAllProd',
                'dataType':'Json',
                type:'post',
                data:{
                    'curPageNO':1,
                },
                success:function(res){
                    var  D =  res.data.list
                    console.log(res)
                    var Html = '';
                    $.each(D,function(index,value){
                        Html+='<div class="list" data-id="'+value.prodId+'">'
                        Html+='<img src="'+moom.commonApi+'photoserver/photo/'+''+value.pic+'">'
                        Html+='<div class="mes">'
                        Html+='<h5>'+value.prodName+'</h5>'
                        Html+='<div>价格：'+'<span>'+value.cash+'</span>'
                        Html+='</div>'
                        Html+='<div>利润：'+'<span>'+value.price+'</span>'
                        Html+='</div>'
                        if(value.isCollection==1){
                        Html+='<a class="haveBeenProxiy" src="javascript:void(0)>'+'<span">'+'已代理'+'</span>'+'</a>'
                        }else{
                        Html+='<a src="javascript:void(0)" data-id="'+value.prodId+'>'+'<span">'+'我要代理'+'</span>'+'</a>'
                        }
                        Html+='</div>'
                        Html+='</div>'
                    })
                    $('section').html(Html)
                    moom.Width()
                }
            })
    }
}

moom.more()
moom.back()
moom.jump()
moom.data()