var search = {
    commonApi:'http://song.85nv.cn/',
    /*文字超出隐藏*/
    open :false,//执行一次scroll事件
    oldIndex:0,//记录上一次选择的index
    list_on : false,//切换模式
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
        var Orders;
        var time=1;
        var Index = 0;
        $('nav a').on('click',function(){
            Index = $(this).index();
            if(Index != _this.oldIndex||(Index==2&&_this.oldIndex==2)){
                $(this).addClass('active').siblings().removeClass('active')
                $('.shops>div').eq(Index).addClass('show').siblings().removeClass('show')
                if($(this).index()==0){
                    Orders = 1
                    $('nav a').eq(2).find('img').attr('src','../images/shop_ic_unchanged.png')
                }
                else if($(this).index()==1){
                    Orders = 2
                    $('nav a').eq(2).find('img').attr('src','../images/shop_ic_unchanged.png')
                }
                else if($(this).index()==2){
                    if(price == false){
                        $(this).find('img').attr('src','../images/shop_ic_up.png')
                        price = true;
                        Orders = 3
                    }
                    else{
                        $(this).find('img').attr('src','../images/shop_ic_down.png')
                        price = false;
                        Orders = 4
                    }
                }
                _this.Data(Orders,Index)
                //_this.touch_top(Orders,time,Index)
            }


        })
        $('nav span').on('click',function(){
            console.log(_this.list_on )
            if(_this.list_on == true){
                _this.list_on = false;
                $('nav>span>i').removeClass('icon-liebiao').addClass('icon-gengduo1')
                $('.shops>div>div').removeClass('list').addClass('shop-mes')
                $('.shops').css('background','#fff')
            }
            else{
                _this.list_on = true;

                $('nav>span>i').removeClass('icon-gengduo1').addClass('icon-liebiao')
                $('.shops>div>div').removeClass('shop-mes').addClass('list')
                $('.shops').css('background','#F5F5F5')
            }
            _this.Width()
        })
        //_this.touch_top(Orders,time)
    },
    Width:function(){
        $('.list:even').css('margin-left',0)
    },
    Data:function(Orders,index){
        var _this = this;
        var _Index = index;
        Orders == undefined?Orders=1:Orders=Orders;
        _Index==undefined?_Index=0:_Index=_Index;
            $.ajax({
            'url':'http://192.168.6.2:8080/legendshop/productList/find',
            dataType:'Json',
            type:'get',
            data:{num:Orders},
            success:function(res){
                var  D =  JSON.parse(res)
                console.log(D)
                var  Html = '';
                var  Src = 'http://192.168.6.2:8080/legendshop/bigImage/'

                        $.each(D,function(index,value){
                            Html+='<div class="shop-mes" data-id="'+value.prodId+'">'
                            Html+='<img src='+Src+value.pic+'>'
                            Html+='<div>'
                            Html+='<h5>'+value.name+'</h5>'
                            Html+='<p>'+'￥'+value.cash+'<span  data-id="'+value.prodId+'">'+'代理'+'</span>'+'</p>'
                            Html+='</div>'
                            Html+='</div>'
                        })
                        $('.shops>div').eq(_Index).html(Html)



                }
        })
    },
    //上拉加载
    touch_top:function(Orders,time,Index){
        var bottom = false;
        var _this = this
        time==undefined?time=1:time=time
        //判断是否改变切换排序变量，重置page 页数
        if(Index == _this.oldIndex){
            time=time
        }
        else{
            time=1
        }
        //记录上一次点击的index值
        _this.oldIndex = Index

        var page = time
        //加载函数
        function load_more (){
            var This_h = $(this).scrollTop()
            var Son_h = $('.warp_son').height()
            var See_h = $(this).outerHeight()
            if(Index == _this.oldIndex){
                page=page
            }
            else{
                page=1
            }
            _this.oldIndex = Index


                if(This_h==Son_h-See_h){
                    if(bottom==false){
                        bottom=true
                        Tool.loadingMore($('.shops'))
                        function loading(){
                            page++
                            console.log(page)
                            $.ajax({
                                'url':search.commonApi+'mobile/m_search/getProdList',
                                dataType:'Json',
                                type:'post',
                                data:{curPageNO:page,prop:'衣服',startPrice:'',endPrice:'',orders:Orders,categoryId:'',shopId:'',keyword:''},
                                success:function(res){
                                    console.log(res)
                                    var  Html = '';
                                    var  D = res.data.prodlist
                                    var  Src = search.commonApi+'/photoserver/photo/'
                                    var Class;
                                    if(_this.list_on==false){
                                        Class='shop-mes'
                                    }
                                    else{
                                        Class='list'
                                    }
                                    $.each(D,function(index,value){
                                        Html+='<div class="'+ Class+'" data-id="'+value.prodId+'">'
                                        Html+='<img src='+Src+value.pic+'>'
                                        Html+='<div>'
                                        Html+='<h5>'+value.name+'</h5>'
                                        Html+='<p>'+'￥'+value.cash+'<span  data-id="'+value.prodId+'">'+'代理'+'</span>'+'</p>'
                                        Html+='</div>'
                                        Html+='</div>'
                                    })
                                    $('.shops>.show').append(Html)
                                    $('.shops').css('background','#fff')
                                    _this.Width()
                                    bottom=false;
                                }
                            })
                            Tool.loadingMore(-1);
                        }

                        //加载数据
                        setTimeout(loading,1000)


                    }

               }

        }
        if(this.open==false){
            $('.warp').scroll(load_more)
            this.open=true
        }

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
        $('.shops').on('click','.shop-mes',function(){
            window.location.href='./shop_details.html'
        })
        $('.shops').on('click','.list',function(){
            window.location.href='./shop_details.html'
        })
        $('.shops').on('click','span',function(){
            var _this = $(this)
            if($(this).html()!='已代理'){
                var Shopid =$(this).attr('data-id')
                $.ajax({
                    'url':'http://192.168.6.2:8080/legendshop/productList/Addagent',
                    dataType:'Json',
                    type:'get',
                    data:{shopid:Shopid,userid:'5e2063cd-e7f4-42c2-9013-324d8306b288'},
                    success:function(res){
                        console.log(res)
                        if(res==1){
                            _this.html('已代理')
                            Tool.handle('已代理',1)
                            setTimeout(function(){
                                console.log($('.app').html())
                                Tool.handle('已代理',-1)
                            },1000)
                        }
                    }
                })
            }

            return false;
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


