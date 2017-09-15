var Tool = {
       beforeSend:function(i){
           var images;
           i?images='./images/interactive_ic_ring1.png':images='../images/interactive_ic_ring1.png'
           var Html = '<div class="loading-warp">'+
           '<div class="loading">'+'<img src='+images+'>'+'</div>'+
           '</div>';

           $('body').append(Html)
    },
      deleteLoading:function(){
          $('.loading-warp').remove()
      },
      Vue_beforeSend:function(){
          Vue.http.interceptors.push(function(request, next) {
             function next(res){

              }
          })
      }
}