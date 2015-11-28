userid = "";  //存储openid
list = [{icon:"icon1.jpg", userid:"123", name:"夏英达",steps:1234},
        {icon:"icon2.jpg", userid:"456", name:"范冰冰",steps:4567}];
page_id = 0;     //存储当前页面
search_result = list;
has_bind_button = false;
ip = "http://1234/";

$(window).load(function(){
    $("nav li").css("color", "#8D8383");
    $(".selected").css("color", "#fff");
    $("nav li").click(switch_page);
    request_friend_list();
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

}

function switch_to_page2(){
    $("#search").css("display","block");
    if(!has_bind_button){
        $("#search-button").click(click_search_button);
        has_bind_button = true;
    }
}

function switch_to_page3(){

};

function request_friend_list(){
    var url = ip + "friends/friend_list/";
    $.get(url, {userid:userid},function(result){
        show_friend_list(result);
    });
}

function click_search_button(){
    var request_name = $("input").val();
    request_serach_result(request_name);
    //show_search_result(search_result);
}

function request_search_result(info){
    var url = ip + "friends/search/";
    $.get(url, {content:info, userid:userid},function(result){
        show_search_result(result);
    });
}

function request_special_friend(){

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
    var friendcard = $("<section class='friend-card'><img class='friend-icon' src='"+friend.icon+"'><p class='friend-name'>"+friend.name+"</p><br><p class='steps-today'>今日运动："+friend.steps+"步</p></section>");
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
        "background-color":"blue",
        "color":"white",
        "font-size":"15px"
    });
    var button_add = $(".add-friend");
    for(var i=0; i<button_add.length; i++){
        var url = ip + "friend/add/";
        $(button_add[i]).click(function(){
            $.get(url, {userid:userid, friendid:search_result[i].userid});
        })
    }
}

function add_single_user(user){
    var usercard = $("<section class='user-card'><img class='friend-icon' src='"+user.icon+"'><p class='user-name'>"+user.name+"</p><button class='add-friend'>关注</button></section>");
    $(".user-list").append(usercard);
}