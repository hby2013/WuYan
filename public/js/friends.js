//需要传递的初始参数
var userid = window.userid;  //存储openid
var page_id = 0; //存储当前页面
//var ip = #{ip};

//其他参数，不用管
list = [{icon:"icon1.jpg", userid:"123", nickname:"夏英达",steps:1234},
        {icon:"icon2.jpg", userid:"456", nickname:"范冰冰",steps:4567}];

search_result = list;
has_bind_button = false;

var current_click_id = 0;

$(window).load(function(){
    $("nav li").css("color", "#8D8383");
    $(".selected").css("color", "#fff");
    $("nav li").click(switch_page);
    if(page_id == 0){
        request_friend_list();
    } else if(page_id == 1) {
        request_special_friend
    }
    //request_friend_list();
});

function switch_page(){
    $("nav li").css("color", "#8D8383");
    $("nav li").attr("class", "");
    $(this).attr("class","selected");
    $(this).css("color", "#fff");
    if($(this).attr("id")=="tag0"){
        if(page_id!=0){
            $(".friend-list").empty();
            $("#search").css("display","none");
            $("#special-friend").empty();
            page_id=0;
            switch_to_page0();
        }
    } else if($(this).attr("id")=="tag1"){
        if(page_id!=1){
            page_id=1;
            switch_to_page1();
        }
    } else if($(this).attr("id")=="tag2"){
        if(page_id!=2){
            $(".friend-list").empty();
            $("#special-friend").empty();
            $("#search").css("display","none");
            page_id=2;
            switch_to_page2();
        }
    } else if($(this).attr("id")=="tag3"){
        if(page_id!=3){
            switch_to_page3();
            page_id=3;
        }
    }
}

function switch_to_page0(){
    request_friend_list();
    //show_friend_list(list);
}

function switch_to_page1(){
    $("#search").css("display","none");
    $("#friend-list").css("display","none");
    $("#special-friend").empty();
    request_special_friend();
    //show_special_friend(special_friend);
}

function switch_to_page2(){
    $("#search").css("display","block");
    if(!has_bind_button){
        $("#search-button").click(click_search_button);
        has_bind_button = true;
    }
}

function request_special_friend(){
    $("#special-friend").css("display","block");
    $.ajax({
        type:'post',
        url:"/attention/special_friend_list/",
        data:{userid:userid},
        dataType:"json",
        success:function(data){
            if(data){
                alert(data.basic_list[0].nickname);
                alert(data.day_data_list[0].steps);
                convert_data(data.basic_list,data.day_data_list);
            } else{
                alert("返回值为空");
            }
        }
    });
}

function convert_data(basic_list, day_data_list){
    var friend = [];
    for(var i=0;i<day_data_list.length;i++){
        var special_friend = new Object();
        special_friend.icon = basic_list[i].icon;
        special_friend.userid = basic_list[i].userid;
        special_friend.name = basic_list[i].nickname;
        special_friend.steps_week = [i,i,i,i,i,i,i];
        special_friend.steps_today = day_data_list[i].steps;
        special_friend.sleep_yesterday = day_data_list[i].sleep_time;
        friend[i] = special_friend;
    }
    show_special_friend(friend);
}

function show_special_friend(friend){
    var info_card = $("<section id='special-friend-info'><p id='special-friend-name'>"+friend.name+"</p><p id='special-friend-id'>账号："+friend.userid+"</p><img id='special-friend-icon' src='"+friend.icon+"'></section>");
    $("#special-friend").append(info_card);
    $("#special-friend-info").css({
        "display": "-moz-box",
        "display": "-webkit-box",
        "display": "box",
        "margin":"0 10px",
        "padding":"15px 0 10px",
        "border-bottom": "1px solid #f0f0f0",
        "font-size": "18px",
        "text-align":"justify",
        "word-break": "break-all",
        "background-color":"white"
    });
    $("#special-friend-name").css({
        "position":"relative",
        "left":"35%",
        "top":"20%",
        "color":"violet"
    });
    $("#special-friend-id").css({
        "position":"relative",
        "top":"60%",
        "left":"35%"
    });
    $("#special-friend-icon").css({
        "width": "100px",
        "height": "100px",
        "margin-left": "15px",
        "overflow": "hidden",
        "position":"absolute"
        //"top": $("#special-friend-info").offset().top + 20 + "px"
    });

    var sports_info = $("<div id='sports-info'><div id='chart_title'></div><canvas id='myChart'></canvas></div>");
    $("#special-friend").append(sports_info);
    $("#sports-info").css({
        "display": "-moz-box",
        "display": "-webkit-box",
        "display": "box",
        "margin":"10px 10px",
        "padding":"15px 0 10px",
        "border-bottom": "1px solid #f0f0f0",
        "font-size": "18px",
        "text-align":"justify",
        "word-break": "break-all",
        "background-color":"white"
    });
    show_chart(friend.steps_week);

    var sports_text = $("<div id='sports-text'><h1>一周运动情况</h1><p>Ta一共走了53467步</p><p>快去和她一起约吧！</p></div>");
    $("#sports-info").append(sports_text);
    $("#sports-text").css({
        "position":"absolute",
        "left":"50%"
        //"top":$("#sports-info").offset().top + 20 + "px"
    });
}

function show_chart(steps_week){
    var data = {
            labels : ["1","2","3","4","5","6","7"],
            datasets : [
            {
                lineItemName : "test1",
                fillColor : "rgba(220,220,220,0.5)",
                strokeColor : "rgba(200,200,200,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff",
                data : steps_week
            }
            ]
    };
    $("#myChart").css({
        "width":"80% !important"
    });
    $("chart_title").css({
        "color":"black",
        "width":"90%"
    });
    var window_height = document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight ;
    var window_width = document.all ? document.getElementsByTagName("html")[0].offsetWidth : window.innerWidth ;
    var width = window_height/50;
    var chart_width = $("#myChart").width();
    $("#myChart")[0].height = chart_width;
    var chart_top= (window_height * 0.2 + (window_height * 0.8 - chart_width)/2);
    $("#myChart").css("top", chart_top);
    $("#chart_title").css("top", chart_top - 40);
    var chartLine = null;          
    var ctx = document.getElementById("myChart").getContext("2d");
    chartLine = new Chart(ctx).Line(data);
    //initEvent(chartLine, clickCall);
    
}

function request_friend_list(){
    var data = {"userid":userid};
    $.ajax({
        type:'post',
        url:"/attention/friend_list/",
        data:data,
        dataType:"json",
        success:function(data){
            if(data){
                show_friend_list(data);
            } else{
                alert("返回值为空");
            }
        }
    });
}


function click_search_button(){
    $(".user-list").empty();
    var request_name = $("input").val();
    request_search_result(request_name);
    //show_search_result(search_result);
}

function request_search_result(info){
    var data = {"userid":info};
    $.ajax({
        type:'post',
        url:"/attention/search/",
        data:data,
        dataType:"json",
        success:function(data){
            if(data){
                show_search_result(data);
            } else{
                alert("返回值为空");
            }
        }
    });
    /*$.post(url, {receiver:info, userid:userid},function(result){
        show_search_result(result);
    });*/
}

function request_messages(){

}

function show_friend_list(list){
    for(var i=0; i<list.length; i++){
        add_single_friend(list[i]);
    }
    $(".friend-card").css({
        "display": "-moz-box",
        "display": "-webkit-box",
        "display": "box",
        "margin":"0 10px",
        "padding":"15px 0 10px",
        "border-bottom": "1px solid #f0f0f0",
        "font-size": "18px",
        "text-align":"justify",
        "word-break": "break-all",
        "background-color":"white"
    });
    $(".friend-icon").css({
        "width": "72px",
        "height": "72px",
        "margin-right": "15px",
        "overflow": "hidden",
    });
    $(".friend-name").css({"top":"20%","color":"violet"});
    $(".steps-today").css({"top":"60%","float":"left"});
}


function add_single_friend(friend){
    var friendcard = $("<section class='friend-card'><img class='friend-icon' src='"+friend.icon+"'><p class='friend-name'>"+friend.nickname+"</p><br><p class='steps-today'>今日运动："+friend.distance+"步</p></section>");
    $(".friend-list").append(friendcard);
}

function show_search_result(search_result){
    for(var i=0; i<search_result.length;i++){
        add_single_user(search_result[i]);
    }
    $(".user-card").css({
        "display": "-moz-box",
        "display": "-webkit-box",
        "display": "box",
        "margin":"0 10px",
        "padding":"15px 0 10px",
        "border-bottom": "1px solid #f0f0f0",
        "font-size": "18px",
        "text-align":"justify",
        "word-break": "break-all",
        "background-color":"white"
    });
    $(".user-icon").css({
        "width": "72px",
        "height": "72px",
        "margin-right": "15px",
        "overflow": "hidden",
    });
    $(".user-name").css({
                        "color":"violet",
                        "float":"right"
                    });
    $(".add-friend").css({
        "position":"relative",
        "top":"30%",
        "left":"60%",
        "border-radius":"3px",
        "background-color":"74a12d",
        "color":"white",
        "font-size":"18px"
    });
    var button_add = $(".add-friend");
    for(var i=0; i<button_add.length; i++){
        var url = ip + "friend/add/";
        $(button_add[i]).click(function(){
            current_click_id = search_result[i].userid;
            $("#mask").css({"display":"block"});
            //$.get(url, {userid:userid, friendid:search_result[i].userid});
        })
    }
}

function add_single_user(user){
    var usercard = $("<section class='user-card'><img class='friend-icon' src='"+user.icon+"'><p class='user-name'>"+user.name+"</p><button class='add-friend'>关注</button></section>");
    $(".user-list").append(usercard);
}

function clickCall(evt) {
    var point = chartLine.getPointSingleAtEvent(evt);
                    
    if ( point !== null )
        alert( point.label + ": " + point.lineItemName + " ____ " + point.value);
}
                

function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("/image/png");
    return image;
}