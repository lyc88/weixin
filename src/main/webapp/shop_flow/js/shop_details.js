
var details = {
    //nav 三响滑动 选择标题
    nav:function(){
        $('.choose').on('click','a',function(){
            $(this).addClass('active').siblings().removeClass('active')
            var Index =  $(this).index();
            var Width =  $(window).width();
            var i = - Index*Width;
            $('.warp-banner>.swiper-wrapper').css({
                'transform': 'translate3d( '+  i +'px,0 , 0)',
                'transition':' 300ms'
            })

        })
    },

    //轮播图
    banner:function(){
        var swiper = new Swiper('.banner ', {
            paginationClickable: true,
            centeredSlides: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false,
            loop:true

        });
        var swiper1 = new Swiper('.warp-banner ', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            onSlideChangeEnd:function(swiper){
                $('.choose a').eq(swiper.activeIndex).addClass('active').siblings().removeClass('active')
            },
        });

        var swiper2= new Swiper('.reach_on ',{
            initialSlide :0,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
        });

    },

    //热门商品
    hotGoods:function(){
        var Width = $('.swiper-slide ').width()*0.016+'px';
        $(' .good-shops a').each(function(){
            if($(this).index()==1||$(this).index()==4){
                $(this).css({
                    'margin-left':Width,
                    'margin-right':Width
                })
            }
        })
    },

    //关闭弹窗实现下滑
    close:function(target){
        target.on('click',function(){
            var h = target.parent().parent().height();
            target.parent().parent().animate({'margin-bottom':-h+'px'},300)
            $('.black').animate({opacity:'0'},300,function(){
                target.parent().parent().parent().hide();
            })
        })
    },

    //加入购物车/购买
    tap:function(target){
        target.on('click',function(){
            if(sessionStorage.getItem('Login')==1){
                $('.popup').show();
                $('.black').show();
                function down(){
                    var h = $('.shop-countWarp').height();
                    $('.shop-countWarp').css({'margin-bottom':-h+'px'});
                    $('.black').animate({opacity:'0.7'},300)
                    $('.shop-countWarp').animate({'margin-bottom':0+'px'},300)
                }
                down();

            }
            else{
                window.location.href='../login.html'
            }


        })
    },

    //商品数量
    count:function(){
        var n = 1;
        $('.number-on').html(n);
        $('.icon-jia').on('click',function(){
            n = n+1;
            if(n>99){
                n=99;
            }
            $('.number-on').val(n);
        })
        $('.icon-jian').on('click',function(){
            n = n-1;
            if(n<1){
                n=1;
            }
            $('.number-on').val(n);
        })
    },

    //选择商品尺寸
    choose:function(){
        $('.sendOn p').on('click',function(){
            $(this).addClass('activeP').siblings().removeClass('activeP');
            $(this).find('i').addClass('activeP').parent().siblings().find('i').removeClass('activeP');
            $(this).append('<i class="iconfont icon-duigouzhuanhuan"><i>').siblings().find('.icon-duigouzhuanhuan').remove()
        })
    },

    //领券
    privilege:function(){
        $('.privilege span').on('click',function(){
            $('.privileges').show();
            $('.black').show();
            function down(){
                var h = $('.privilegetWarp').height();
                $('.privilegetWarp').css({'margin-bottom':-h+'px'});
                $('.black').animate({opacity:'0.7'},300)
                $('.privilegetWarp').animate({'margin-bottom':0+'px'},300)
            }
            down();
        })
    },

    //送至显示隐藏
    reach:function(){
        $('.reach').on('click',function(){
            $('.sendCity').show();
            $('.black').show();
            function down(){
                var h = $('.sendWarp').height();
                $('.sendWarp').css({'margin-bottom':-h+'px'});
                $('.black').animate({opacity:'0.7'},300)
                $('.sendWarp').animate({'margin-bottom':0+'px'},300)
            }
            down();
        })
    },

    //选择地址    地址渲染
    place:function(){
        var _this = this
        //送至 地点
        function address(){

            $.ajax({
                'url':'http://song.85nv.cn/mobile/common/getProvince',
                dataType:'Json',
                type:'post',
                success:function(data){
                    var D = data.data;
                    for(var i = 0;i<D.provinces.length;i++){
                        var P = document.createElement('p')
                        P.innerHTML=''+D.provinces[i].value+''
                        P.setAttribute('data-key',''+D.provinces[i].key+'')
                        $('.reach_on .swiper-slide').eq(0).append(P)
                    }
                }
            })
            this.getAddress1 = function(key){
                $.ajax({
                    'url':'http://song.85nv.cn/mobile/common/getCityList',
                    dataType:'Json',
                    type:'post',
                    data:{provinceid:key},
                    success:function(data){
                        var D = data.data;
                        for(var i = 0;i<D.citys.length;i++){
                            var P = document.createElement('p')
                            P.innerHTML=''+D.citys[i].value+''
                            P.setAttribute('data-key',''+D.citys[i].key+'')
                            $('.reach_on .swiper-slide').eq(1).append(P)
                        }
                    }
                })
            }
            this.getAddress2 = function(key){
                $.ajax({
                    'url':'http://song.85nv.cn/mobile/common/getAreaList',
                    dataType:'Json',
                    type:'post',
                    data:{cityid:key},
                    success:function(data){
                        var D = data.data;
                        for(var i = 0;i<D.areas.length;i++){
                            var P = document.createElement('p')
                            P.innerHTML=''+D.areas[i].value+''
                            P.setAttribute('data-key',''+D.areas[i].key+'')
                            $('.reach_on .swiper-slide').eq(2).append(P)
                        }
                    }
                })
            }
        }
        var address_obj = new address();
        //省份
        $('.place .swiper-slide').eq(0).show();
        $('.place .swiper-slide').eq(0).on('click','p',function(){
            $('.place .swiper-slide').eq(1).show();
            var Key = $(this).attr('data-key')
            var H = $(this).html();                   //选择内容
            var Width =  $(window).width();
            var Index = $(this).parent().index()+1;
            $('.reach_on>.swiper-wrapper').css({
                'transform': 'translate3d( '+ - Width*Index +'px,0 , 0)',
                'transition':' 300ms'
            })
            $(this).addClass('red_on').siblings().removeClass('red_on')
            if( !$('.sendTo h5 span').hasClass('placeOn')){
                $('.sendTo h5 .choose-red').before('<span class="placeOn">'+H+ '</span>')
                var span_On  = $('.placeOn').outerWidth(true)
                $('.choose-red').css({
                    'transform': 'translate3d( '+ span_On  +'px,0 , 0)',
                    'transition':' 300ms'
                })
                $('.line').css({
                    'transform': 'translate3d( '+  span_On +'px,0 , 0)',
                    'transition':' 300ms'
                })
            }
            else{
                $('.sendTo h5 .placeOn').html(H)
            }
            address_obj.getAddress1(Key)
        } )
        //市区
        $('.place .swiper-slide').eq(1).on('click','p',function(){
            $('.place .swiper-slide').eq(2).show();
            var Key = $(this).attr('data-key')
            var H = $(this).html();                   //选择内容
            var Width =  $(window).width();
            var Index = $(this).parent().index()+1;
            $('.reach_on>.swiper-wrapper').css({
                'transform': 'translate3d( '+ - Width*Index +'px,0 , 0)',
                'transition':' 300ms'
            })
            $(this).addClass('red_on').siblings().removeClass('red_on')
            if( !$('.sendTo h5 span').hasClass('placeTo')){
                $('.sendTo h5 .choose-red').before('<span class="placeTo">'+H+ '</span>')
                var span_On  = $('.placeOn').outerWidth(true)
                var span_To  = $('.placeTo').outerWidth(true)
                var len = span_On + span_To
                $('.choose-red').css({
                    'transform': 'translate3d( '+  len  +'px,0 , 0)',
                    'transition':' 300ms'
                })
                $('.line').css({
                    'transform': 'translate3d( '+  len  +'px,0 , 0)',
                    'transition':' 300ms'
                })
            }
            else{
                $('.sendTo h5 .placeTo').html(H)
            }
            address_obj.getAddress2(Key)
        } )
        //县镇
        $('.place .swiper-slide').eq(2).on('click','p',function(){
            var H = $(this).html();                   //选择内容
            /*            $(this).addClass('red_on').siblings().removeClass('red_on')
             if( !$('.sendTo h5 span').hasClass('placeThat')){
             $('.sendTo h5 .choose-red').before('<span class="placeThat">'+H+ '</span>')
             var span_On  = $('.placeOn').outerWidth(true)
             var span_To  = $('.placeTo').outerWidth(true)
             var span_That  = $('.placeThat').outerWidth(true)
             //移动距离
             var len = span_On + span_To + span_That
             $('.choose-red').css({
             'transform': 'translate3d( '+  len  +'px,0 , 0)',
             'transition':' 300ms'
             })
             $('.line').css({
             'transform': 'translate3d( '+  len  +'px,0 , 0)',
             'transition':' 300ms'
             })
             }
             else{
             $('.sendTo h5 .placeThat').html(H)
             }*/
            var h = $('.sendWarp').height();
            $('.sendWarp').animate({'margin-bottom':-h+'px'},300)
            $('.black').animate({opacity:'0'},300,function(){
                $('.sendCity').hide();
            })
            var writeAddress = $('.placeOn').html()+'>'+ $('.placeTo').html() + '>' + H
            $('.reached').html(writeAddress)
            $('.placeOn').remove()
            $('.placeTo').remove()
            $('.place').removeClass('resd_on')
            $('.place .swiper-slide').eq(1).hide();
            $('.place .swiper-slide').eq(2).hide();
            $('.reach_on>.swiper-wrapper').css({
                'transform': 'translate3d( 0 ,0 , 0)',
                'transition':' 300ms'
            })
            $('.choose-red').css({
                'transform': 'translate3d( 0 ,0 , 0)',
                'transition':' 300ms'
            })
            $('.line').css({
                'transform': 'translate3d( 0 ,0 , 0)',
                'transition':' 300ms'
            })
            _this.freight($(this).attr('data-key'))

        } )
    },
    //运费
    freight:function (clickCity){

        if(sessionStorage.getItem('Or_menoy')==1){
            $('.freight').html('商家承担运费')
        }
        else{
            $('.freight').html('买家承担运费')
            var ShopId = sessionStorage.getItem('ShopId');
            var TransportId = sessionStorage.getItem('TransportId');
            var Weight = sessionStorage.getItem('Weight')
            var Volume = sessionStorage.getItem('Volume')
            var CityId    =   clickCity
            $.ajax({
                'url':'http://song.85nv.cn/mobile/api/getProdFreight',
                dataType:'Json',
                type:'post',
                data:{
                    shopId: ShopId ,
                    cityId:CityId ,
                    transportId:TransportId,
                    totalCount:1,
                    totalWeight:Weight,
                    totalvolume:Volume,
                },
                success:function(data){
                    if(data.data!=undefined){
                        $('.freight').html(''+data.data.list[0].desc+'')
                    }

                }
            })
        }
    },
    //数据内容 商品详情  图文详情
    data_shop:function(){
        var _this =this;
        //商品详情页渲染

        $.ajax({
            url:'http://song.85nv.cn/mobile/prod/views',
            dataType:'Json',
            type:'post',
            beforeSend:Tool.beforeSend(),
            data:{'prodId':2109},//690
            success:function(data){
                var D = data.data
                var  Src = 'http://song.85nv.cn//photoserver/photo/'
                var  Prod = D.prod
                var  Sku   = Prod.skuDtoList
                var  ProdPropDtoList = Prod.prodPropDtoList
                var  ProdId = Prod.prodId
                var  Count,SkuId;
                console.log(data)
                Tool.deleteLoading()
                //存收货信息
                sessionStorage.setItem('Or_menoy',''+Prod.supportTransportFree+'')
                sessionStorage.setItem('ShopId',''+D.shopDetail.shopId+'')
                sessionStorage.setItem('TransportId',''+Prod.transportId+'')
                sessionStorage.setItem('Weight',''+Prod.weight+'')
                sessionStorage.setItem('Volume',''+Prod.volume+'')

                //banner 元素添加
                function banner_img(){
                    for(var i = 0; i< Prod.prodPics.length;i++)
                    {
                        var Swiper = $('.banner .swiper-wrapper')
                        var Div = document.createElement('div');
                        var Banner = document.createElement('img')
                        var A = document.createElement('a')
                        Banner.setAttribute('src',''+Src+Prod.prodPics[i].filePath+ '')
                        Div.setAttribute('class','swiper-slide')
                        A.setAttribute('href',''+Src+Prod.prodPics[i].filePath+ '')
                        A.setAttribute('data-size','1600x1600')
                        A.setAttribute('data-med',''+Src+Prod.prodPics[i].filePath+ '')
                        A.setAttribute('data-med-size','1024x1024')
                        Swiper.append(Div)
                        Div.appendChild(A)
                        A.appendChild(Banner)
                    }
                    $('.shop h3').html(D.prod.name)
                    $('.shop h4').html('￥'+D.prod.cash)
                    _this.banner();
                }
                banner_img()

                //hotshop 热销好货
                function hot_shop(){
                    var Hot = D.hotProducts
                    for(var i = 0;i<Hot.length;i++){
                        var A = document.createElement('a')
                        var Img = document.createElement('img')
                        var P = document.createElement('p')
                        var Span = document.createElement('span')
                        A.setAttribute('data-id',''+Hot[i].prodId+'')
                        Img.setAttribute('src',''+Src+Hot[i].pic+'')
                        P.innerHTML=''+Hot[i].prodName+''
                        Span.innerHTML='￥'+Hot[i].cash+''
                        $('.good-shops>div').append(A)
                        A.appendChild(Img)
                        A.appendChild(P)
                        A.appendChild(Span)
                    }
                    _this.hotGoods();
                }
                hot_shop()

                // _shop 选择商品 信息展示
                function _shop(){

                    //写死固定 图片 信息  this.message
                    var Img_container = $('.this-top-l')                           //图片包裹层
                    var Message = $('.this-top-r')                                 //信息包裹层
                    var Shop_main = $('.this-main')                                //中间信息层
                    var Img = document.createElement('img')
                    Img_container.append(Img)                                       //添加图片元素
                    this.Message = function(i){
                        i==undefined||null?i=0:i=i;
                        Img.setAttribute('src',''+Src+Prod.pic+'')             //图片
                        Img_container.append(Img)
                        Message.find('h4').html('￥'+Sku[i].price)               //价格
                        Message.find('h5').html('库存'+Sku[i].stocks+'件')       //库存
                    }
                    this.Message()
                    for(var j = ProdPropDtoList.length-1;j>=0;j--){
                        var H4 = document.createElement('h4')
                        var Div = document.createElement('div')
                        Div.setAttribute('class','norms')
                        Div.setAttribute('data-id',''+ProdPropDtoList[j].propId+'')
                        H4.innerHTML=''+ProdPropDtoList[j].propName+''
                        Shop_main.append(H4)
                        Shop_main.append(Div)
                        for(var k = 0;k<ProdPropDtoList[j].productPropertyValueList.length;k++){
                            var len = $('.norms').length
                            var Norms = $('.norms').eq(len-1)
                            var Span =document.createElement('span')
                            Span.setAttribute('data-value-id',''+ProdPropDtoList[j].productPropertyValueList[k].valueId+'')
                            Span.innerHTML=''+ProdPropDtoList[j].productPropertyValueList[k].name+''
                            Norms.append(Span)
                        }
                    }
                }
                var C = new _shop()
                //选择商品规格
                $('.norms').on('click','span',function(){
                    $(this).addClass('activeOn').siblings().removeClass('activeOn')
                    /*alert(style)*/
                    var Index = $(this).index();
                    //满足点击次数触发事件 例如3个可选择的 尺寸  颜色  大小
                    if($('.activeOn').length==ProdPropDtoList.length){
                        var Mate = []     //第一轮排序数组对象
                        var New = []     //第二轮排序后数组
                        //添加push 添加id
                        for(var i = 0;i<ProdPropDtoList.length;i++){
                            var  Id = $('.activeOn').parent().eq(i).attr('data-id')
                            var  Value_id = $('.activeOn').eq(i).attr('data-value-id')
                            var obj={};
                            obj.norms=Id;
                            obj.id=Value_id;
                            Mate.push(obj)
                        }
                        //排序函数 compare
                        var compare = function (prop) {
                            return function (obj1, obj2) {
                                var val1 = obj1[prop];
                                var val2 = obj2[prop];
                                if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                                    val1 = Number(val1);
                                    val2 = Number(val2);
                                }
                                if (val1 < val2) {
                                    return -1;
                                } else if (val1 > val2) {
                                    return 1;
                                } else {
                                    return 0;
                                }
                            }
                        }
                        Mate.sort(compare('norms'))          //排序
                        //提取添加到New  排序后数组
                        for(var a = 0;a<Mate.length;a++){
                            New.push(Mate[a].norms+':'+Mate[a].id)
                        }
                        //转换成字符串形式
                        var New_string =   New.join(';')
                        //进行比对   获取库存金额
                        for(var j = 0;j<Sku.length;j++){
                            if(Sku[j].properties==New_string){
                                C.Message(j);
                                SkuId = Sku[j].skuId
                                console.log('abc')
                                var Len = $('.activeOn').length;
                                var style = '';
                                for(var a = 0 ;a<Len;a++){
                                    var mes = $('.activeOn').eq(a).html()
                                    style += '"'+mes+'";'
                                }
                                $('.selected-name').html(style)
                            }
                            else{

                            }
                        }
                    }
                })
                //添加购物车
                $('.go>a').click(function(){
                    var Index = $(this).index()
                    if(SkuId){
                        Count = $('.number-on').val()
                        _this.addshopcart(ProdId,SkuId,Count,Index)
                    }
                })
            }
        })

    },
    //评论
    comment:function(index){
        var open = index;

        //评论
        index==undefined?index=-1:index=index;
        $.ajax({
            'url':'http://song.85nv.cn/mobile/getCommentsByProId',
            dataType:'Json',
            type:'post',
            data:{'prodId':1438,'queryType':index,'curPageNO':1},
            success:function(data){
                var D = data.data;
                if(data.totalAllCount!=undefined){
                    $('.all-comment').html(''+data.totalAllCount+'')
                    $('.good-comment').html(''+data.totalAllCount+'')
                    $('.common-comment').html(''+data.commentsCount+'')
                    $('.bad-comment').html(''+data.badCount+'')
                    $('.photo-comment').html(''+data.picCount+'')
                }
                var Html = '';
                var  Src = 'http://song.85nv.cn//photoserver/photo/'
                // 评论数  和  好评率
                $('.use>h3>em').html(data.totalAllCount)
                $('.use>h3>span').html((data.totalAllCount/data.totalAllCount*100)+'%好评')
                function formatDateTime(inputTime) {
                    var date = new Date(inputTime);
                    var y = date.getFullYear();
                    var m = date.getMonth() + 1;
                    m = m < 10 ? ('0' + m) : m;
                    var d = date.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    var h = date.getHours();
                    h = h < 10 ? ('0' + h) : h;
                    var minute = date.getMinutes();
                    var second = date.getSeconds();
                    minute = minute < 10 ? ('0' + minute) : minute;
                    second = second < 10 ? ('0' + second) : second;
                    return y + '-' + m + '-' + d;
                };
                function writeComments(){
                    for(var i = 0 ;i<D.comments.length;i++){
                        var Time = formatDateTime(D.comments[i].addtime/1000)
                        var Someone  =  D.comments[i].isAnonymous
                        var Photo1 = D.comments[i].photoFile1
                        var Photo2 = D.comments[i].photoFile2
                        var Photo3 = D.comments[i].photoFile3
                        var Photo4 = D.comments[i].photoFile4
                        var Photo5 = D.comments[i].photoFile5
                        var Username;
                        if(Someone==1){
                            Username = '匿名'
                        }
                        else{
                            Username = D.comments[i].userName;
                        }
                        var Comments =  D.comments[i].comments;
                        var Score    =  D.comments[i].score;
                        var Star = '';
                        for(var j = 0;j<Score ;j++){
                            Star+='<img src="../images/star_red.png">'
                        }
                        for(var k = 0 ;k=5-Score ;k++){
                            Star+='<img src="../images/star_white.png">'
                        }
                        Html += '<div class="use-warp">'
                        Html += '<div class="use-someone">'
                        Html += '<div class="use-mes">'
                        Html += '<span class="star">'+  Star +'</span>'
                        Html += '<span class="name">'+ Username +'</span>'
                        Html += '<time>'+ Time +'</time>'
                        Html += '</div>'
                        Html += '<p>'+Comments+'</p>'
                        Html += '<div class="picture">'
                        Html += '<a href='+Src+Photo1+' data-size="1600x1600" data-med='+Src+Photo1+' data-med-size="1024x1024">'+'<img src='+Src+Photo1+'>'+'</a>'
                        Html += '<a href='+Src+Photo1+' data-size="1600x1600" data-med='+Src+Photo1+' data-med-size="1024x1024">'+'<img src='+Src+Photo2+'>'+'</a>'
                        Html += '<a href='+Src+Photo1+' data-size="1600x1600" data-med='+Src+Photo1+' data-med-size="1024x1024">'+'<img src='+Src+Photo3+'>'+'</a>'
                        Html += '<a href='+Src+Photo1+' data-size="1600x1600" data-med='+Src+Photo1+' data-med-size="1024x1024">'+'<img src='+Src+Photo4+'>'+'</a>'
                        Html += '<a href='+Src+Photo1+' data-size="1600x1600" data-med='+Src+Photo1+' data-med-size="1024x1024">'+'<img src='+Src+Photo5+'>'+'</a>'
                        Html += '</div>'
                        Html += '<em>'+'化妆品含净量：100ml'+'</em>'
                        Html += '</div>'
                        Html += '</div>'
                    }
                    $('.use-discuss').html(Html)
                }
                //评论页  信息
                writeComments()
                function threeComments(){
                    var Html = '';
                    for(var i = 0 ;i<2;i++){
                        var Someone  =  D.comments[i].isAnonymous
                        var Username;
                        if(Someone==1){
                            Username = '匿名'
                        }
                        else{
                            Username = D.comments[i].userName;
                        }
                        var Comments =  D.comments[i].comments;
                        var Score    =  D.comments[i].score;
                        var Photo =  D.comments[i].photo;
                        var Star = '';
                        for(var j = 0;j<Score ;j++){
                            Star+='<img src="../images/star_red.png">'
                        }
                        for(var k = 0 ;k=5-Score ;k++){
                            Star+='<img src="../images/star_white.png">'
                        }
                        Html += '<div class="discuss">'
                        Html += '<div class="grade">'
                        Html += '<div class="star">'
                        Html += '<div class="star-on">'+Star+'</div>'
                        Html += '</div>'
                        Html += '<div class="use-name">'
                        Html += '<img src='+Src+Photo+'>'
                        Html += +Username+'</div>'
                        Html += '</div>'
                        Html += '<p>'+Comments+'</p>'
                        Html += '</div>'
                    }
                    $('.three-discuss').append(Html)
                }
                // 商品详情页的评论
                if(open==undefined){
                    threeComments()
                }

                var Width =  $(window).width();
                $('.use-more').on('click','a',function(){
                    $('.warp-banner>.swiper-wrapper').css({
                        'transform': 'translate3d( '+ -Width*2 +'px,0 , 0)',
                        'transition':' 300ms'
                    })
                    $('.choose a').eq(2).addClass('active').siblings().removeClass('active')
                })

            }
        })
    },
    //评论选择
    choose_commen:function(){
        var _this = this;
        $('.all-discuss').on('click','a',function(){
            $(this).addClass('active').siblings().removeClass('active')
            var Index = $(this).index()
            switch (Index){
                case 0:
                    Index = -1
                    break;

                case 1:
                    Index = 0
                    break;

                case 2:
                    Index = 1
                    break;

                case 3:
                    Index = 2
                    break;

                case 4:
                    Index = 3
                    break;
            }
            _this.comment(Index)
        })
    },
    //添加购物车
    addshopcart:function(prodId,sku_id,count,num){
        $.ajax({
            'url':'http://song.85nv.cn/mobile/addShopCart',
            dataType:'Json',
            type:'post',
            data:{prodId:prodId,sku_id:sku_id,count:count},
            success:function(data){
                console.log(data)
                if(data.status==1){
                    if(num==0){
                        $('.popup .icon-icon').click();
                        $('.app').show();
                        setTimeout(function(){
                            $('.app').hide();
                        },1000)
                    }
                    else if(num ==1){
                        window.location.href='./shop_car.html'
                    }
                }
            }
        })
    },
    /*    //好评率高度居中
     Height:function(){
     var  warp = $('.good-discussrate').height();
     $('.good-discussrate h4').height(warp/2);
     $('.good-discussrate h4').css('line-height',warp/2+'px')
     },*/
    //跳转页
    jump:function (){
        $('.icon-gouwuche').click(function(){
            window.location.href='./shop_car.html'
        })
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

}

details.close($('.privilegeticket .icon-icon'));
details.close($('.popup .icon-icon'));
details.close($('.sendCity .sendTo .icon-icon'));
details.tap($('.shopcar'));
details.tap($('.buy'));
details.tap($('.selected'));
details.count();
details.choose();
details.privilege();
details.reach();
details.place();
details.nav();
details.data_shop()
details.freight();
details.comment();
details.choose_commen();
details.jump()
details.more()



