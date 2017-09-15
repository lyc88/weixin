var amend = {

   tapBack : function () {
       $('.icon-llmainpageback').on('click',function(){
           window.history.back();
       })
   },
   nickName : function (){
       $('section>a').on('click',function(){
           var Vlaue = $('section>input').val()
           $.ajax({
               type:'post',
               url:'http://song.85nv.cn/mobile/p/updateNickName',
               dataType:'Json',
               data:{
                   nickName:Vlaue,
               },
               success:function(data){
                   if(data.status==1){
                    window.location.href='../user_message/user.html'
                   }

               },
               error:function(data){



               }

           })
       })


   }
}
amend.tapBack()
amend.nickName ()

