var userid;
var page_id = 0;
var total_flags=20;
var has_loaded_page2 = false;

var if_locked = [];

for(var i=0; i<=total_flags; i++) {
    if_locked[i] = 0;
}
if_locked[1] = 1;
if_locked[8] = 1;
if_locked[14] = 1;
if_locked[11] = 1;

var country_details = [0, {img:"Beijing.jpg", info:"北京（Beijing），简称京，中华人民共和国首都、直辖市、国家中心城市、超大城市，全国政治中心、文化中心、国际交往中心、科技创新中心[1]，是中国共产党中央委员会、中华人民共和国中央人民政府和全国人民代表大会的办公所在地。京位于东经115.7°—117.4°，北纬39.4°—41.6°，中心位于北纬39°54′20″，东经116°25′29″，总面积16410.54平方千米。北京位于华北平原北部，背靠燕山，毗邻天津市和河北省[3]。北京的气候为典型的北温带半湿润大陆性季风气候。"}]

var flag_click = 0;
var if_showing_detail = false;

function switch_page(){
    $("nav li").css("color", "#8D8383");
    $("nav li").attr("class", "");
    $(this).attr("class","selected");
    $(this).css("color", "#fff");
    if($(this).attr("id")=="tag0"){
        if(page_id!=0){
            page_id=0;
            switch_to_page0();
            $("#wrapper").css("display","none");
            $("#wrapper_page0").css("display","block");
            $("#wrapper_page1").css("display","none");
        }
    } else if($(this).attr("id")=="tag1"){
        if(page_id!=1){
            page_id=1;
            switch_to_page1();
            $("#smog").css("display","block");
            $("#smog").css("top",-$("#smog").height());
            $("#smog").animate({top:$(window).height()},4000);
            setTimeout(function(){
                $("#smog").css("display","none");
            },4000);
            $("#wrapper").css("display","none");
            $("#wrapper_page0").css("display","none");
            $("#wrapper_page1").css("display","block");
            $("#wrapper_page1").css("top",($(window).height()-$("#wrapper_page1").height()-100)/2);
            $("#wrapper_page1").css("left",-($("#wrapper_page1").width())/6);
        }
    } else if($(this).attr("id")=="tag2"){
        if(page_id!=2){
            page_id=2;
            $("#wrapper").css("display","block");
            $("#wrapper_page0").css("display","none");
            $("#wrapper_page1").css("display","none");
            if(!has_loaded_page2) {
                switch_to_page2();
            }
        }
    }
}

function switch_to_page0(){
}

function switch_to_page1(){
}

function switch_to_page2(){
    show_flags();
    has_loaded_page2 = true;
}

function request_page2(){
}

function show_page2(){
    show_flags();
}

function show_flags(){
    for(var i=1; i<=total_flags; i++) {
        single_flag = $("<img class='flag_visited' id='flag"+i+"'src='flags1/"+i+".png'>");
        $("#flags").append(single_flag);
    }
    $(".flag_visited").css({
        "width":"18%",
        "margin":"0.3rem",
        "border-color":"#303030",
        "border-radius":"0.3rem",
        "border-width":"3px",
        "border-style":"inset"
    });
    for(var i=1; i<=total_flags; i++) {
        $($(".flag_visited")[i-1]).load(function(){
            var flag_id = $(this).attr("id");
            if(flag_id.length == 5) {
                num = flag_id[4];
            } else if (flag_id.length == 6) {
                num = flag_id[4] + flag_id[5];
            } else {
                num = flag_id[4] + flag_id[5] + flag_id[6];
            }
            if(!if_locked[num]) {
                lock_icon = $("<img class='lock_icon' id='lock"+num+"'src='img/lock.jpg'>");
                top1 = $(this).offset().top + 1;
                left = $(this).offset().left + 1;
                $("#flags").append(lock_icon);
                $("#lock"+num).css({
                    "width":"18%",
                    "border-width":"3px",
                    "position":"absolute",
                    "z-index":"1",
                    "background-color":"black",
                    "opacity":"0.8",
                    "top":top1,
                    "left":left
                });
            } else {
                $(this).click(function(){
                    var temp = $(this).attr("id");
                    flag_click = parseInt(temp.substring(4,temp.length));
                    show_detail();
                });
            }
        });

    }
}

function show_detail() {
    $("#mask_page2").fadeIn(function(){
        var detail_img = $("<img class='detail_img' src='img/"+country_details[flag_click].img+"'>");
        var detail_info = $("<div class='detail_info'><p>"+country_details[flag_click].info+"</p></div>");
        var detail_wrapper = $("<div class='detail_wrapper' id='wrapper"+flag_click+"'></div>");
        $("#wrapper").append(detail_wrapper);
        $("#wrapper"+flag_click).append(detail_img);
        $("#wrapper"+flag_click).append(detail_info);
        $("#wrapper"+flag_click).fadeIn();
        $(".detail_img").css({
            "position":"absolute",
            "width":"60%",
            "left":"20%",
            "top":"15%",
            "z-index":"3",
        });
        $(".detail_info").css({
            "position":"absolute",
            "width":"60%",
            "left":"20%",
            "top":$("body").height() * 0.35+"px",
            "color":"white",
            "z-index":"3"
        });
        if_showing_detail = true;
    });
}
