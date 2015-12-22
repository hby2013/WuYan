var data = [{"bg_img":"航站楼.jpg","character":"","word":"不知来了多少次的T2航站楼，似乎随时都保持着活力。"},
            {"bg_img":"航站楼.jpg","character":"","word":"世界各地的人们来往于首都国际机场，忙着在这个不断崛起的首都留下自己的气息。而我手握着登机牌，急切地想要逃离这个生活了30年的故乡。"},
            {"bg_img":"咖啡厅1.jpg","character":"character/waitress.png","word":"\"您的卡布奇诺好了，欢迎下次光临。\""},
            {"bg_img":"咖啡厅1.jpg","character":"","word":"接过热腾腾的咖啡，我在starbucks找了一个角落坐下。记不清什么时候开始，冉冉最爱的卡布奇诺也成为我每次出发前的必选。"},
            {"bg_img":"咖啡厅1.jpg","character":"","word":"可能是卡布奇诺的味道总能让我回想起她握杯时白而微胖的双手，和沉浸在热腾腾的香气中圆润的脸。"},
            {"bg_img":"航站楼.jpg","character":"","word":"\"各位旅客请注意，您所乘坐的G132次航班现在开始登机，请携带好您的随身物品由11号登机口上飞机，祝您旅途愉快，谢谢！\""},
            {"bg_img":"航站楼.jpg","character":"","word":"\"要出发了，去韩国。\""},
            {"bg_img":"航站楼.jpg","character":"","word":"以往我都会在出发前给冉冉发上这么一条消息，但这次没有。拿上行李，我独自向登机口走去。"}
           ]; 

var images = ["航站楼.jpg","咖啡厅1.jpg","shouer.jpg","东大门.jpg","dongjing.jpg","hotel.jpg","机舱2.jpg","yindu.jpg",
              "character/happy.png","character/poor.png","character/shy.png","character/ran_excited.png","character/ran_happy.png","character/ran_peace.png","character/ran_sad.png","character/ran_strange.png","character/ran_tired.png"];
            
var current_scene = 0;  
var word_finished = false;

function preload_images(){
    var pre_images = new Array;
    for(var i = 0; i < images.length; i++){
        pre_images[i] = new Image();
        pre_images[i].src = images[i];
    }
}

function set_font(){
    var size = $(window).height * 0.04;
    $(document.body).css("font-size",size);
}

function set_bg_img(bg_src){
    $("#bg_img")[0].src = bg_src;
    var bg_img = new Image();
    bg_img.src = bg_src;
    bg_img.onload = function(){
        var ratio1 = bg_img.height / bg_img.width;
        var ratio2 = $(window).height()/$(window).width();
        if(ratio1 < ratio2){
            $("#bg_img").css("height",$(window).height());
            $("#bg_img").css("width", $(window).height() / ratio1);
            $("#bg_img").css("left", -($("#bg_img").width() - $(window).width())/2);
            $("#bg_img").css("top",0);
        }
        else{
            $("#bg_img").css("width",$(window).width());
            $("#bg_img").css("height", $(window).width() * ratio1);
            $("#bg_img").css("left", 0);
            $("#bg_img").css("top", -($("#bg_img").height() - $(window).height())/2);
        }
    }
}

var showText = function (message, index, interval) {
    if (index < message.length) {
        $("#word").append(message[index++]);
        timeID = setTimeout(function () { showText(message, index, interval); }, interval);
    }
    else{
        word_finished = true;
    }
}

function set_character(character){
    if(character == ""){
        $("#character").css("display","none");
    }
    else{
        $("#character").css("display","block");
        $("#character")[0].src = character;
    }
    
}

function next_scene(){
    if(word_finished == false){
        clearTimeout(timeID);
        $("#word").html(data[current_scene].word);
        word_finished = true;
    }
    else{    
        current_scene ++;
        if(current_scene < data.length){
            refresh_map();
            word_finished = false;
            set_bg_img(data[current_scene].bg_img);
            $("#word").html("");
            set_character(data[current_scene].character);
            showText(data[current_scene].word,0,20);
        }
        else{
            $("#story_div").css("display","none");
            
        }
    }
}


function refresh_map(){
    $("#intro_container").css("opacity","1");
    $("#bg_map").attr("src",second_src);
    $("#bg_map").css("top", ($("#country").height() - $("#bg_map").height())/2);
    $("#bg_map").css("opacity","0.3");
    $("#next_map").attr("src",third_src);
    $("#next_map").css("height",$("#next_map_container").height());
    $("#next_map").css("width","");
    $("#next_map").css("bottom",0);
    $("#next_map").css("right",0);
    $("#country_name").html(second_country_name);
    $("#country_pic").attr("src", second_country_pic);
    $("#country_info").html(second_country_info);
    $("#next_country_name").html(third_country_name);
}