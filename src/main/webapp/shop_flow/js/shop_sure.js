var sure = {
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
    jump:function(){
        $('.submit a').on('click',function(){
            window.location.href="../pay/shop_pay.html"
        })
    },
    //数据
    data:function(){
        var get_data =  localStorage.getItem('pay_data')
        $.ajax({
            'url':'http://song.85nv.cn/mobile/p/orderView',
            dataType:'Json',
            type:'post',
            data:{'shopCartItems':get_data},
            success:function(data){
                console.log(data)
                var Src =  'http://song.85nv.cn//photoserver/photo/'
                var Oreder = data.data.order;
                var User = Oreder.userAddress
                var Address = ''+User.province+User.city+User.area+User.subAdds+''
                var Allcash = Oreder.allCash
                console.log( Address)
                $('.name').html('收货人：'+User.userName)
                $('.phone').html(User.mobile)
                $('.hasMessage>p').html('收货地址:'+Address)
                $('.hasMessage>p').append('<i class="iconfont icon-jiantou">'+'</i>')
                $('.submit>p').html('总额（含运费）：'+'<span>'+'￥'+Allcash.toFixed(2)+'</span>')
               var Html = '';
                for(var i = 0; i<Oreder.shopCarts.length ;i++){
                    var shop = ''
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
                    Html += '<span class="shopRight">优惠：'+Oreder.shopCarts[i].discountPrice+'</span>'
                    Html += '</h5>'
                    Html += '<h5>'
                    Html += '<span class="shopLeft">'+'配送方式'+'</span>'
                    Html += '<span class="shopRight">'+Oreder.shopCarts[i].freightAmount+'</span>'
                    Html += '</h5>'
                    Html+= '</div>'
                }
                $('article').html(Html)
            }
        })
    },
    //选择地址
    choose_address: function () {
        $('.message').click(function(){
            window.location.href='../address/address_choose.html'
        })
    }

}
sure.discount();
sure.jump();
sure.data();
sure.choose_address();

