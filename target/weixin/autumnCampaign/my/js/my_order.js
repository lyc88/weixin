var vm =new Vue({
    el:'.sec',
    data:function(){
        return{
            nav_title:['全部订单','待支付','待发货','待收货','待评价'],
            on:'全部订单',
            shop_mes:[
                {
                title:'苹果笔记本MacBook12电脑包Mac内胆13保护Air皮套13.3Pro15寸',
                money:'46.50',
                num:'1',
                },
                {
                    title:'苹果笔记本MacBook12电脑包Mac内胆13保护Air皮套13.3Pro15寸',
                    money:'46.50',
                    num:'1',
                },
            ],
            total_pires:''
        }
    },
    methods: {
        //NAV
        choose: function (i) {
            var _self = i;
            this.on = _self;
        },
        money_all:function(){
          /*  alert(this.shop_mes[index].money)*/
        }
    },
    mounted(){
        this.money_all()
    }

})