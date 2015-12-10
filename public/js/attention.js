function send_meg(){
    var data = {"sender":"oFfkHw1qWGUTrZVn1WYOWEafkXXU","receiver":"oFfkHw1qWGUTrZVn1WYOWEafkXXU"};
    $.ajax({
        type:'post',
        url:"/attention",
        data:data,
        dataType:"json",
        success:function(data){
            if(data){
                alert(data.agree);
            } else{
                 alert("返回值为空");
            }
        }
    });
}