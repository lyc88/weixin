var vm = new Vue({
    el:'.sec',
    data:function(){
        return{
            allAddress:[
                '广东省深圳南山深南大道大冲商务中心D座1308',
                '广东省深圳南山深南大道科技园'
            ],
            userAddress:[]

        }
    },
    methods: {
        alldata:function(){
            var _this = this
            this.$http.post('http://song.85nv.cn/mobile/p/getAddressList',{emulateJSON:true}).then(function(res){
                  var D = res.data.data;
                console.log(D)
                  _this.userAddress = D.addressList;
                  console.log(_this.userAddress)

            })
        },
        choose: function () {
            var _this = this
            $('.sec ').on('click','em', function () {
                var Index = $(this).parent().parent().index()
                if( !$(this).hasClass('none')){
                    var addrId = _this.userAddress[Index].addrId
                    _this.$http.post('http://song.85nv.cn/mobile/p/address/setDefault',{addrId:addrId,type:0},{emulateJSON:true}).then(function(res){
                    })
                    $(this).parent().parent().find('.bottom p').before('<span>'+'[默认地址]'+'</span>').parent().parent().parent().siblings().find('.bottom span').remove('span')
                }
                else{

                }
                $(this).addClass('none').parent().parent().siblings().find('em').removeClass('none')
            })
            $('header>em').click(function(){
                window.location.href='./address_melogin.html'
            })
        },
        back:function(){
            window.history.back()
        },

    },
    mounted(){
        this.choose()
        this.alldata()
    }
})

