var vm = new Vue({
    el:'.sec',
    data:function(){
        return{
            describe:'',
            able:[],
            IS:true,
            inputdata:'0',
            photos:[],
            star:[]
        }
    },
    methods:{
        Photo: function () {

       },
        Evaluate:function(index) {
            if(index){

            }


        },
        Move_model:function(){
            var len =1;
            for(var i = 0; i<len;i++){
                var item = {value1: ''};
                this.able.push(item);
            }
            for(var j=0;j<len;j++){
                var is = {pho:''}
                this.photos.push(is)
            }

        }

    },
    mounted(){
        this.Move_model();

    },
    created:function(){
        /*this.Evaluate();*/
        this.Photo();
    },

})