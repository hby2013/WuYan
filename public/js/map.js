var ip_address = "59.66.139.79";
var current_person = 0;
//var markerArr = [  
//    { nickname: "夏英达", point: "116.320786,40.008045", icon:"img/head2.jpg",data:[28,48,40,70,23,34]},  
//    { nickname: "雨田或", point: "116.3170934,40.0093401", icon:"img/head3.jpg", data:[28,18,30,30,13,24]},  
//    { nickname: "池婧雯", point: "116.3212213,40.0107267", icon:"img/head4.jpg", data:[28,28,20,10,33,54]},  
//    { nickname: "谢宇辰", point: "116.3272867,40.0104274", icon:"img/head5.jpg", data:[28,38,10,20,13,44]},
//];
var markerArr = [];  
var data = {
    labels : ["周运动时间","当天运动时间","周平均步数","当天步数","周平均卡路里","当天卡路里"],
    datasets : [
        {
            fillColor : "rgba(220,220,220,0.5)",
            strokeColor : "rgba(150,220,220,1)",
            pointColor : "rgba(220,220,220,1)",
            pointStrokeColor : "#fff",
            data : [28,48,40,70,23,34]
        },
        {
            fillColor : "rgba(151,187,205,0.5)",
            strokeColor : "rgba(151,187,205,1)",
            pointColor : "rgba(151,187,205,1)",
            pointStrokeColor : "#fff",
            data : [28,18,30,30,13,24]
        }
    ]
};
var map;
var point;
var current_point = 0;
var can_continue = true;
function map_init() {  
    map = new BMap.Map("map"); // 创建Map实例  
    var point = new BMap.Point(116.320786,40.008045); 
    map.centerAndZoom(point, 16); // 初始化地图,设置中心点坐标和地图级别。  
    map.enableScrollWheelZoom(true); //启用滚轮放大缩小  
    
    map.enableInertialDragging(true);
    map.enablePinchToZoom(true);
    
    //向地图中添加缩放控件  
    //var ctrlNav = new window.BMap.NavigationControl({  
    //    anchor: BMAP_ANCHOR_TOP_LEFT,  
    //    type: BMAP_NAVIGATION_CONTROL_LARGE  
    //});  
    //map.addControl(ctrlNav);  
    //
    ////向地图中添加缩略图控件  
    //var ctrlOve = new window.BMap.OverviewMapControl({  
    //    anchor: BMAP_ANCHOR_BOTTOM_RIGHT,  
    //    isOpen: 1  
    //});  
    //map.addControl(ctrlOve);  
    
    //向地图中添加比例尺控件  
    //var ctrlSca = new window.BMap.ScaleControl({  
    //    anchor: BMAP_ANCHOR_BOTTOM_LEFT  
    //});  
    //map.addControl(ctrlSca);  
    var marker = new Array(); //存放标注点对象的数组  
    var info = new Array(); //存放提示信息窗口对象的数组 
    current_point = 0;
    point = new Array(); //存放标注点经纬信息的数组  
    for (var i = 0; i < markerArr.length; i++) {  
        var p0 = markerArr[i].point.split(",")[0]; //  
        var p1 = markerArr[i].point.split(",")[1]; //按照原数组的point格式将地图点坐标的经纬度分别提出来  
        point[i] = new window.BMap.Point(p0, p1); //循环生成新的地图点  
        //debugger;
        //marker[i] = new window.BMap.Marker(point[i]); //按照地图点坐标生成标记 
        BMap.Convertor.translate(point[i],0,generator(i)); 
    }  
    //BMap.Convertor.transMore(point,0,callback);
}  

var new_point = [];
//坐标转换完之后的回调函数
function generator(i)
{
    return function translateCallback(point1){
        var myIcon = new BMap.Icon("img/map_marker.png", new BMap.Size(14, 26),
        {
            offset: new window.BMap.Size(7, 26), // 指定定位位置
            imageOffset: new BMap.Size(0, 0) // 设置图片偏移
        });;
        var marker1 = new BMap.Marker(point1,{icon:myIcon});
        map.addOverlay(marker1);
        var label = new BMap.Label(markerArr[i].nickname, { offset: new window.BMap.Size(20, -10)});
        marker1.setLabel(label); //添加百度label
        if(i==0)
            map.setCenter(point1); 
        marker1.onclick = function () { 
            document.getElementById("icon2").src = markerArr[i].icon;
            document.getElementById("nickname2").innerText = markerArr[i].nickname;
            data.datasets[1].data = markerArr[i].data;
            createChart();
            calculate_similarity(0,i);
            current_person = i;
            //map.setCenter(point1);
            map.panTo(point1);  
        };
        new_point[i]= point1;
        can_continue = true;
    };
}

var defaults = {
    scaleFontFamily : "微软雅黑",
    scaleFontSize : 10,
    animation : true,
    pointDotRadius : 3,
}

//异步调用百度js  
function map_load() { 
    get_json();
    setTimeout(function(){
    var load = document.createElement("script");  
    load.src = "http://api.map.baidu.com/api?v=1.5&callback=map_init&ak=56hSBkT6lEQ5hWlVLRgnqnLY";  
    document.body.appendChild(load);  
    init_current_person();
    set_time();},3000);
}  

function init_current_person(){
    document.getElementById("icon2").src = markerArr[0].icon;
    document.getElementById("nickname2").innerText = markerArr[0].nickname;
    data.datasets[1].data = markerArr[0].data;
    createChart();
    $("#go_date").css("display","block");
    calculate_similarity(0,0);
}

function createChart(){
    $("#myChart").remove();
    $("<canvas id='myChart' ></canvas>").appendTo($("#user_info"));
    var ctx = document.getElementById("myChart").getContext("2d");
    //alert(data.datasets[0].data + "sdsdf" + data.datasets[1].data);
    new Chart(ctx).Radar(data, defaults);
    
    var window_height = document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight ; 
    $("#myChart").height(window_height * 0.28);
    $("#myChart").width(window_height * 0.55);
    var info_top = (window_height * 0.06)/2; 
    $("#myChart").css("top",info_top);
    $("#go_date").css("bottom",0.07*window_height);
    $(".user_info0").css("bottom",0.05*window_height);
}

function calculate_similarity(m,n){
    var s = markerArr[n].similarity;
    document.getElementById("similary").innerHTML = "匹配度：<b style= 'color:red;font-size:2em'>"+s+"%</b>"; 
}

function set_time(){
    var currYear = (new Date()).getFullYear();	
    var opt={};
    opt.date = {preset : 'date'};
    opt.datetime = {preset : 'datetime'};
    opt.time = {preset : 'time'};
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式 
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear - 10, //开始年份
        endYear: currYear + 10 //结束年份
    };

    var optDateTime = $.extend(opt['datetime'], opt['default']);
    var optTime = $.extend(opt['time'], opt['default']);
    $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
    $("#appTime").mobiscroll(optTime).time(optTime);
}
    
function get_json(){   
    var thisURL = document.URL;    
    var getval =thisURL.split('?')[1];  
    var showval= getval.split("=")[1]; 
    $.ajax({
        type:'post',
        url:"/get_ranking_info",
        data:{"openid":showval},
        dataType:"json",
        success:
            function(json_data) { 
                //alert(json_data.length);
                for(var i = 0; i < json_data.length; i++){            
                    var new_info = new Object();            
                    new_info.nickname = json_data[i].nickname;            
                    new_info.icon = json_data[i].icon;            
                    new_info.similarity = json_data[i].similarity;            
                    new_info.point =  json_data[i].longitude + ","+ json_data[i].latitude;            
                    //new_info.data = [json_data[i].day_step, json_data[i].week_step, json_data[i].day_sport_time, json_data[i].week_sport_time, json_data[i].day_clr, json_data[i].week_clr];
                    new_info.data = [json_data[i].week_sport_time,json_data[i].day_sport_time*7, json_data[i].week_step/7,json_data[i].day_step,json_data[i].week_clr/7,json_data[i].day_clr];
                    new_info.openid = json_data[i].openid;
                    markerArr.push(new_info);         
                }
                document.getElementById("icon2").src = markerArr[0].icon;
                document.getElementById("nickname2").innerText = markerArr[0].nickname;
                data.datasets[0].data = markerArr[0].data;
                data.datasets[1].data = markerArr[0].data;
                createChart();
                calculate_similarity(0,0);
            }  
    });
} 

function show_settings(){
    $("#invitation_settings").css("display","block");
    $("#cover").css("display","block");
}

function close_settings(){
    $("#invitation_settings").css("display","none");
    $("#cover").css("display","none");
}

function send_invitation(){
    $.ajax({
        type:'post',
        url:"/send_invitation",
        data:{"openid1":markerArr[0].openid,"openid2":markerArr[current_person].openid,"latitude":invitation_latitude,"longitude":invitation_longitude,"time":$("#appDateTime").val(),"place":$("#place").val(),"postscript":$("#postscript").val(),"similarity":markerArr[current_person].similarity},
        dataType:"json",    
        success:function(){
            alert("邀请已成功发送，请等待对方回复。");
            $("#chosen_place").val("");
            $("#appDateTime").val("");
            $("#postscript").val("");
            close_settings();
        } 
    });
}

var map_to_choose;
var invitation_longitude;
var invitation_latitude;
var flag = false;
var invitation_address;
function choose_place(){
    $("#choose_place").css("display","block");
    $("#chosen_place").val("");
    map_to_choose = new BMap.Map("map_to_choose");   
    var p0 = markerArr[0].point.split(",")[0]; 
    var p1 = markerArr[0].point.split(",")[1];  
    var current_place = new window.BMap.Point(p0, p1);  
    map_to_choose.centerAndZoom(current_place, 16);   
    map_to_choose.enableScrollWheelZoom(true);   
    map_to_choose.enableInertialDragging(true);
    map_to_choose.enablePinchToZoom(true);
    var invitation_marker;
    map_to_choose.addEventListener("click",function(e){
        if(flag == true){
            map_to_choose.removeOverlay(invitation_marker);
        }
        invitation_longitude = e.point.lng;
        invitation_latitude = e.point.lat;

        //在地图上面描点
        invitation_marker = new BMap.Marker(new BMap.Point(invitation_longitude,invitation_latitude));  // 创建标注
        map_to_choose.addOverlay(invitation_marker);
        invitation_marker.enableDragging();    //可拖拽

        var gc = new BMap.Geocoder();
        //获取地址的数据地址
        var pt = e.point;
        gc.getLocation(pt, function(rs){
            var addComp = rs.addressComponents;
            invitation_address = addComp.province +  addComp.city + addComp.district + addComp.street + addComp.streetNumber;
            $("#chosen_place").val(invitation_address);
        });
        flag = true;
    });
}

function confirm_place(){
    $("#choose_place").css("display","none");
    $("#place").val($("#chosen_place").val());
}

function cancel_place(){
    $("#choose_place").css("display","none");
}

window.onload = map_load;