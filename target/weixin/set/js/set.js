var set = new Vue({
    el:'.sec',
    data: function () {
        return{

        }
    },
    methods:{
        choose:function (){

            $('.other .clear').on('click', function () {
                $('.sure0r').css('display','block')
                $('.sure0r .black').animate({opacity:"0.7"},300)
                $('.sure0r .sure').animate({opacity:"1"},500)
            })
            $('.sure>div a:eq(0)').on('click',function(){
                $('.sure0r .black').animate({opacity:"0"},300)
                $('.sure0r .sure').animate({opacity:"0"},500,function(){
                    $('.sure0r').css('display','none')
                })
            })
            $('.sure>div a:eq(1)').on('click',function(){
                $('.sure0r .black').animate({opacity:"0"},300)
                $('.sure0r .sure').animate({opacity:"0"},500,function(){
                    $('.sure0r').css('display','none')
                })
            })

        },
        login_out:function(){
            $('.sec .quit>a').on('click',function(){
                $.ajax(
                    {url:'http://song.85nv.cn/mobile/user/logout',
                        type:'post',
                        dataType:'Json',
                        success:function(data){
                            if(data.status==1){
                                window.location.href='login.html'
                            }
                            else{
                                alert('111')
                            }

                        },
                        error:function(data){
                        }}
                )
            })
        },
        bind_phone:function(){
            window.location.href='authentication.html'
        },
        user:function(){
            window.location.href='user.html'
        },
        opinion:function(){
            window.location.href='opinion.html'
        },
        social:function(){
            window.location.href='Social_binding.html'
        },
        melogin:function(){
            window.location.href='address_melogin.html'
        }


    },
    mounted(){
        this.choose()
        this.login_out()
    }
})
