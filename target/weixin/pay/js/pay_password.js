var vm = new Vue({
    el:'.sec',
    data:function(){
        return{
            is:false,
        }
    },
    methods:{
        len:function (){
            this.$refs.pwd.setAttribute("maxlength",6);
        },
        sure: function () {
            if(this.$refs.pwd.value.length===6){
               this.is=true
            }
            else{
                this.is=false
            }
        }
    },
    mounted(){
      this.len();
    }
})