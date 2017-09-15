var car = {
    commonApi:'http://song.85nv.cn/',
    //选择页面
    Tap: function () {
        $('.choose a').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active')
        })
    },
    //加减数量,总计，商品数量，选中，减号灰色
    count: function () {
        var _this = this
        //取消商家所有选中、全选
        function all() {
            var all_show = $('.shop-one .title .show ')
            var all_em = $('.shop-one .title em ')
            var one_show = $('.shop-one .contect em .show ')
            var one_em = $('.shop-one .contect em  ')
            if (all_show.length !== all_em.length || one_em.length !== one_show.length) {
                $('.all-shop em i').removeClass('show')
                $('.all-shop em ').addClass('unselected')
            }
            else {
                $('.all-shop em i').addClass('show')
                $('.all-shop em ').removeClass('unselected')

            }
        }

        //减号灰色
        function setColor(ele) {
            var Is = ele !== undefined ? ele : $('.has  .shop-one .number-on');
            /* if(!Is.length) Is.length = 1;*/
            for (var i = 0; i < Is.length; i++) {
                if (parseInt(Is.eq(i).val()) == 1) {
                    Is.eq(i).parent().find('.icon-jian').css({'color': '#d4d4d4'})
                } else {
                    Is.eq(i).parent().find('.icon-jian').css({'color': '#3c3c3c'})
                }
            }
        }

        //总结计算金额
        function total() {
            var num = $('.contect em .show')
            /*.number-on*/
            var all = 0;
            /* var price = $('.contect ')*/
            /*.price-on*/
            /* alert(num.parent().siblings('.contect-right').find('.price-on').html().slice(1))*/
            var priceAll = 0;
            for (var i = 0; i < num.length; i++) {
                all += parseInt(num.parent().eq(i).siblings('.contect-right').find('.number-on').val())
                priceAll += parseInt(num.parent().eq(i).siblings('.contect-right').find('.number-on').val()) * parseFloat(num.parent().eq(i).siblings('.contect-right').find('.price-on').html().slice(1))

            }
            $('.all-shop .all-money>a>i').html(all)
            $('.all-shop .all-money>div>p>span').html('￥' + priceAll.toFixed(2))
        }

        //改变数量
        function change_num(Id,Num,Basket){
            $.ajax({
                'url':car.commonApi+'mobile/cart/change',
                dataType:'Json',
                type:'post',
                    data:{'prodId':Id,'num':Num,'basketId':Basket},
                success:function(data) {
                    console.log(data)
                }
            })
        }
        setColor();
        total();
        all();
        //商品数量
        $('.has  .shop-one ').on('click', '.icon-jia', function () {
            var _this_contect_right = $(this).parent().parent().parent()
            var base = _this_contect_right.siblings('em').find('i').attr('data-basketid')
            var prod = _this_contect_right.siblings('em').find('i').attr('data-prodId')
            var num = $(this).parent().find('.number-on');
            var c = num.val();
            var n = parseInt(c);
            n = n + 1;
            if (n > 99) {
                n = 99;
            }
            num.val(n);
            setColor(num);
            total();
            change_num(prod,n,base)
        })
        $('.has  .shop-one ').on('click', '.icon-jian', function () {
            var _this_contect_right = $(this).parent().parent().parent()
            var base = _this_contect_right.siblings('em').find('i').attr('data-basketid')
            var prod = _this_contect_right.siblings('em').find('i').attr('data-prodId')
            var num = $(this).parent().find('.number-on');
            var c = num.val();
            var n = parseInt(c);
            n = n - 1;
            if (n <= 1) {
                n = 1;
            }
            num.val(n);
            setColor(num);
            total();
            change_num(prod,n,base)
        })

        //标题全选中
        $('.shop-one .title ').on('click', 'em', function () {
            var $i = $(this).find('i');
            if ($i.hasClass('show') === true) {
                $i.removeClass('show');
                $(this).parent().siblings('.contect').find('i').removeClass('show')
                $(this).parent().parent().find('em').addClass('unselected')
            }
            else {
                $i.addClass('show');
                $(this).parent().siblings('.contect').find('i').addClass('show')
                $(this).parent().parent().find('em').removeClass('unselected')

            }
            all();
            total();
            _this.pay_bill()
        })
        //单品选中
        $('.shop-one .contect ').on('click', 'em', function () {
            //单品选择
            var $i = $(this).find('.icon-gou')
            if ($i.hasClass('show') === true) {
                $i.removeClass('show')
                $(this).addClass('unselected')
            }
            else {
                $i.addClass('show')
                $(this).removeClass('unselected')
            }
            //店家选择
            if ($(this).parent().parent().find('.contect em .show').length === 0) {
                $(this).parent().siblings('.title').find('.icon-gou ').removeClass('show')
                $(this).parent().siblings('.title').find('em ').addClass('unselected')
            }
            else {
                $(this).parent().siblings('.title').find('.icon-gou ').addClass('show')
                $(this).parent().siblings('.title').find('em ').removeClass('unselected')
            }
            all();
            total();
            _this.pay_bill()
        })
        //取消全选，全选
        $('.all-shop ').on('click', 'em', function () {

            if ($(this).find('i').hasClass('show') === true) {
                $(this).find('i').removeClass('show')
                $(this).addClass('unselected')
                $('.has .shop-one em i').removeClass('show')
                $('.has .shop-one em ').addClass('unselected')

            }
            else {
                $(this).find('i').addClass('show')
                $(this).removeClass('unselected')
                $('.has .shop-one em i').addClass('show')
                $('.has .shop-one em ').removeClass('unselected')
            }
            total();
            _this.pay_bill()
        })
        //input onchange 改变count数量
         $('.has .shop-one ').on('change','input',function(){
             var _this_contect_right = $(this).parent().parent().parent()
             var base = _this_contect_right.siblings('em').find('i').attr('data-basketid')
             var prod = _this_contect_right.siblings('em').find('i').attr('data-prodId')
             if($(this).val()>0){
                 total();
                 change_num(prod,$(this).val(),base)
             }
             else{
                 $(this).val(1)
             }

         })
    },
    //选择商品
    choose: function () {
        $('.choose a').eq(1).on('click', function () {
            window.location.href = "../classify.html"
        })
        $('.choose a').eq(0).on('click', function () {
            window.location.href = "../index.html"
        })
        $('.choose a').eq(3).on('click', function () {
            window.location.href = "../my/my.html"
        })
    },
    //login
    login_car:function () {
        // var openId = sessionStorage.getItem('trOpenId')
        var openId = localStorage.getItem('trOpenId')
        $.ajax({
            url: 'http://song.85nv.cn/mobile/user/app/login',
            type: 'post',
            dataType:'Json',
            async:false,
            data: {
                openId: openId,
                type: 'weixin'
            },
            success: function (res) {
                console.log(res)
                if (res.status == 0) {
                    alert('请使用微信登录')
                    // window.location.href = '../set/phone_amend.html'
                } else if (res.status == 1) {
                    console.log('登录成功')
                    sessionStorage.setItem('trloginStatus',1)
                } else if (res.status == -2) {
                    alert('未注册的openId')
                    window.location.href = '../set/phone_amend.html'
                }
            }
        })
    },
    //数据接入 data
    car_data: function (target) {
        console.log('进来了')
        var _this = target
        $.ajax({
            url: car.commonApi+'mobile/shopcart/list',
            dataType: 'Json',
            type: 'post',
            async:false,
            success: function (data) {
                console.log(data)

                function shop() {
                    var Src = car.commonApi+'photoserver/photo/'
                    var Has = $('.has')
                    var ShopOne = document.createElement('div')
                    var Title = document.createElement('div')
                    var Em = document.createElement('em')
                    var H3 = document.createElement('h3')
                    var Span = document.createElement('span')
                    var Em_i = document.createElement('i')
                    var Span_i = document.createElement('i')

                    var Contect = document.createElement('div')
                    var Em1 = document.createElement('em')
                    var Em1_i = document.createElement('i')
                    var Img = document.createElement('img')
                    var Contect_right = document.createElement('div')
                    var H4 = document.createElement('h4')
                    var P = document.createElement('p')
                    var Price = document.createElement('div')
                    var Span1 = document.createElement('span')
                    var Span2 = document.createElement('span')
                    var Num = document.createElement('div')
                    var Num_i1 = document.createElement('i')
                    var Input = document.createElement('input')
                    var Num_i2 = document.createElement('i')
                    this.add_store = function (i) {
                        ShopOne.setAttribute('class', 'shop-one')
                        Em_i.setAttribute('class', 'iconfont icon-gou show')
                        Span_i.setAttribute('class', 'iconfont icon-jiantou')
                        Title.setAttribute('class', 'title')
                        Has.append(ShopOne)
                        ShopOne.appendChild(Title)
                        Title.appendChild(Em)
                        Title.appendChild(H3)
                        Title.appendChild(Span)
                        Span.innerHTML = '领优惠券'
                        Span.appendChild(Span_i)
                        Em.appendChild(Em_i)
                        H3.innerHTML = '' + store[i].shopName + ''
                    }
                    this.add_shop = function (i, j) {
                        var Shopone = $('.shop-one')
                        Contect.setAttribute('class', 'contect')
                        Em1_i.setAttribute('class', 'iconfont icon-gou show')
                        Contect_right.setAttribute('class', 'contect-right')
                        Price.setAttribute('class', 'price')
                        Span1.setAttribute('class', 'price-on')
                        Span2.setAttribute('class', 'price-cut')
                        Num.setAttribute('class', 'number-how')
                        Num_i1.setAttribute('class', 'iconfont icon-jian')
                        Input.setAttribute('class', 'number-on')
                        Num_i2.setAttribute('class', 'iconfont icon-jia')
                        Shopone.eq(i).append(Contect)
                        Contect.appendChild(Em1)
                        Contect.appendChild(Img)
                        Contect.appendChild(Contect_right)
                        Em1.append(Em1_i)
                        Contect_right.appendChild(H4)
                        Contect_right.appendChild(P)
                        Contect_right.appendChild(Price)
                        Price.appendChild(Span1)
                        Price.appendChild(Span2)
                        Price.appendChild(Num)
                        Num.appendChild(Num_i1)
                        Num.appendChild(Input)
                        Num.appendChild(Num_i2)
                        Em1_i.setAttribute('data-basketId', '' + store[i].cartItems[j].basketId + '')
                        Em1_i.setAttribute('data-shopId', '' + store[i].cartItems[j].shopId + '')
                        Em1_i.setAttribute('data-prodId', '' + store[i].cartItems[j].prodId + '')
                        Em1_i.setAttribute('data-skuId', '' + store[i].cartItems[j].skuId + '')
                        Img.setAttribute('src', '' + Src + store[i].cartItems[j].pic + '')
                        H4.innerHTML = '' + store[i].cartItems[j].prodName + ''
                        P.innerHTML = '' + store[i].cartItems[j].promotionInfo + ''
                        Span1.innerHTML = '￥' + store[i].cartItems[j].amountDetail.promotionPrice.toFixed(2) + ''
                        Span2.innerHTML = '￥' + store[i].cartItems[j].amountDetail.price.toFixed(2) + ''
                        Input.value = '' + store[i].cartItems[j].basketCount + ''
                    }
                }

                if (data.status == 1) {

                    var store;
                    if (data.data.shopCart != null) {
                        store = data.data.shopCart.shopCarts
                        if (store.length != 0) {

                            for (var i = 0; i < store.length; i++) {
                                var Shop_message = new shop();
                                Shop_message.add_store(i)
                                for (var j = 0; j < store[i].cartItems.length; j++) {
                                    var Shop_message = new shop();
                                    Shop_message.add_shop(i, j)
                                }

                            }
                            _this.count()
                            _this.pay_bill()
                        }
                        else {
                            $('.none').css({'display': 'block'})
                            $('.car-none').css({'display': 'block'})
                        }
                    }
                    else {
                        $('.none').css({'display': 'block'})
                        $('.car-none').css({'display': 'block'})
                        $('.all-money>a').css('background','#b4b4b4')
                        $('.all-money>a').unbind()
                    }

                }
                else {
                    $('.none').css({'display': 'block'})
                    $('.login-none').css({'display': 'block'})

                }

            }
        })
    },
    //上拉刷新
    refresh_top: function () {

    },
    //跳转页面
    jump: function () {
        $('.login-none').click(function () {
            window.location.href = '../login.html'
        })
        $('#continueToBuy').click(function(){
            console.log('跳')
            window.location.href = './mooncake.html'
        })
    },
    //cart/del 删除购物车
    delete: function () {
        $('.btn_D').click(function () {
            var Baskeid = []
            var Shopid = []
            var Skuid = []
            var Len = $('.contect .show').length
            for (var i = 0; i < Len; i++) {
                Baskeid.push($('.contect .show').eq(i).attr('data-basketid'))
                Shopid.push($('.contect .show').eq(i).attr('data-shopid'))
                Skuid.push($('.contect .show').eq(i).attr('data-skuid'))
            }
            var baseId = Baskeid.join()
            var shopId = Shopid.join()
            var skuId = Skuid.join()
            console.log(baseId)
            $.ajax({
                'url': car.commonApi+'mobile/cart/del',
                dataType: 'Json',
                type: 'post',
                data: {basket_id: baseId, prod_id: shopId, sku_id: skuId},
                success: function (data) {
                    console.log(data)
                    if(data.status==1){
                      location.reload(true)
                    }
                }
            })
        })
    },
    //编辑切换
    compile: function () {
        var open = true;
        $('header span').click(function () {
            if(open){
                $(this).html('完成')
                $('.delete').show()
                open=false
            }
            else{
                $(this).html('编辑')
                $('.delete').hide()
                open=true
            }

        })

    },
    //结算 jump => shop_sure
    pay_bill:function(){
        var open = false
        var num = $('.contect em .show')
        num.length!=0?open=true:open=false
        if(open==true){
            $('.all-money>a').css('background','#ea0000')
            $('.all-money>a').click(function(){
                var Baskeid = []
                var Len = $('.contect .show').length
                for (var i = 0; i < Len; i++) {
                    Baskeid.push($('.contect .show').eq(i).attr('data-basketid'))
                }
                var baseId = Baskeid.join()
                localStorage.setItem('pay_data',baseId)
                window.location.href='./shop_sure.html'
            })
        }
        else{
            $('.all-money>a').css('background','#b4b4b4')
            $('.all-money>a').unbind()

        }
        }


}
var target = car
$('#triggerLogin').on('click',car.car_data(target))
if(sessionStorage.getItem('trloginStatus')==1){
    console.log('登录成功')
    $('#triggerLogin').trigger('click')
}
//car.Tap();
car.login_car()
car.choose();

car.jump();
car.delete();
car.compile();

var moom = {
    Tap:function(){
        $('.choose a').on('click',function(){
            $(this).addClass('active').siblings().removeClass('active')
        })
    },
    Jump:function(){
        $('.choose a').eq(0).on('click',function(){
            window.location.href='./mooncake.html'
        })
        $('.choose a').eq(2).on('click',function(){
            window.location.href='../myInfo.html'
        })
    }
}
moom.Tap()
moom.Jump()
//判断登录状态再触发获取事件
