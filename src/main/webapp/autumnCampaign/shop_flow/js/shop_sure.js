var sure = {
    commonApi:'http://song.85nv.cn/',
    //勾取使用抵扣
    discount:function(){
        $('.shop em').on('click',function(){
            if($(this).find('i').css('display') === 'none'){
                $(this).find('i').show();
            } else {
                $(this).find('i').hide();
            }
        })
    },
    //跳转页面
    jump:function(get_data,token){
        // 返回
        $('.icon-llmainpageback').click(function(){
          window.history.back()
        })
        //点击提交跳转页面
        $('.submit a').on('click',function(){
            console.log(token)
            $.ajax({
                'url':sure.commonApi+'mobile/p/order/submit',
                dataType:'Json',
                type:'post',
                data:{'basketStr':get_data,invoiceId:1,payManner:2,token:token,},/*'couponStr':disString*/
                success:function(res){
                    console.log(res)
                    if(res.status==1){
                        localStorage.setItem('orderSubNums',res.data.subNums)
                        window.location.href="../pay/shop_pay.html"
                    }
                }
            })

        })
    },
    //数据
    data:function(){
        var _this =this
        var get_data =  localStorage.getItem('pay_data')
        console.log(get_data)
        $.ajax({
            'url':sure.commonApi+'mobile/p/orderView',
            dataType:'Json',
            type:'post',
            data:{'shopCartItems':get_data},
            success:function(data){
                console.log(data)
                var Src =  sure.commonApi+'photoserver/photo/'
                var Oreder = data.data.order;
                var User = Oreder.userAddress
                var Address = ''+User.province+User.city+User.area+User.subAdds+''
                var Allcash = Oreder.allCash
                console.log( Address)
                //$('.name').html('收货人：'+User.userName)
                //$('.phone').html(User.mobile)
                //$('.hasMessage>p').html('收货地址:'+Address)
                //$('.hasMessage>p').append('<i class="iconfont icon-jiantou">'+'</i>')
                $('.submit>p').html('总额（含运费）：'+'<span>'+'￥'+Allcash.toFixed(2)+'</span>')
                var UserMes =
                    '<div class="message">'+
                    '<i class="iconfont icon-dingwei">'+'</i>'+
                    '<div class="hasMessage">'+
                        '<div class="myMessage">'+'<span class="name">'+User.userName+'</span>'+
                        '<span class="phone">'+User.mobile+'</span>'+
                        '</div>'+
                        '<p>'+'收货地址:'+Address+'</p>'+
                    '</div>'+
                    '</div>';
                $('header').after(UserMes)
                var Html = ''
                var discounts = [];//优惠提交信息
                for(var i = 0; i<Oreder.shopCarts.length ;i++){
                    var shop = ''
                    if(Oreder.shopCarts[i].couponList!=null)
                    {
                        var couponId =  Oreder.shopCarts[i].couponList[0].couponId
                        var shopId =  Oreder.shopCarts[i].couponList[0].shopId
                        var message = ''+couponId+':'+shopId+''
                        discounts.push(message)
                    }

                    for(var j = 0;j<Oreder.shopCarts[i].cartItems.length;j++){
                        shop += '<div class="shopMessage">'
                        shop += '<img src='+Src+Oreder.shopCarts[i].cartItems[j].pic+'>'
                        shop += '<h4>'+Oreder.shopCarts[i].cartItems[j].prodName+'</h4>'
                        shop += '<p>'+Oreder.shopCarts[i].cartItems[j].attribute+'</p>'
                        shop += '<span>'+Oreder.shopCarts[i].cartItems[j].total.toFixed(2)+'</span>'
                        shop += '<i> x'+Oreder.shopCarts[i].cartItems[j].basketCount+'</i>'
                        shop += '</div>'
                    }
                    Html+= '<div class="shop">'
                    Html+= '<h3>'+Oreder.shopCarts[i].shopName+'</h3>'
                    Html+= '<div>'+shop+'</div>'
                    Html += '<h5>'
                    Html += '<span class="shopLeft">'+'促销优惠'+'</span>'
                    Html += '<span class="shopRight">优惠：'+Oreder.shopCarts[i].discountPrice.toFixed(2)+'</span>'
                    Html += '</h5>'
                    Html += '<h5>'
                    Html += '<span class="shopLeft">'+'配送方式'+'</span>'
                    Html += '<span class="shopRight">'+Oreder.shopCarts[i].freightAmount+'</span>'
                    Html += '</h5>'
                    Html+= '</div>'
                }
                var disString = discounts.join(',')//优惠信息
                _this.jump(get_data,data.data.token);
                $('article').html(Html)
                _this.choose_address();
            }
        })
    },
    //选择地址
    choose_address: function () {
        $('.message').on('click','p',function(){
            window.location.href='../address/address_choose.html'
        })
    }

}
sure.discount();
sure.data();

