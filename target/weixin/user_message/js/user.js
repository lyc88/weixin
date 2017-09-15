var user = {
    //性别弹窗
    tapSet:function(){
        $('.tap-sex').on('click',function(){
            $('.sex-warp').show();
            $('.sex-warp .black').show();
            function upslope(){
                var sex =  $('.sex-warp .sex')
                var h = sex.height();
                sex.css({'margin-bottom':-h+'px'});
                sex.siblings('.black').animate({opacity:'0.7'},300)
                sex.animate({'margin-bottom':0+'px'},300)
            }
            upslope();
        })
        $('.sex-warp .sex a').on('click', function () {
            $(this).addClass('sex-active').siblings().removeClass('sex-active')
            var sex = $(this).html()
            function down(){
                var sex =  $('.sex-warp .sex')
                var h = sex.height();
                sex.css({'margin-bottom':0+'px'});
                sex.siblings('.black').animate({opacity:'0'},300)
                sex.animate({'margin-bottom':-h+'px'},300,function(){
                    $('.sex-warp').hide();
                    $('.sex-warp .black').hide();
                })
            }
            down();
            $.ajax(
                {url:'http://song.85nv.cn/mobile/p/updateSex',
                    type:'post',
                    data:{gender:sex},
                    dataType:'Json',
                    success:function(data){
                        if(data.status==1){
                            window.location.reload();
                        }
                    },
                    error:function(data){
                    }}
            )
        })
    },
    //数据
    date:function(){

        $.ajax({
            type:'get',
            url:'http://song.85nv.cn/mobile/personal',
            dataType:'Json',
            beforeSend:Tool.beforeSend(),
            success:function(data){
                var Dat = data.data
                console.log( Dat)
                var  Src = 'http://song.85nv.cn//photoserver/photo/'
                var sex;
                if(Dat.userDetail.sex=='F'){
                    sex='女'
                }
                else{
                    sex='男'
                }
                Tool.deleteLoading()
                var $Img = $('<img src="'+Src+Dat.userDetail.pic+'">')
                $('.touxiang span').html('头像')
                $('.message span').eq(0).html('用户名').siblings('em').html(Dat.userDetail.userName)
                $('.message span').eq(1).html('昵称').siblings('em').html(Dat.userDetail.nickName)
                $('.message span').eq(2).html('性别').siblings('em').html(sex)
                $('.message span').eq(3).html('生日').siblings('em').html(Dat.userDetail.birthDate)
                $('.message span').eq(4).html('收货地址').siblings('em').html('地址/修改')
                $('.touxiang ').append($Img)
                if(Dat.userDetail.sex=='男'){
                    $('.sex a').eq(0).addClass('sex-active')
                }
                else{
                    $('.sex a').eq(1).addClass('sex-active')
                }
            },
        })

    },
    //头像
    tapPhoto:function(){
        $('.tap-photo').on('click',function(){
            $('.photo-warp').show();
            $('.photo-warp .black').show();
            function upslope(){
                var photo=  $('.photo-warp .photo')
                var h = photo.height();
                photo.css({'margin-bottom':-h+'px'});
                photo.siblings('.black').animate({opacity:'0.7'},300)
                photo.animate({'margin-bottom':0+'px'},300)
            }
            upslope();
        })
        $('.photo-warp .photo a').on('click', function () {
            function down(){
                var photo =  $('.photo-warp  .photo')
                var h = photo.height();
                photo.css({'margin-bottom':0+'px'});
                photo.siblings('.black').animate({opacity:'0'},300)
                photo.animate({'margin-bottom':-h+'px'},300,function(){
                    $('.photo-warp ').hide();
                    $('.photo-warp  .black').hide();
                })
            }
            down();
        })
        $('.photo a').eq(0).on('click',function(){
            $('#filetest').click();

        })
        $('.photo a').eq(1).on('click',function(){
            $('#filetest').click()
        })
        $('#filetest').change(function(e) {
            var data = new FormData();
            var fileInfo = $('#filetest')[0].files[0]

                data.append("file", fileInfo);
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;

                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        var  Src = 'http://song.85nv.cn//'
                        var pic_date = JSON.parse(this.responseText)
                        $('.tap-photo>img').attr('src',''+Src+pic_date.data.pic+'')
                    }
                });

                xhr.open("POST", "http://song.85nv.cn/mobile/p/updatePhoto");
                xhr.send(data);
            })

    },
    //跳转页面
    jump:function(){
        $('.nickname').on('click',function(){
            window.location.href="amend_name.html"
        })

        $('.address').on('click',function(){
            window.location.href="../address/address_choose.html"
        })
    }
}
user.tapSet()
user.date()
user.tapPhoto()
user.jump()

