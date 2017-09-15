var search = {
    /*文字超出隐藏*/
    Title:function(){
        $('.shop-mes h5').each(function(){
            var str = $(this).html();
            var Len =  str.length;
            if(Len>=28){
                var H = str.slice(0,25)
                $(this).html(H+'......')
            }
        })
    },
    Tap:function(){
        var _this = this
        var price = true;
        var list_on = false;
        var Orders;
        $('nav a').on('click',function(){
            $(this).addClass('active').siblings().removeClass('active')
            if($(this).index()==0){
                Orders = 'prod.rec_date,desc'
                $('nav a').eq(2).find('img').attr('src','../images/shop_ic_unchanged.png')
            }
            else if($(this).index()==1){
                Orders = 'prod.buys,desc'
                $('nav a').eq(2).find('img').attr('src','../images/shop_ic_unchanged.png')
            }
            else if($(this).index()==2){
                if(price == false){
                    $(this).find('img').attr('src','../images/shop_ic_up.png')
                    price = true;
                    Orders = 'prod.cash,desc'
                }
                else{
                    $(this).find('img').attr('src','../images/shop_ic_down.png')
                    price = false;
                    Orders = 'prod.cash,asc'
                }
            }
            _this.Data(Orders,list_on)
        })
        $('nav>span').on('click',function(){
            if(list_on == true){
                list_on = false;
                $('nav>span>i').removeClass('icon-gengduo1').addClass('icon-liebiao')
            }
            else{
                list_on = true;
                $('nav>span>i').removeClass('icon-liebiao').addClass('icon-gengduo1')
            }
            _this.Data(Orders,list_on)
        })
    },
    Width:function(){
        $('.list:even').css('margin-left',0)
    },
    Data:function(Orders,list_on){
        var _this = this
        list_on==undefined?list_on=false:list_on=list_on;
        Orders == undefined?Orders='prod.rec_date,desc':Orders=Orders;
            $.ajax({
            'url':'http://song.85nv.cn/mobile/m_search/getProdList',
            dataType:'Json',
            type:'post',
            data:{curPageNO:1,prop:'衣服',startPrice:'',endPrice:'',orders:Orders,categoryId:'',shopId:'',keyword:''},
            success:function(res){
                var D = res.data.prodlist
                var  Src = 'http://song.85nv.cn//photoserver/photo/'
                var  Html = '';
                    if(list_on==false){
                        $.each(D,function(index,value){
                            Html+='<div class="shop-mes">'
                            Html+='<img src='+Src+value.pic+'>'
                            Html+='<div>'
                            Html+='<h5>'+value.name+'</h5>'
                            Html+='<p>'+'￥'+value.cash+'</p>'
                            Html+='<span>'+'代理'+'</span>'
                            Html+='</div>'
                            Html+='</div>'
                        })
                        $('.shops').html(Html)
                        $('.shops').css('background','#fff')
                    }
                    else{
                        $.each(D,function(index,value){
                            Html+='<div class="list">'
                            Html+='<img src='+Src+value.pic+'>'
                            Html+='<div>'
                            Html+='<h5>'+value.name+'</h5>'
                            Html+='<p>'+'￥'+value.cash+'</p>'
                            Html+='</div>'
                            Html+='</div>'
                        })
                        $('.shops').html(Html)
                        $('.shops').css('background','#f5f5f5')
                        _this.Width()
                    }

                }
        })
    }
}

search.Title();
search.Tap();
search.Data();

var moom = {
    Tap:function(){
        $('.choose a').on('click',function(){
            $(this).addClass('active').siblings().removeClass('active')
        })
    },
    Jump:function(){
        $('.choose a').eq(1).on('click',function(){
            window.location.href='./shop_car.html'
        })

            $('.choose a').eq(2).on('click',function(){
            window.location.href='../myInfo.html'
        })
}
}
moom.Tap()
moom.Jump()