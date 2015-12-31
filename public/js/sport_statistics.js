$(function () {
	var window_height = document.all ? document.getElementsByTagName("html")[0].offsetHeight : window.innerHeight ;
	var window_width = document.all ? document.getElementsByTagName("html")[0].offsetWidth : window.innerWidth ;
	var width = window_height/50;
	$("#set_font_size").css("font-size",width);
	var chart_width = $("#myChart").width();
	//$("#myChart")[0].height = $("#header").height();
	var chart_top= $("#header").height();
	$("#myChart")[0].height = window_height - $("#header").height();
	$("#myChart").css("top", chart_top);
	$("#chart_title").css("top", chart_top - 40);
	$("#statistics").css("width", 0.7 * window_width);
});

window.onload = function(){
	var thisURL = document.URL; 
    var getval =thisURL.split('?')[1];
    var openid = getval.split("=")[1];
	$.ajax({
        type:'post',
        url:"/steps",
        data:{"openid":openid},
        dataType:"json",
        success:function(data){
            if(data){
                show_data(data);
            } else{
                alert("返回值为空");
            }
        }
    });		
}


function show_data(db_steps){
	$("#head_img").attr("src",db_steps[8].icon);
	$("#hello").text("Hi,"+db_steps[8].nickname);
	$("#total_steps").text(db_steps[7].steps+"步");
	var data = {
		labels : ["1","2","3","4","5","6","7"],
		datasets : [
		{
			lineItemName : "test1",
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(200,200,200,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			data : [db_steps[0].steps,db_steps[1].steps,db_steps[2].steps,db_steps[3].steps,db_steps[4].steps,db_steps[5].steps,db_steps[6].steps]
		}
		]
	};				
	var chartLine = null;
	var ctx = document.getElementById("myChart").getContext("2d");
	chartLine = new Chart(ctx).Line(data);
	initEvent(chartLine, clickCall);
}
		
function clickCall(evt) {
	var point = chartLine.getPointSingleAtEvent(evt);					
	if ( point !== null )
		alert( point.label + ": " + point.lineItemName + " ____ " + point.value);
}
				
function initEvent(chart, handler) {
	var method = handler;
	var eventType = "click";
	var node = chart.chart.canvas;
									
	if (node.addEventListener) {
		node.addEventListener(eventType, method);
	} else if (node.attachEvent) {
		node.attachEvent("on" + eventType, method);
	} else {
		node["on" + eventType] = method;
	}
}

function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("/image/png");
	return image;
}