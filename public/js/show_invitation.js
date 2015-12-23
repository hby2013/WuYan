function loadJScript() {
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "http://api.map.baidu.com/api?v=1.5&ak=56hSBkT6lEQ5hWlVLRgnqnLY&callback=init";
	document.body.appendChild(script);
}

var map;
function init() {
	map = new BMap.Map("map_container");            // 创建Map实例
	var point = new BMap.Point(116.404, 39.915); // 创建点坐标
	map.centerAndZoom(point,15);                 
	map.enableScrollWheelZoom();                 //启用滚轮放大缩小
    get_info();
}  

var invitation_info = new Object(); 
var invitation_id;
function get_info(){
    var thisURL = document.URL;    
    var getval =thisURL.split('?')[1];  
    invitation_id = getval.split("=")[1]; 
    $.ajax({
        type:'post',
        url:"/get_invitation_info",
        data:{"invitation_id":invitation_id},
        dataType:"json",
        success:
            function(json_data) { 
                    console.log(json_data);
                    invitation_info.openid = json_data.openid1;
                    invitation_info.nickname1 = json_data.nickname1;
                    invitation_info.nickname2 = json_data.nickname2;                    
                    invitation_info.icon = json_data.icon;            
                    invitation_info.time = json_data.time;            
                    invitation_info.longitude =  json_data.longitude
                    invitation_info.latitude = json_data.latitude;            
                    invitation_info.place = json_data.place;
                    invitation_info.postscript = json_data.postscript; 
                    invitation_info.similarity = json_data.similarity;
                    var invitation_point = new BMap.Point(parseFloat(invitation_info.longitude),parseFloat(invitation_info.latitude));
                    console.log(invitation_point);
                    var invitation_marker = new BMap.Marker(invitation_point);
                    map.addOverlay(invitation_marker);
                    map.centerAndZoom(invitation_point,15); 
                    $("#header")[0].src = invitation_info.icon;
                    $('#header').tipso({
                        useTitle: false,
                        position: 'right',
                        background: 'tomato',
                        hidedelay:1000000,
                        content:"我叫"+invitation_info.nickname1+"，我们的相似度为"+invitation_info.similarity+"%，"+invitation_info.postscript+"，"+invitation_info.time+"，我们一起在"+invitation_info.place+"运动吧~ ",
                    });
                    $('#header').tipso('show');
            }  
    });
}

function deal_with_invitation(i){
    if(i==1){
        if(window.confirm('你确定要同意'+invitation_info.nickname1+'的邀请吗？')){    
            $.ajax({
                type:'post',
                url:"/deal_with_invitation",
                data:{"invitation_id":invitation_id,"openid":invitation_info.openid,"nickname":invitation_info.nickname2,"invitation_status":"1"},
                dataType:"json",
                success:function(){
                }
            });
            WeixinJSBridge.invoke('closeWindow',{},function(res){
            });
        }else{
            return false;
        }
    }
    else{
        if(window.confirm('你确定要拒绝'+invitation_info.nickname1+'的邀请吗？')){   
            $.ajax({
                type:'post',
                url:"/deal_with_invitation",
                data:{"invitation_id":invitation_id,"openid":invitation_info.openid,"nickname":invitation_info.nickname2,"invitation_status":"2"},
                dataType:"json",
                success:function(){
                }
            });
            WeixinJSBridge.invoke('closeWindow',{},function(res){
            });
        }else{
            return false;
        }
        
    }
}


window.onload = loadJScript;  //异步加载地图