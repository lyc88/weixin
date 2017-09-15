var Tool = {
    //loading 开始加载
    beforeSend:function(i){
           var images;
           i?images='./images/interactive_ic_ring1.png':images='../images/interactive_ic_ring1.png'
           var Html = '<div class="loading-warp">'+
           '<div class="loading">'+'<img src='+images+'>'+'</div>'+
           '</div>';

           $('body').append(Html)
    },
    //结束加载
    deleteLoading:function(){
    $('.loading-warp').remove()
},
    //加载更多 v存在为外部页面，不存在为内部页面即文件夹内html
    loadingMore:function(i,v){

        if(typeof i=='object'){
            var images;
            v?images='./images/interactive_ic_ring1.png':images='../images/interactive_ic_ring1.png'
            var Html =
                '<div class="load">'+
                '<div class="loadingMore">'+'<img src='+images+'>'+'</div>'+
                '</div>'+'</div>';
            i.append(Html)
        }
        else{
            $('.load').remove()
        }
    },
    //小提示框 操作成功  str提示字段文字 del是否删除 1添加 -1 删除
    handle:function(str,del){
        if(del==1){
            var Html = '<div class="app">'+str+'</div>'
            $('body').append(Html)

        }
        else if(del==-1){
            $('.app').remove()
        }
    },
    //排序Mate.sort(compare('norms'))          //排序
    compare:function (prop) {
        return function (obj1, obj2) {
            var val1 = obj1[prop];
            var val2 = obj2[prop];
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1);
                val2 = Number(val2);
            }
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        }
    }
}


