 var sex = "male";

 window.onload = function () {
    var thisURL = document.URL; 
    var getval =thisURL.split('?')[1];
    var openid = getval.split("=")[1];
    $("#open_id").val(openid);
    var checksex;
    $.ajax({
        type:'post',
        url:"/info",
        data:{"openid":openid},
        dataType:"json",
        success:function(data){
            if(data){
                checksex = data.sex;
                $("#weight_input").val(data.weight);
                $("#height_input").val(data.height);
                if(checksex == "male"){
                    $('#male')[0].style.boxShadow = "inset 0 0 10px #aaaaaa";
                    $('#female')[0].style.boxShadow = "";
                }
                else{
                    $('#female')[0].style.boxShadow = "inset 0 0 10px #aaaaaa";
                    $('#male')[0].style.boxShadow = "";
                }
            } else{
                alert("返回值为空");
            }
        }
    });
    var window_height = document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight ;
    var image_height = $("#choose_sex").height();
    $("#male").css("height", image_height);
    $("#female").css("height", image_height);
    $("#weight").css("top", window_height * 0.25 + image_height);
    $("#height").css("top", window_height * 0.25 + image_height + (window_height *0.7 - image_height)/4);
    $("#submit").css("top", window_height * 0.25 + image_height + (window_height *0.7 - image_height)/4 * 3);
};

 
$('#submit').click(function(){
    var weight = $("#weight_input").val();
    var height = $("#height_input").val();
    var username = $("#open_id").val();
    //alert(sex);
    //alert(username);
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
                alert(data);
            } else{
                alert("返回值为空");
            }
        }
    });
 })
 
$('#male').click(function(){
        sex = "male";
        //alert("male");
        $('#male')[0].style.boxShadow = "inset 0 0 10px #aaaaaa";
        $('#female')[0].style.boxShadow = "";
});

$('#female').click(function(){
        sex = "female";
        //alert("female");
        $('#female')[0].style.boxShadow = "inset 0 0 10px #aaaaaa";
        $('#male')[0].style.boxShadow = "";
});