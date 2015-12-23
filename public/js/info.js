 var sex = "male";
 
$('#submit').click(function(){
    var weight = $("#weight_input").val();
    var height = $("#height_input").val();
    var username = $("#open_id").val();
    if(window.confirm('您将修改信息并退出。')){    
        WeixinJSBridge.invoke('closeWindow',{},function(res){
        });
    }else{
        return false;
    }
    $.ajax({
        type:'post',
        url:"/logging",
        data:{"username":username, "sex":sex, "weight":weight, "height":height},
        dataType:"json",
        success:function(data){
            if(data){
                console.log('录入成功！');
            } else{
                 console.log("返回值为空");
            }
        }
    });
 })
 
 $('#male').click(function(){
        sex = "male";
        $('#male')[0].style.boxShadow = "inset 0 0 10px #aaaaaa";
        $('#female')[0].style.boxShadow = "";
});

$('#female').click(function(){
        sex = "female";
        $('#female')[0].style.boxShadow = "inset 0 0 10px #aaaaaa";
        $('#male')[0].style.boxShadow = "";
});