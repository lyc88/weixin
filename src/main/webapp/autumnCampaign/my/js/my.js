var vm = new Vue({
    el:'.sec',
    data:{
      show:false,
    },
    methods:{
        Tap:function(){
            $('.choose a').on('click',function(){
                $(this).addClass('active').siblings().removeClass('active')
            })
        },
        jump:function(){
            $('.choose a').eq(0).on('click',function(){
                window.location.href="../index.html"
            })
            $('.choose a').eq(1).on('click',function(){
                window.location.href="../classify.html"
            })
            $('.choose a').eq(2).on('click',function(){
                window.location.href="../shop_flow/shop_car.html"
            })
            $('.about').on('click',function(){
                window.location.href="my_about.html"
            })

            $('.my-collect').on('click',function(){
                window.location.href="my_collect.html"
            })

            $('.my-footer').on('click',function(){
                window.location.href="my_footer.html"
            })

            $('.my-rating').on('click',function(){
                window.location.href="my_rating.html"
            })

            $('.ticket-favorable').on('click',function(){
                window.location.href="ticket_favorable.html"
            })
        },
        tell:function(){
            if(this.show==false){
                this.show=true;
            }
            else{
                this.show=false
            }

        }
    },
    mounted(){
        this.Tap();
        this.jump()
    }
})