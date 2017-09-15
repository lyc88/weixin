var melogin = {
    //选择
    choose : function(data){
        var _this = this
        var ID
        //删除
        $('.right ').on('click','a:eq(1)', function () {
            ID = $(this).parent().parent().find('em').attr('data-id')
           $('.sure0r').css('display','block')
           $('.sure0r .black').animate({opacity:"0.7"},300)
           $('.sure0r .sure').animate({opacity:"1"},500)

       })
        //编辑
        $('.right ').on('click','a:eq(0)', function () {
           window.location.href='address_amend.html'
            localStorage.setItem('id_add',''+$(this).parent().parent().find('em').attr('data-id')+'')
            var Index =$(this).parent().parent().parent().index()
            localStorage.setItem('Bname',''+data.addressList[Index].receiver+'')
            localStorage.setItem('Bicon',''+data.addressList[Index].aliasAddr+'')
            localStorage.setItem('Baddress',''+data.addressList[Index].subAdds+'')
            localStorage.setItem('Barea',''+data.addressList[Index].province+data.addressList[Index].city+data.addressList[Index].area+'')
            localStorage.setItem('Bphone',''+data.addressList[Index].mobile+'')
            localStorage.setItem('Bcode',''+data.addressList[Index].subPost+'')
            localStorage.setItem('BprovinceId',''+data.addressList[Index].provinceId+'')
            localStorage.setItem('BcityId',''+data.addressList[Index].cityId+'')
            localStorage.setItem('BareaId',''+data.addressList[Index].areaId+'')
            localStorage.setItem('Bprovince',''+data.addressList[Index].province+'')
            localStorage.setItem('Bcity',''+data.addressList[Index].city+'')
            localStorage.setItem('Barea',''+data.addressList[Index].area+'')
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

            //删除地址
            $.ajax({
                'url':'http://song.85nv.cn/mobile/p/address/del',
                dataType:'Json',
                type:'post',
                data:{addrId:ID},
                success:function(data){
                    console.log(data)
                }
            })
        })


    },
    //数据渲染
    data:function(){
        var _this = this;
        //渲染数据   同步更改默认地址
        $.ajax({
            'url':'http://song.85nv.cn/mobile/p/getAddressList',
            dataType:'Json',
            type:'post',
            data:{curPageNo:'1'},
            success: function (data) {
                var D = data.data;
              console.log(data)
                function address(){
                    //默认地址 1 add
                    var add = '设置地址';
                    var Address_one = document.createElement('div')
                    var Top = document.createElement('div')
                    var Top_span = document.createElement('span')
                    var Top_i = document.createElement('i')
                    var Phone = document.createElement('div')

                    var P = document.createElement('p')

                    var Botoom = document.createElement('div')
                    var Left = document.createElement('div')
                    var Left_em = document.createElement('em')
                    var Left_i = document.createElement('i')
                    var Left_span = document.createElement('span')

                    var Right = document.createElement('div')
                    var Right_a1 = document.createElement('a')
                    var Right_i1 = document.createElement('i')
                    var Right_a2 = document.createElement('a')
                    var Right_i2 = document.createElement('i')
                    this.allAddress=function(){

                        $('section').append(Address_one)
                        Address_one.setAttribute('class','address-one')
                        Address_one.append(Top)
                        Top.setAttribute('class','top')
                        Phone.setAttribute('class','phone')
                        Top.append(Top_span)
                        Top_span.innerHTML=''+D.addressList[i].receiver+''
                        if( D.addressList[i].aliasAddr!=null&&D.addressList[i].aliasAddr!=undefined){
                            Top.append(Top_i)
                            Top_i.innerHTML=''+D.addressList[i].aliasAddr+''
                        }
                        if( D.addressList[i].mobile!=null&&D.addressList[i].mobile!=undefined){
                            Top.append(Phone)
                            Phone.innerHTML=''+D.addressList[i].mobile+''
                        }
                        Address_one.append(P)
                        P.innerHTML=''+D.addressList[i].province+D.addressList[i].city+D.addressList[i].area+D.addressList[i].subAdds+''
                        Address_one.append(Botoom)
                        Botoom.append(Left)
                        Botoom.setAttribute('class','bottom')
                        Left.setAttribute('class','left')
                        Left.append(Left_em)
                        Left.append(Left_span)
                        Left_em.append(Left_i)
                        Left_em.setAttribute('data-id',''+D.addressList[i].addrId+'')
                        Left_i.setAttribute('class','iconfont icon-gou1')
                        if( D.addressList[i].commonAddr==1){
                            add='默认地址';
                            Left_em.setAttribute('class','border')
                        }
                        else{
                            add='设置地址';
                        }
                        Left_span.innerHTML=''+add+''
                        Left_span.setAttribute('data-iddd',''+D.addressList[i].commonAddr+'')
                        Botoom.append(Right)
                        Right.setAttribute('class','right')
                        Right.append(Right_a1)
                        Right.append(Right_a2)
                        Right_a1.innerHTML='编辑'
                        Right_a2.innerHTML='删除'
                        Right_a1.prepend(Right_i1)
                        Right_i1.setAttribute('class','iconfont icon-bianji')
                        Right_a2.prepend(Right_i2)
                        Right_i2.setAttribute('class','iconfont icon-lajitong')
                        Right_a2.setAttribute('href','javascript:void(0)')
                        Right_a1.setAttribute('href','javascript:void(0)')
                    }
                }
                //渲染内容
                for(var i = 0;i<D.addressList.length;i++){
                    var  Newaddress = new address()
                    Newaddress.allAddress()
                }

                $('.left').on('click','em',function(){
                    //选择有border 为单前选中值
                    var Id = $(this).attr('data-id')
                    $(this).addClass('border').parent().parent().parent().siblings().find('em').removeClass('border')
                    $.ajax({
                        'url':'http://song.85nv.cn/mobile/p/address/setDefault',
                        dataType:'Json',
                        type:'post',
                        data:{addrId:Id,type:0},
                        success:function(data){
                            console.log(data)
                            //点击时立刻渲染
                            if(data.status){
                                $.ajax({
                                    'url':'http://song.85nv.cn/mobile/p/getAddressList',
                                    dataType:'Json',
                                    type:'post',
                                    data:{curPageNo:'1',type:null,},
                                    success:function(data){
                                        var D = data.data;
                                        for(var i = 0;i<D.addressList.length;i++){
                                            var add = '设置地址';
                                            D.addressList[i].commonAddr==1?add='默认地址':add='设置地址'
                                            $('.bottom').eq(i).find('span').html(add)
                                        }
                                    }
                                })
                            }
                        }
                    })

                })
                //点击选择
                _this.choose(D)
            }
        })
    },
    //跳转页面 存储id
    jump:function(){
        $('body>a').click(function(){
            window.location.href='../address/address_new.html'
        })
        $('header>i').click(function(){
            window.history.back()
        })
    }
}

melogin.data();
melogin.jump();
