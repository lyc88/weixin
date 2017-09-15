var vm = new Vue({
    el:'.sec',
    data:function(){
        return{
           show:false,
           show2:true,
           show_nav:true,
           redact:'编辑',
           del_is:[],
           nav_on:2,
           shop:[
               {
                   shop_name:'歪果家旗舰店',
                   shop_title:'[歪果家]韩版学院风大码宽松女夹克棒球服外套',
                   shop_money:'66.50'
               },
               {
                   shop_name:'歪果家旗舰店2',
                   shop_title:'[歪果家]韩版学院风大码宽松女夹克棒球服外套2',
                   shop_money:'66.20'
               },
               {
                   shop_name:'歪果家旗舰店3',
                   shop_title:'[歪果家]韩版学院风大码宽松女夹克棒球服外套3',
                   shop_money:'66.20'
               }
           ],
           store:[
               {
                   store_name:'歪果家旗舰店',
                   shop_num:'237',
                   collect:'2349'
               },
               {
                   store_name:'歪果家旗舰店',
                   shop_num:'237',
                   collect:'2349'
               },
               {
                   store_name:'歪果家旗舰店',
                   shop_num:'237',
                   collect:'2349'
               }
           ]
        }
    },
    methods:{
        del_choose:function(){
            if(this.show_nav==true){
                if(this.show==true){
                    this.show=false;
                    this.redact='编辑';
                }
                else{
                    this.show=true;
                    this.redact='完成';
                }
            }
            else{
                if(this.show2==true){
                    this.show2=false;
                    this.redact='编辑';
                }
                else{
                    this.show2=true;
                    this.redact='完成';
                }
            }
        },
        selected_check:function(item){
           if(typeof item.check == 'undefined'){
               console.log(item)
                this.$set(item,'check',true)
           }
            else{
               item.check = !item.check;
           }
        },
        del_on:function(){
            for(var i = 0;i<this.shop.length;i++){
                var value = this.shop[i]
                if(value.check==true){
                    this.shop.splice(i,1)
                    i=i-1
                }
            }
        },
        del_store:function(){
            for(var i = 0;i<this.store.length;i++){
                var value = this.store[i]
                if(value.check==true){
                    this.store.splice(i,1)
                    i=i-1
                }
            }
        },
        choose_nac:function(i){
            this.nav_on=i;
            if(i==1){
                this.show_nav=true;
                this.redact='编辑';
                this.show2=false;
            }
            else{
                this.show_nav=false;
                this.redact='编辑';
                this.show=false;
            }

        }
    }
})

