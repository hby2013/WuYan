var countries1 = ['CHINA','NORTH KOREA','SOUTH KOREA','JAPAN','PHILIPPINES','MALAYSIA','BRUNEI','INDONESIA','SINGAPORE','VIETNAM','CAMBODIA','LAOS','THAILAND','MYANMAR','BANGLADESH','BHUTAN','NEPAL','INDIA','SRI LANKA','MALDIVES','OMAN','YEMEN','SAUDI ARABIA','UNITED ARAB EMIRATES','QATAR','BAHRAIN','KUWAIT','IRAQ','JORDAN','PALESTINE','ISRAEL','SYRIA','LEBANON','TURKEY','GEORGIA','ARMENIA','AZERBAIJAN','IRAN','PAKISTAN','AFGHANISTAN','TURKMENISTAN','TAJIKISTAN','KYRGYZSTAN','UZBEKISTAN','KAZAKHSTAN','MONGOLIA','RUSSIA','FINLAND','NORWAY','SWEDEN','ESTONIA','LATVIA','LITHUANIA','BELARUS','UKRAINE','MOLDOVA','ROMANIA','POLAND','SLOVAKIA','HUNGARY','SERBIA','BULGARIA','GREECE','MACEDONIA','ALBANIA','KOSOVO','MONTENEGRO','BOSNIA AND HERZEGOVINA','CROATIA','SLOVENIA','AUSTRIA','CZECH REPUBLIC','GERMANY','DENMARK','NETHERLANDS','BELGIUM','FRANCE','SWITZERLAND','ITALY','SPAIN','PORTUGAL','UNITED KINGDOM','IRELAND','CYPRUS','EGYPT','LIBYA','TUNISIA','ALGERIA','MOROCCO','WESTERN SAHARA','MAURITANIA','SENEGAL','MALI','NIGER','CHAD','SUDAN','ERITREA','DJIBOUTI','SOMALIA','ETHIOPIA','SOUTH SUDAN','CENTRAL AFRICAN REPUBLIC','NIGERIA','BENIN','TOGO','BURKINA FASO','GHANA','LIBERIA','SIERRA LEONE','GUINEA','GUINEA-BISSAU','CAMEROON','EQUATORIAL GUINEA','GABON','CONGO','DEMOCRATIC REPUBLIC OF THE CONGO','RWANDA','UGANDA','KENYA','TANZANIA','BURUNDI','MOZAMBIQUE','MALAWI','ZAMBIA','ANGOLA','NAMIBIA','BOTSWANA','ZIMBABWE','SOUTH AFRICA','SWAZILAND','LESOTHO','MADAGASCAR','COMOROS','SEYCHELLES','MAURITIUS','TIMOR-LESTE','PAPUA NEW GUINEA','SOLOMON ISLANDS','FIJI','NEW ZEALAND','AUSTRALIA','CHILE','ARGENTINA','URUGUAY','BRAZIL','PARAGUAY','BOLIVIA','PERU','ECUADOR','COLOMBIA','VENEZUELA','GUYANA','SURINAME','FRENCH GUIANA','PANAMA','COSTA RICA','NICARAGUA','HONDURAS','EL SALVADOR','GUATEMALA','BELIZE','JAMAICA','HAITI','DOMINICAN REPUBLIC','PUERTO RICO','CUBA','BAHAMAS','MEXICO','UNITED STATES','CANADA'];

var userid;
var page_id = 0;
var total_flags=countries1.length;
var has_loaded_page2 = false;
var has_loaded_page1 = false;
var if_locked = [];

for(var i=0; i<=total_flags; i++) {
    if_locked[i] = 0;
}
if_locked[0] = 1;

for(var i=1; i<=country_data.cur_country+1; i++) {
    if_locked[i] = 1;
}

var infos = [];
var world_list = [33,119,147,80,128,99,23,73,141,176,27,87,161,111,13,18,113,72,150,100,121,133,178,136,170,132,12,85,75,81,123,156,89,166,59,7,10,74,122,1,167,159,86,174,82,107,134,55,120,154,52,88,94,14,169,106,133,129,142,70,138,24,62,96,2,84,108,20,38,143,9,41,60,44,114,15,56,155,78,149,130,171,76,40,48,92,165,3,109,177,103,137,101,145,117,118,117,118,31,148,151,51,45,145,53,148,30,117,118,118,17,164,25,61,91,140,50,65,66,125,66,118,28,50,58,36,43,43,135,168,83,160,26,110,98,179,5,112,21,180,146,153,90,97,35,139,104,163,125,144,54,115,8,32,6,173,22,126,19,127,47,34,175,67,152,57,124,37,116,69,49,64,16,79,68,46,131,39,11,105,172,29];

var image_loaded = 0;

var flag_click = -1;
var if_showing_detail = false;
alert(countries1.length)
function switch_page(){
    $("nav li").css("color", "#8D8383");
    $("nav li").attr("class", "");
    $(this).attr("class","selected");
    $(this).css("color", "#fff");
    if($(this).attr("id")=="tag0"){
        if(page_id!=0){
            page_id=0;
            switch_to_page0();
            $("#header").css("display","none");
            $("#wrapper").css("display","none");
            $("#wrapper_page0").css("display","block");
            $("#wrapper_page1").css("display","none");
        }
    } else if($(this).attr("id")=="tag1"){
        if(page_id!=1){
            page_id=1;
            switch_to_page1();
            //$("#smog").css("display","block");
            //$("#smog").animate({left:$(window).width()},4000);
            //setTimeout(function(){
            //    $("#smog").css("display","none");
            //},4000);
            $("#head_img")[0].src = country_data.icon;
            $("#hello").html("Hi,"+ country_data.nickname);
            $("#wrapper").css("display","none");
            $("#wrapper_page0").css("display","none");
            $("#wrapper_page1").css("display","block");
            $("#header").css("display","block");
            if(has_loaded_page1 == false){
                var window_height = document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight ;
                var window_width = document.all ? document.getElementsByTagName("html")[0].offsetWidth : window.innerWidth ;
                give_map_size();
                //var length = country_data.cur_country;
                var length = 5;
                for(var i = 0 ; i <= country_data.cur_country; i++){
                    var id = "map_" + world_list[i];
                    shinedelay(i, id);
                }
                var decimal_places = 1;
                var decimal_factor = decimal_places === 0 ? 1 : decimal_places * 10;
                $('#target').animateNumber(
                    {
                    number: country_data.cur_country + 1,
                    color: 'red',
                    'font-size': '25px',

                    //numberStep: function(now, tween) {
                    //    var floored_number = Math.floor(now) / decimal_factor,
                    //        target = $(tween.elem);
                    //    if (decimal_places > 0) {
                    //    floored_number = floored_number.toFixed(decimal_places);
                    //    }
                    //
                    //    target.text(floored_number);
                    //}
                    },
                    3000
                )
                $("#wrapper_page1").css("top",(window_height-map_height)/2 + 50);
                has_loaded_page1 = true;
            }
        }
    } else if($(this).attr("id")=="tag2"){
        if(page_id!=2){
            page_id=2;
            $("#header").css("display","none");
            $("#wrapper").css("display","block");
            $("#wrapper_page0").css("display","none");
            $("#wrapper_page1").css("display","none");
            if(!has_loaded_page2) {
                switch_to_page2();
            }
        }
    }
}

function shinedelay(i, id) {
    setTimeout(function(){
        $('#'+id).css({'fill':getRandomColor});
    },i*3000/total_flags+1000);
}

var getRandomColor = function(){
    return  '#' +
      (function(color){
      return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])
        && (color.length == 6) ?  color : arguments.callee(color);
    })('');
    //var color = ["#FFFF00","#FFB6C1","#CAFF70","#AEEEEE","#32CD32","#D8BFD8"];
    //return color[Math.floor(Math.random()*5)];

}

function switch_to_page0(){
}

function switch_to_page1(){
}

function switch_to_page2(){
    $("#mask_loading").css("display","block");
    $.ajax({
        type:'post',
        url:'/country_info',
        data:{},
        dataType:"json",
        success:function(data){
            if(data){
                infos = data;
                for(var i=1; i<=country_data.cur_country; i++) {
                    if_locked[i] = 1;
                }
                show_flags();
                has_loaded_page2 = true;
            }
        }
    })
}

function request_page2(){
}

function show_page2(){
    show_flags();
}

function convert_picname(name){
    var result_name = "";
    for (var i=0; i<name.length; i++) {
        if (i==0) {
            result_name += name[i];
        } else if (name[i] == ' ') {
            result_name += name[i];
            result_name += name[i+1];
            i++;
        } else {
            result_name += name[i].toLowerCase();
        }
    }
    return result_name;
}

function show_flags(){
    
    for(var i=1; i<=total_flags; i++) {
        //alert(countries1[0]);
        single_flag = $("<img class='flag_visited' id='flag"+i+"'src='png/"+convert_picname(countries1[i-1])+" Flag.png'>");
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
            image_loaded ++;
            var flag_id = $(this).attr("id");
            if(flag_id.length == 5) {
                num = flag_id[4];
            } else if (flag_id.length == 6) {
                num = flag_id[4] + flag_id[5];
            } else {
                num = flag_id[4] + flag_id[5] + flag_id[6];
            }
            if(!if_locked[num-1]) {
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
                    flag_click = parseInt(temp.substring(4,temp.length))-1;
                    show_detail();
                });
            }
            if (image_loaded == total_flags) {
                $("#mask_loading").css("display","none");
            } 
        });

    }
}

function show_detail() {
    $("#mask_page2").fadeIn(function(){
        var detail_img = $("<img class='detail_img' src='../world_images/"+convert_picname(countries1[flag_click])+".jpg'>");
        if(infos.length>0) {
            //console.log(flag_click);
            //console.log(infos[flag_click].intro);
            var detail_info = $("<div class='detail_info'><p>"+infos[flag_click].intro+"</p></div>");
        }
        var detail_wrapper = $("<div class='detail_wrapper' id='wrapper"+flag_click+"'></div>");
        $("#wrapper").append(detail_wrapper);
        $("#wrapper"+flag_click).append(detail_img);
        $("#wrapper"+flag_click).append(detail_info);
        $("#wrapper"+flag_click).fadeIn();
        $(".detail_img").css({
            "position":"absolute",
            "width":"60%",
            "height":"20%",
            "left":"20%",
            "top":$("body").scrollTop() + $(window).height() * 0.15+"px",
            "z-index":"3",
        });
        $(".detail_info").css({
            "position":"absolute",
            "width":"60%",
            "left":"20%",
            "top": $("body").scrollTop() + $(window).height() * 0.4+"px",
            "color":"white",
            "z-index":"3"
        });
        if_showing_detail = true;
    });
}

function give_map_size(){
    var window_height = document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight ;
    if(window_height <= 320){
        map_height = 100;
    }
    else if(window_height <= 400){
        map_height = 134;
    }
    else if(window_height <= 480){
        map_height = 170;
    }
    else if(window_height <= 568){
        map_height = 210;
    }
    else if(window_height <= 685){
        map_height = 252;
    }
    else if(window_height <= 767){
        map_height = 310;
    }
    else if(window_height <= 979){
        map_height = 360;
    }
    else if(window_height <= 1024){
        map_height = 470;
    }
    else if(window_height <= 1281){
        map_height = 580;
    }
    map_width = map_height * 2;
    $("#map_base svg").css("height", map_height);
    $("#wrapper_page1").css("height", map_height+10);
    $("#wrapper_page1").css("width", map_height*2+10);
};

function show_num(n){
    var it = $(".t_num i");
    var len = String(n).length;
    for(var i=0;i<len;i++){
        if(it.length<=i){
            $(".t_num").append("<i></i>");
        }
        var num=String(n).charAt(i);
        var y = -parseInt(num)*30;
        var obj = $(".t_num i").eq(i);
        obj.animate({
            backgroundPosition :'(0 '+String(y)+'px)'
            }, 'slow','swing',function(){}
        );
    }
}
