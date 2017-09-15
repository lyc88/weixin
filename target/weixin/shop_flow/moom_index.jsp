<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="black" name="apple-mobile-web-app-status-bar-style">
    <meta content="telephone=no" name="format-detection">
    <meta content="email=no" name="format-detection">
    <link rel="stylesheet" href="../css/style/Common-moble.css">
    <link rel="stylesheet" type="text/css" href="../css/style/iconfont.css">
    <link rel="stylesheet" href="../css/moom_index.css">
    <script src="../js/src/flexible.js"></script>
    <script src="../js/src/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="https://cdn.webfont.youziku.com/wwwroot/js/wf/youziku.api.min.js"></script>
    <title>店铺首页</title>
</head>
<body>
    <header>
        <input type="text" name="openId" value="${openid}" id="login">
        <i class="iconfont icon-llmainpageback"></i>
        <span>店铺首页</span>
        <i class="iconfont icon-gengduo"></i>
        <div class="opa">
            <div class="wicket">
                <a href="./search.html"><img src="../images/more_ic_home.png" alt="">泰润月饼</a>
                <a href="./shop_car.html"><img src="../images/more_ic_shoppingcart.png" alt="">购物车</a>
                <a href="../dist/myInfo.html"><img src="../images/more_ic_me.png" alt="">我的</a>
            </div>
        </div>

    </header>
    <div class="user_message">
        <img src="../images/head.png" alt="">
        <h1>黄敏丽</h1>
    </div>
    <section>
        <div class="shop">
            <img src="../images/touxiang.png" alt="">
            <div class="mes">
                <h4>{{item.shop_name}}</h4>
                <div class="money">
                    <span>￥{{item.shop_money}}</span>
                    <img src="../images/collection_btnic_shoppingcart_nol.png" alt="" v-if="!show">
                </div>
            </div>
        </div>
        <div class="shop">
            <img src="../images/touxiang.png" alt="">
            <div class="mes">
                <h4>{{item.shop_name}}</h4>
                <div class="money">
                    <span>￥{{item.shop_money}}</span>
                    <img src="../images/collection_btnic_shoppingcart_nol.png" alt="" v-if="!show">
                </div>
            </div>
        </div>
        <div class="shop">
            <img src="../images/touxiang.png" alt="">
            <div class="mes">
                <h4>{{item.shop_name}}</h4>
                <div class="money">
                    <span>￥{{item.shop_money}}</span>
                    <img src="../images/collection_btnic_shoppingcart_nol.png" alt="" v-if="!show">
                </div>
            </div>
        </div>
        <div class="shop">
            <img src="../images/touxiang.png" alt="">
            <div class="mes">
                <h4>{{item.shop_name}}</h4>
                <div class="money">
                    <span>￥{{item.shop_money}}</span>
                    <img src="../images/collection_btnic_shoppingcart_nol.png" alt="" v-if="!show">
                </div>
            </div>
        </div>
    </section>

    <script type="text/javascript">
        $youziku.load("body", "fd898c6b80054000ae83272ec467e83d", "HiraginoGBW3");
        /*$youziku.load("#id1,.class1,h1", "fd898c6b80054000ae83272ec467e83d", "HiraginoGBW3");*/
        /*．．．*/
        $youziku.draw();
    </script>
    <script src="./js/moom_index.js"></script>
    <script>
        $(function () {
            $.ajax({
                url:'http://song.85nv.cn/mobile/user/app/login',
                type:'post',
                dataType:'Json',
                data:{
                    openId:$('#login').val(),
                    type:'weixin'
                },
                success:function (res) {
                    console.log(res)
                }
            })
        })
    </script>
</body>
</html>