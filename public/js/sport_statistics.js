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