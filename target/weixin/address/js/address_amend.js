
var vm = new Vue({
            el: '#container',
            data:{
                    sureBtn:'确认',
                    isresult:null,
                    isActive : false,
                    isInput:false,
                    isBottom:false,
                    UnActive : true,
                    user:'收货人:',
                    userPhone:'手机号码:',
                    userAddress:'所在地区:',
                    userDetaileAddress:'详细地址:',
                    userCode:'邮政编码:',
                    userLabel:'标签:',

                    username:'',
                    userphone:'',
                    useraddress:'',
                    userarea:'',
                    usercode:'',
                    userpost:'',
                    usericon:'',
                    addLabel:[
                       '家',
                       '公司',
                       '学校'
                    ],
                    on:-1,
                    show:false,
                    province:[],
                    city:[],
                    area:[],
                    addnum:[],
                    addnumId:[],
                    Move:false,
                    ONleft:0,
                    Red:-1,
                    Red1:-1,
                    Red2:-1
            },
            methods: {
                //长度限制
                len:function(){
                    this.$refs.message.setAttribute("maxlength",2);
                },
                back:function(){
                    window.history.back()
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
                data_change:function(){
                    this.username = localStorage.getItem('Bname')
                    this.usericon = localStorage.getItem('Bicon')
                    this.userphone = localStorage.getItem('Bphone')
                    this.useraddress = localStorage.getItem('Baddress')
                    this.userarea = localStorage.getItem('Barea')
                    this.usercode = localStorage.getItem('Bcode')


                },
                choose:function(items,index){
                   this.on =index;
                   this.usericon=items;
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

                    var add_string =  this.addnum.join('')
                    add_string.replace(/,/g,'');
                    this.userarea=add_string
                    setTimeout(function(){
                        var len =   $('.sendTo>h5>em').eq(0).outerWidth(true)+$('.sendTo>h5>em').eq(1).outerWidth(true)+$('.sendTo>h5>em').eq(2).outerWidth(true);
                        $('.choose-red').css({
                            'transform': 'translate3d( '+len+'px ,0 , 0)',
                            'transition':' 300ms'
                        })
                    },100)
                    this.Red2 = index
                    this.show=! this.show
                },
                Save:function(){
                    var _this = this
                    var Id =  localStorage.getItem('id_add')
                    this.$http.post('http://song.85nv.cn/mobile/p/address/save',{
                        addrId: Id,
                        receiver:_this.username,//名字
                        mobile:_this.userphone,//手机
                        provinceId:_this.addnumId[0],//省ID
                        province:_this.addnum[0],//省
                        cityId:_this.addnumId[1],//城市ID
                        city:_this.addnum[1],//城市
                        areaId:_this.addnumId[2],//地点ID
                        area:_this.addnum[2],//地点
                        email:'',
                        subAdds:_this.useraddress,//详细地址
                        subPost:_this.usercode,//邮政编码
                        aliasAddr:_this.usericon//别名
                    },{emulateJSON:true}).then(function(res){
                        if(res.data.status){
                            window.location.href='./address_melogin.html'
                        }
                    })
                }
            },
            mounted:function(){
                this.len()
                this.data_change()
            }

        })


var swiper2= new Swiper('.reach_on ',{
    initialSlide :0,
    observer:true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents:true,//修改swiper的父元素时，自动初始化swiper
});

