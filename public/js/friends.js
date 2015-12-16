//需要传递的初始参数
var userid = window.userid;  //存储openid
var page_id = 0; //存储当前页面
//var ip = #{ip};

//其他参数，不用管

special_friend = [];

has_bind_button = false;
var current_click_id = 0;
var current_special_friend = 1;
var current_click_spec_id = 0;

$(window).load(function(){
    $("nav li").css("color", "#8D8383");
    $(".selected").css("color", "#fff");
    $("nav li").click(switch_page);
    if(page_id == 0){
        request_friend_list();
    } else if(page_id == 1) {
    }
    $("#left-arrow").css({
        "top":$(window).height()/2-30 + "px",
        "left":"0px",
        "margin-left":"0px"
    });
    $("#right-arrow").css({
        "top":$(window).height()/2-30 + "px",
        "left":$(window).width()-55 + "px"
    });
    $("#left-arrow").click(function(){
        current_special_friend--;
        show_special_friend(special_friends[current_special_friend-1]);
        display_arrow(special_friends.length);
    });
    $("#right-arrow").click(function(){
        current_special_friend++;
        show_special_friend(special_friends[current_special_friend-1]);
        display_arrow(special_friends.length);
    });
});

function switch_page(){
    $("nav li").css("color", "#8D8383");
    $("nav li").attr("class", "");
    $(this).attr("class","selected");
    $(this).css("color", "#fff");
    $("#left-arrow").css("display","block");
    $("#right-arrow").css("display","none");
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
            $(".friend-list").empty();
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
    $("#left-arrow").css("display","none");
    $("#right-arrow").css("display","none");
    request_friend_list();
    //show_friend_list(list);
}

function switch_to_page1(){
    $("#search").css("display","none");
    $("#friend-list").css("display","none");
    $("#special-friend").empty();
    $("#left-arrow").css("display","none");
    $("#right-arrow").css("display","none");
    request_special_friend();
}

function switch_to_page2(){
    $("#search").css("display","block");
    $("#left-arrow").css("display","none");
    $("#right-arrow").css("display","none");
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
                special_friends = data;
                choose_special_friend(special_friends);
            } else{
                alert("返回值为空");
            }
        }
    });
}

function convert_data(basic_list, day_data_list){
    special_friends = [];
    for(var i=0;i<day_data_list.length;i++){
        var special_friend = new Object();
        special_friend.icon = basic_list[i].icon;
        special_friend.userid = basic_list[i].userid;
        special_friend.name = basic_list[i].nickname;
        special_friend.steps_week = [i,i+7,i,i,i*i,i,i];
        special_friend.steps_today = day_data_list[i].steps;
        special_friend.sleep_yesterday = day_data_list[i].sleep_time;
        special_friends[i] = special_friend;
    }
    //show_special_friend(friend);
    choose_special_friend(special_friends);
}

function choose_special_friend(friend){
    //$("#buttons-special-friend").remove();
    //var buttons_special_friend = $("<div id='buttons-special-friend'></div>");
    //$("#special-friend").append(buttons_special_friend);
    var num_special_friend = friend.length;
    current_special_friend = 1;
    display_arrow(num_special_friend);
    /*
    if(num_special_friend) {
        for(var i=0; i<num_special_friend; i++) {
            var single_button = $("<button class='but-special' id='but-special"+i+"'>"+friend[i].name+"</button>");
            $("#buttons-special-friend").append(single_button);
            $("#but-special"+i).click(function(){
                var num = parseInt($(this).attr("id")[11]);
                show_special_friend(special_friend[num]);
            });
        }
    }*/
    /*
    $(".but-special").css({
        "background" : "-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #f9f9f9), color-stop(1, #e9e9e9))",
        "background-color":"#f9f9f9",
        "border-radius":"6px",
        "border":"1px solid #dcdcdc",
        "font-size":"20px",
        "font-weight":"bold",
        "width":"30%",
        "height":"30px",
        "text-shadow":"0px 1px 0px #ffffff"
    });
    $("#buttons-special-friend").css({
        "margin":"10px 10px"
    });*/
    show_special_friend(friend[current_special_friend-1]);
}

function display_arrow(friend_num){
    if(friend_num<=1){
        $("#left-arrow").css("display","none");
        $("#right-arrow").css("display","none");
    }

    else if(current_special_friend < friend_num){
        //$("#left-arrow").css("display","none");
        $("#right-arrow").css("display","block");
        if(current_special_friend > 1){
            $("#left-arrow").css("display","block");
        }
        else{
            $("#left-arrow").css("display","none");
        }
    }
    else{
        $("#right-arrow").css("display","none");
       if(current_special_friend > 1){
            $("#left-arrow").css("display","block");
        }
        else{
            $("#left-arrow").css("display","none");
        }
    }
}

function show_special_friend(friend){
    var heights = $(window).height();
    var wi = $(window).width() * 0.8;
    $("#special-friend-info").remove();
    $("#sports-text").remove();
    $("#sports-info").remove();
    var info_card = $("<section id='special-friend-info'><img id='special-friend-icon' src='"+friend.icon+"'><p id='special-friend-name'>"+friend.nickname+"</p><p id='special-friend-id'>ID："+friend.userid+"</p></section>");
    $("#special-friend").append(info_card);
    $("#special-friend-info").css({
        "display": "-moz-box",
        "display": "-webkit-box",
        "display": "box",
        "margin":"3px",
        "padding":"10px",
        "height":heights/8+"px",
        "border-bottom": "1px solid #f0f0f0",
        "font-size": "18px",
        "text-align":"justify",
        "word-break": "break-all",
        "background-color":"white"
    });
    $("#special-friend-name").css({
        "position":"relative",
        "left":"35%",
        "top":"10%",
        "margin":"0",
        "padding":"0",
        "color":"violet"
    });
    $("#special-friend-id").css({
        "position":"relative",
        "left":"35%",
        "top":"15%",
        "margin":"0",
        "padding":"0",
        "font-size": "12px",
        "color":"violet"
    });
    $("#special-friend-icon").css({
        "width": (heights/8) + "px",
        "height": (heights/8) + "px",
        "overflow": "hidden",
        "position":"absolute"
    });
    var sleep_hour = parseInt(friend.sleep_time / 60);
    var sleep_min = friend.sleep_time % 60;
    var sports_basic = $("<div id='sports-text'><img src='/img/sleep.jpg' class='img_walk'><div style='margin-left:50px'><span> 昨晚睡了</span><span id='text-sleep_hour'>"+sleep_hour+"</span><span>小时</span><span id='text-sleep_min'>"+sleep_min+"</span><span>分钟</span><br></div><img src='/img/walk.jpg' class='img_walk'><span style='margin-left:50px'> 今天步行</span><span id='text-walk'>"+friend.steps+"</span><span>步</span></div>");
    $("#special-friend").append(sports_basic);
    $(".img_walk").css({
        "width": "30px",
        "height": "30px",
        "margin-left": "10px",
        "margin-top": "18px",
        "overflow": "hidden",
        "position":"absolute"
    });
    $("#text-sleep_hour").css({"font-size": heights/15+"px"});
    $("#text-sleep_min").css({"font-size": heights/15+"px"});
    $("#text-walk").css({"font-size": heights/15+"px"});
    $("#sports-text").css({
        "display": "-moz-box",
        "display": "-webkit-box",
        "display": "box",
        "height":heights/5 + "px",
        "margin":"3px",
        "padding":"10px",
        "border-bottom": "1px solid #f0f0f0",
        "font-size": "18px",
        "text-align":"justify",
        "word-break": "break-all",
        "background-color":"white"
        //"top":$("#sports-info").offset().top + 20 + "px"
    });

    var sports_info = $("<div id='sports-info'><div id='chart_title'>本周运动趋势图</div><canvas id='myChart' width='"+ wi +"' height='" +wi/2+ "'></canvas></div>");
    $("#special-friend").append(sports_info);
    $("#sports-info").css({
        "display": "-moz-box",
        "display": "-webkit-box",
        "display": "box",
        "margin":"3px",
        "height":(heights*27/40 - 133) + "px",
        "padding":"10px",
        "border-bottom": "1px solid #f0f0f0",
        "font-size": "18px",
        "text-align":"justify",
        "word-break": "break-all",
        "background-color":"white"
    });
    show_chart(friend.steps_week);
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
    $('#myChart').css({
        //"position":"relative",
        "width":"200px",
        "top":"50%"
    });
    $('#chart_title').css({
        "position":"relative",
        "padding":"5% 3% 10% 0%",
        "color":"black",
        "width":"90%",
        "text-align":"center",
        //"top":"60%"
    });
    //$('#chart_title').attr("width","100px");
    var window_height = document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight ;
    var window_width = document.all ? document.getElementsByTagName("html")[0].offsetWidth : window.innerWidth ;
    var width = window_height/50;
    var chart_width = $('#myChart').width;
    $('#myChart').height = window_height / 3;
    var chart_top= (window_height * 0.2 + (window_height * 0.8 - chart_width)/2);
    $("#myChart").css("bottom", chart_top);
    $("#chart_title").css("top", chart_top);
    var chartLine = null;          
    var ctx = document.getElementById('myChart').getContext("2d");
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

function show_friend_list(list){
    for(var i=0; i<list.length; i++){
        add_single_friend(list[i]);
    }
    $(".friend-card").css({
        "display": "-moz-box",
        "display": "-webkit-box",
        "display": "box",
        "margin":"3px",
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
    $(".steps-today").css({"float":"right","color":"violet","font-size": "12px",});
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
        "margin":"3px",
        "padding":"10px 10px 3px 10px",
        "border-bottom": "1px solid #f0f0f0",
        "font-size": "18px",
        "text-align":"justify",
        "word-break": "break-all",
        "background-color":"white"
    });
    $(".user-icon").css({
        "width": "80px",
        "height": "80px",
        "overflow": "hidden",
    });
    $(".user-name").css({
        "color":"violet",
        "position":"absolute",
        "left":"36%",
        "top":"24%"
    });
    $(".add-friend").css({
        "position":"absolute",
        "top":"30%",
        "left":"48%",
        "margin-right":"2%",
        "border-radius":"5px",
        "background-color":"lightgreen",
        "color":"grey",
        "font-size":"14px",
    });
    $(".add-special-friend").css({
        "position":"absolute",
        "top":"30%",
        "left":"65%",
        "border-radius":"5px",
        "background-color":"lightgreen",
        "color":"grey",
        "font-size":"14px",
    });
    var button_add = $(".add-friend");
    var button_add_special = $(".add-special-friend");
    for(var i=0; i<button_add.length; i++){
        $(button_add[i]).click({friend:search_result[i]},function(event){
            add_friend(event.data.friend.userid);
        });
        $(button_add_special[i]).click({special_friend:search_result[i]},function(event){
            add_special_friend(event.data.special_friend.userid);
        });
    }
}

function add_single_user(user){
    var usercard = $("<section class='user-card'><img class='friend-icon' src='"+user.icon+"'><span class='user-name'>"+user.nickname+"</span><button class='add-friend'>关注</button><button class='add-special-friend'>特别关注</button></section>");
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

function add_friend(friendid){
    $.ajax({
        type:'post',
        url:"/attention/add_friend/",
        data:{userid:userid, friendid:friendid},
        dataType:"json",
        success:function(data){
            if(data){
                alert("发送请求成功！");
            } else{
                alert("返回值为空");
            }
        }
    });
}

function add_special_friend(friendid){
    $.ajax({
        type:'post',
        url:"/attention/add_special_friend/",
        data:{userid:userid, friendid:friendid},
        dataType:"json",
        success:function(data){
            if(data){
                alert("发送请求成功！");
            } else{
                alert("返回值为空");
            }
        }
    });
}