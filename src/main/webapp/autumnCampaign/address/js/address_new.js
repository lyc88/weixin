var vm = new Vue({
    el:'.sec',
    data:{
        sureBtn:'确认',
        isresult:null,
        isActive : false,
        isInput:false,
        isBottom:false,
        username:'',
        userphone:'',
        useraddress:'',
        userstreet:'',
        usercode:'',
        usericon:'家',
        addLabel:[
            '家',
            '公司',
            '学校'
        ],
        label:'',
        on:0,

        show:false,
        province:[],
        city:[],
        area:[],
        addnum:[],
        addnumId:[],
        saveaddnum:[],
        saveaddid:[],
        Move:false,
        ONleft:0,
        Red:-1,
        Red1:-1,
        Red2:-1
    },
    methods:{
        //Save:function(){
        //   var name = this.username
        //   var phone = this.userphone
        //   var address = this.useraddress
        //   var street = this.userstreet
        //   var code = this.usercode
        //   var aliasAddr = this.icon[this.on]
        //    this.$http.post('http://song.85nv.cn/mobile/p/address/save',
        //        {'receiver':name,'mobile':phone,'area':address,'subAdds':street,'subPost':code,'aliasAddr':aliasAddr},
        //        {emulateJSON:true}).then(function(res){
        //        alert('1')
        //        console.log(res)
        //    })
        //},
        Save:function(){
            var _this = this
            console.log(_this.username,_this.userphone,_this.userstreet,_this.usercode,this.usericon)
            console.log(_this.addnumId[0],_this.addnumId[1],_this.addnumId[2])
            console.log(_this.addnum[0],_this.addnum[1],_this.addnum[2])
            this.$http.post('http://song.85nv.cn/mobile/p/address/save',{
                receiver:_this.username,//名字
                mobile:_this.userphone,//手机
                provinceId:_this.addnumId[0],//省ID
                province:_this.addnum[0],//省
                cityId:_this.addnumId[1],//城市ID
                city:_this.addnum[1],//城市
                areaId:_this.addnumId[2],//地点ID
                area:_this.addnum[2],//地点
                email:'',
                subAdds:_this.userstreet,//详细地址
                subPost:_this.usercode,//邮政编码
                aliasAddr:_this.usericon,//别名
                commonAddr:0,
            },{emulateJSON:true}).then(function(res){
                if(res.data.status){
                    window.location.href='./address_melogin.html'
                }
            })
        },
        //显示
        Add:function () {
            this.isActive = true;
            this.isInput = true;
            this.isBottom = true;
        },
        //确定添加
        sure:function(){
            this.isresult = this.$refs.message.value
            if(this.sureBtn=='确认'){
                if(this.addLabel.length<4)
                {
                    if(this.isresult.length!=0){
                        this.addLabel.push(
                            this.isresult
                        )
                        this.isBottom = true;
                        this.sureBtn='编辑'
                    }
                    else{
                        this.isActive = false;
                        this.isBottom = false;
                    }
                }
                else if (this.addLabel.length==4){
                    this.addLabel[3]=this.isresult
                    this.isActive = true;
                }
                this.isInput = false;
            }
            else if (this.sureBtn=='编辑'){
                this.sureBtn='确认'
                this.isInput = true;
                this.addLabel.splice(3,1)
            }

        },
        choose:function(items,index){
            this.on =index;
            this.usericon=items;

        },
        back:function(){
            window.history.back()
        },
        Area:function(){
            var _this = this;
            this.show=! this.show
            this.$http.post('http://song.85nv.cn/mobile/common/getProvince',{emulateJSON:true}).then(function(res){
                var D = res.data.data.provinces
                _this.province = D
                console.log(D)
            })

        },
        Area_two: function (i,index) {
            var _this = this;
            var  provinceid =  i.key
            this.$http.post('http://song.85nv.cn/mobile/common/getCityList',{ provinceid: provinceid },{emulateJSON:true}).then(function(res){
                var D = res.data.data.citys
                _this.city = D
            })
            var W = $('.swiper-wrapper').width();
            $('.reach_on>.swiper-wrapper').css({
                'transform': 'translate3d( '+ - W+'px,0 , 0)',
                'transition':' 300ms'
            })
            if( this.addnum.length==0){
                this.addnum.push(i.value)
                this.addnumId.push(i.key)
            }
            else if(this.addnum.length==1){
                this.addnum.splice(0,1,i.value);
                this.addnumId.splice(0,1,i.key);
            }
            setTimeout(function(){
                var len =   $('.sendTo>h5>em').eq(0).outerWidth(true);
                $('.choose-red').css({
                    'transform': 'translate3d( '+len+'px ,0 , 0)',
                    'transition':' 300ms'
                })
            },100)
            this.Red = index
        },
        Area_three:function(i,index){
            var _this = this;
            var  city =  i.key
            this.$http.post('http://song.85nv.cn/mobile/common/getAreaList',{ cityid:city  },{emulateJSON:true}).then(function(res){
                var D = res.data.data.areas
                _this.area = D
            })
            var W = $('.swiper-wrapper').width();
            $('.reach_on>.swiper-wrapper').css({
                'transform': 'translate3d( '+ - 2*W+'px,0 , 0)',
                'transition':' 300ms'
            })
            if( this.addnum.length==1){
                this.addnum.push(i.value)
                this.addnumId.push(i.key)
            }
            else if(this.addnum.length==2){
                this.addnum.splice(1,1,i.value);
                this.addnumId.splice(1,1,i.key);
            }
            setTimeout(function(){
                var len =   $('.sendTo>h5>em').eq(0).outerWidth(true)+$('.sendTo>h5>em').eq(1).outerWidth(true);
                $('.choose-red').css({
                    'transform': 'translate3d( '+len+'px ,0 , 0)',
                    'transition':' 300ms'
                })
            },100)
            this.Red1 = index
        },
        Area_four:function(i,index){
            if( this.addnum.length==2){
                this.addnum.push(i.value)
                this.addnumId.push(i.key)
            }
            else if(this.addnum.length==3){
                this.addnum.splice(2,1,i.value);
                this.addnumId.splice(2,1,i.key);
            }
            this.saveaddnum =  this.addnum;
            this.saveaddid = this.addnumId;

            var add_string =  this.addnum.join('')
            add_string.replace(/,/g,'');
            this.useraddress=add_string

            this.addnum = [];
            this.addnumid = [];
            setTimeout(function(){
                var len =   $('.sendTo>h5>em').eq(0).outerWidth(true)+$('.sendTo>h5>em').eq(1).outerWidth(true)+$('.sendTo>h5>em').eq(2).outerWidth(true);
                $('.choose-red').css({
                    'transform': 'translate3d( '+len+'px ,0 , 0)',
                    'transition':' 300ms'
                })
            },100)
            this.Red2 = index
            this.show=! this.show

            $('.reach_on>.swiper-wrapper').css({
                'transform': 'translate3d( 0 ,0 , 0)',
                'transition':' 300ms'
            })
        },

    }
})
