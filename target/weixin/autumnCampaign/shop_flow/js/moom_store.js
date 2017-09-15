var moom = {
    userId:'',
    requestUrl: function requesturl(attribute) {
        var reg = new RegExp("(^|&)" + attribute + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2].toString());
        return null;
    },
    commonApi: 'http://song.85nv.cn/',
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
    data: function () {
        $.ajax({
            'url': moom.commonApi + 'mobile/shop',
            'dataType': 'Json',
            type: 'post',
            data: {
                'shopId': 1241,
            },
            success: function (res) {
                console.log(res)
                var D = res.data.shopDetail;
                var Src = moom.commonApi + 'photoserver/photo/'
                //logoPic
                console.log(D.shopPic)
                $('.user_message').css({
                    'background': 'url(' + Src + D.shopPic + ')',
                    'background-size': '100% 100%',
                })
                $('.user_message>h1').html(D.siteName)
            }
        })
        // var aa = '5e2063cd-e7f4-42c2-9013-324d8306b288'
        var url = window.location.href
        if (localStorage.getItem('trLoginUserId')) {
            moom.userId = localStorage.getItem('trLoginUserId')
        } else {
            moom.userId = moom.requestUrl('userId')
        }
        console.log(moom.userId)
        $.ajax({
            'url': moom.commonApi + 'mobile/mooncake/myAllProd',
            'dataType': 'Json',
            type: 'post',
            data: {
                'curPageNO': 1,
                'userId': moom.userId
            },
            success: function (res) {
                console.log(res)
                var D = res.data.list
                console.log(D)
                var Html = '';
                $.each(D, function (index, value) {
                    Html += '<div class="shop" data-prodid="'+value.prodId+'">'
                    Html += '<img src="' + moom.commonApi + 'photoserver/photo/' + '' + value.pic + '">'
                    Html += '<div class="mes" >'
                    Html += '<h4>' + value.prodName + '</h4>'
                    Html += '<div class="money">价格：' + '<span>' + value.cash + '</span>'
                    Html += '</div>'
                    Html += '<div class="money">利润：' + '<span>' + value.price + '</span>'
                    Html += '</div>'
                    Html += '</div>'
                    Html += '</div>'
                })
                $('#myMooncakeStore').html(Html)
            }
        })
    }
}
moom.more()
moom.back()
moom.data()
//跳转商品详情
        $('#myMooncakeStore').on('click','.shop',function(){
            console.log($(this).attr('data-prodid'))
            window.location.href = './shop_details.html?prodId=' + $(this).attr('data-prodid') + '&userId=' + moom.userId
        })
           