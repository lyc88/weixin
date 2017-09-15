var vm = new Vue({
    el:'.sec',
    data:function(){
        return{
           opinion:'',
           phone:''
        }
    },
    methods:{
        Put:function(){
           var _this = this
           this.$http('http://song.85nv.cn/mobile/p/submitFeedBack',{'content':_this.opinion,'mobile':_this.phone},{emulateJSON:true}).then(function(data){
               console.log(data)
           })
        }
    }
})