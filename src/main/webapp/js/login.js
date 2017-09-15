var login = {
    //焦点，取消input内容
    blur:function(){
        var see = true;
        //获取焦点
       $('input').on('focus',function(){
          $(this).siblings('.icon-icon').show();
          $(this).siblings('.icon-artboard31').addClass('Ired');
           $(this).siblings('.icon-suo').addClass('Ired');
           $(this).parent().addClass('red')
       })
        //失去焦点
        $('input').on('blur',function(){
            $(this).siblings('.icon-artboard31').removeClass('Ired');
            $(this).siblings('.icon-suo').removeClass('Ired');
            $(this).parent().removeClass('red')
            var ele = $(this).siblings('.icon-icon');
            setTimeout(function() {
                ele.hide();
            }, 100)
        })
        //input值为空
        $('.icon-icon').on('click',function(){
            $(this).siblings('input').val('');
        })
        //
        $('.icon-eye-close').on('click',function(){
           if( see=== true){
               $(this).siblings('input').attr('type','text')
               $(this).removeClass('icon-eye-close').addClass('icon-yanjing-copy-copy-copy-copy')
               see=false;
           }
           else{
               $(this).siblings('input').attr('type','password')
               $(this).removeClass('icon-yanjing-copy-copy-copy-copy').addClass('icon-eye-close')
               see=true;
           }
        })

    },
        //登入绑定
    login:function(){

        $('.warp>a').on('click',function() {
            var Name = $('#username').val()
            var Pwd = $('#password').val()
            $.ajax(
                {url:'http://song.85nv.cn/mobile/user/login',
                    type:'post',
                    data:{'userName':Name,'password':Pwd},
                    dataType:'Json',
                    success:function(data){
                        console.log(data)
                        if(data.status==1){

                            sessionStorage.setItem('Login','1')
                            console.log(sessionStorage.getItem('Login'))
                            if(document.referrer==''||document.referrer==undefined){

                                window.location.href='./my/my.html'
                            }
                            else{
                                if(document.referrer.slice(0,23)=='http://localhost:63342/'){
                                    window.history.back();
                                }
                            }
                        }
                        else{
                            alert('密码错误或用户名不存在！')
                        }

                    },
                    error:function(data){
                    }}
            )
        })

    },
    //跳转页面register-forget
    jump:function(){
        $('.register-forget a').eq(0).on('click',function(){
            window.location.href="./password/sign-in2.html"
        })
        $('.register-forget a').eq(1).on('click',function(){
            window.location.href="./password/find1.html"
        })
    }
    }
login.blur();
login.login();
login.jump();