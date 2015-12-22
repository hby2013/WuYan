var window_width = document.all ? document.getElementsByTagusername("html")[0].offsetWidth : window.innerWidth;
var window_height = document.all ? document.getElementsByTagusername("html")[0].offsetHeight : window.innerHeight;
var first_country_name = "中国";
var second_country_name = "韩国";
var third_country_name = "俄罗斯";
var first_src = "map/China.png";
var second_src = "map/South Korea.png";
var third_src = "map/Russia.png";
var first_country_pic = "changcheng.jpg";
var second_country_pic = "korea.jpg";
var first_country_info = "<br/> 中国，即中华人民共和国，陆地领土包括中国大陆及其沿海岛屿、台湾及其包括钓鱼岛在内的附属各岛、澎湖列岛、东沙群岛、西沙群岛、中沙群岛、南沙群岛以及其他一切属于中华人民共和国的岛屿(包括钓鱼岛、黄尾屿、赤尾屿），共约960万平方公里。所管辖的海域面积约为300万平方公里（包括九段线以内的所有海域）。1949年10月1日起，国名全称为中华人民共和国，人口约13亿（2010），首都北京。 \
    <br/>中国是一个历史悠久的东方古国。中华文明与古埃及文明、古希腊文明、古印度文明和古巴比伦文明共同组成了人类在地球上的文明版图。最为可贵的是，中华文明虽然历经朝代更迭、民族融合与战争动荡，但是繁衍、发展至今未曾断裂，不论语言文字、风俗文化、文学艺术、建筑风格，都可以顺流而上，追溯到古老文明的风貌。因此，中国有着极为丰富的历史文化旅游资源。不论是古老的殷墟秦俑，还是巍峨的长城故宫，或是韵味十足的古镇老街……都能够让游客体会到历史的积淀和中华文化的魅力，在其中感叹人类的智慧。\
    <br/>中国还是一个幅员辽阔的世界大国。广阔的疆域容载着多样的地形、地貌与气候。在中国，人们既可以策马草原，感受风吹草低的豪情；也可以西进大漠，聆听悠悠驼铃在长河落日下的回声；更可以远上青藏，在离天空最近的地方，感受最为纯净的人间天堂。在中国，人们既能够问水九寨，看尽水的妩媚缤纷，又可以拜岳泰山，揽尽天下风光。在中国，塞外尚且山舞银蛇、原驰蜡象，海南却正碧海银沙、裙裾飘飘……大自然的鬼斧神工雕刻出无尽秀美、变化多姿的中国风光。\
"; 
var second_country_info = "<br/> 韩国位于中国大陆的东北部，古代中国人叫它“东夷”，今天，世人称之为“神秘的东方之光”。它新旧并存、古今融合；它举办过1988年夏季奥运会、有着现代文明的风采；它具有5000年文化传统，至今仍保留着古代东方文明的精髓。 这里风景引人入胜，人民诚挚坦率，是个理想的度假胜地，它拥有独特的文化和历史遗产，包括山岳、湖泊、温泉、海滨、皇宫、寺庙、宝塔、古迹、民俗村及博物馆等，共有2300余处。 <br/> 韩国现有人口约4685万，是世界上人口密度最高的国家之一。韩国社会自古以来，以家族血统为中心,虽然这种倾向在现代社会逐渐淡化，但对亲属的基本礼仪与忠诚、恪守不移。历史上受中国文化的影响，文字中采用不少汉字，如语言不通，笔谈也能在一定程度上进行交流。"
function click_next_map() {
    var width = $("#next_map").width();
    var height = $("#next_map").height();
    var new_height = window_width*0.9*height/width;
    $("#next_map_container").css("opacity",1);
    $("#cover").css("display","block");
    $("#next_map").attr("onclick","close_map()");
    $("#next_map").animate({width:window_width*0.9+"px",height:new_height+"px",borderRadius:"0",bottom:(window_height+new_height)/2-height-window_height*0.05+"px",right:window_width*0.9-width+"px"});
}

function my_animate() {
    $("#next_map").attr("onclick","");
    $("#intro_container").animate({opacity:0},1000);
    $("#bg_map").animate({opacity:1},1000);
    var width = $("#next_map").width();
    var height = $("#next_map").height();
    var new_height = window_width*0.9*height/width;
    setTimeout(function() {
        $("#walking_kid").css("display","block");
        $("#walking_kid").animate({height:"20px",top:window_height*0.9+"px",left:window_width*0.85+"px"},2000,"linear");
    },1000);
    setTimeout(function() {
        $("#walking_kid").css("display","none");
        $("#walking_kid").css("left","45%");
        $("#walking_kid").css("top","45%");
        $("#walking_kid").css("height","50px");
        $("#next_map").css("position","absolute");
        $("#next_map").animate({width:window_width*0.9+"px",height:new_height+"px",borderRadius:"0",bottom:(window_height-new_height)/2+"px",right:0},1000);
        $("#bg_map").animate({opacity:0},1000);
    },3050);
    setTimeout(function(){
        $("#story_div").animate({width:"100%",height:"100%",left:"0",top:"0"},1000);
        preload_images();
        set_font();
        set_character(data[0].character);
        set_bg_img(data[0].bg_img);
        setTimeout(function(){
            $("#story").css("display","block");
        },1000);
        setTimeout(function(){
            showText(data[0].word, 0, 20);
        },1500);
    },4500);
}

function close_map() {
    var width = $("#next_map").width();
    var height = $("#next_map").height();
    var new_height = $("#next_map_container").height();
    var new_width = new_height*width/height;
    $("#cover").css("display","none");
    $("#next_map").attr("onclick","click_next_map()");
    $("#next_map").animate({borderRadius:"2px",height:new_height+"px",width:new_width+"px",bottom:0,right:0});
}