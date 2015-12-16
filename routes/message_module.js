var message_module = {};
var express = require('express');
var wechat = require('wechat');
var tools = require('./tools');
var server = express.Router();
var https = require('https'); 

var access_token;
var ip_address = "59.66.139.62";

tools.get_access_token();

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = " : ";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
	var minute = date.getMinutes();
	if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
    }
    var currentdate = date.getHours() + seperator2 + minute
            + seperator2 + date.getSeconds();
    return currentdate;
}



message_module.send_walk_module = function(open_id, steps){
		var current_time = getNowFormatDate();
	    var model_info = {

        "touser":open_id,

        "template_id":"M8Rqa49rku0CE5bXh-CxS5e8Q1zdmNKWKauVpZErz6U",
        "url":"http://weixin.qq.com/download",

        "topcolor":"green",

        "data":{

            "steps": {
                "value": steps,
				"color":"red",
            },
			
			"currenttime": {
                "value": current_time,
				"color":"blue",     
            }
       }

    };
  
	
    var data = JSON.stringify(model_info);
    console.log(data);  
    console.log(tools.access_token);
    var opt = {  
        method: "POST",  
        host: "api.weixin.qq.com",    
        path: "/cgi-bin/message/template/send?access_token=" + tools.access_token,  
        headers: {  
            "Content-Type": 'application/json',  
            "Content-Length": data.length  
        }  
    };  
    //console.log("1\n");
    var req = https.request(opt, function (serverFeedback) {  
        if (serverFeedback.statusCode == 200) {  
            var body = "";  
            serverFeedback.on('data', function (data) { body += data; });
        }  
        else {  
            res.send(500, "error");  
        }  
    });  
    req.write(data+'\n');  
    req.end();  
}

message_module.send_sleep_module = function(open_id, sleep){
  var model_info = {

        "touser":open_id,

        "template_id":"ySqnKLna6Z8rwRscEPQAfHolyFwI92w4MQFQqBqWerU",
        "url":"http://weixin.qq.com/download",

        "topcolor":"#FF0000",

        "data":{

            "sleep_time": {
                "value":sleep,
                "color":"red",
            }
       }

    };
  
    var data = JSON.stringify(model_info);
    console.log(data);  

    var opt = {  
        method: "POST",  
        host: "api.weixin.qq.com",    
        path: "/cgi-bin/message/template/send?access_token=" + tools.access_token,  
        headers: {  
            "Content-Type": 'application/json',  
            "Content-Length": data.length  
        }  
    };  
    //console.log("1\n");
    var req = https.request(opt, function (serverFeedback) {  
        if (serverFeedback.statusCode == 200) {  
            var body = "";  
            serverFeedback.on('data', function (data) { body += data; });
        }  
        else {  
            res.send(500, "error");  
        }  
    });  
    req.write(data+'\n');  
    req.end();
}

message_module.send_invitation_module = function(res, openid, nickname, time, place, invitation_id){
  var model_info = {

        "touser":openid,

        "template_id":"7QMd1MLO1X2lQSlsJEnsVqAAzlkDmhqTha6ZzfqEBi4",
        "url":ip_address+"/show_invitation.html?invitation_id="+invitation_id,

        "topcolor":"#FF0000",

        "data":{

            "nickname": {
                "value":nickname,
                "color":"red",
            },
            
            "time": {
                "value":time,
                "color":"green",
            },
            
            "place":{
                "value":place,
                "color":"brown",
            }
            
       }

    };
  
    var data = JSON.stringify(model_info);
    console.log(data);  
    var opt = {  
        method: "POST",  
        host: "api.weixin.qq.com",    
        path: "/cgi-bin/message/template/send?access_token=" + tools.access_token,  
        headers: {  
            "Content-Type": 'application/json',  
            "Content-Length": data.length  
        }  
    };  
    var req = https.request(opt, function (serverFeedback) {  
        if (serverFeedback.statusCode == 200) {  
            var body = "";  
            serverFeedback.on('data', function (data) { body += data; })
        }  
        else {  
            res.send(500, "error");  
        }  
    });  
    req.write(data+'\n');  
    req.end();
}

module.exports = message_module;
