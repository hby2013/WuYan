var message_module = {};
var express = require('express');
var wechat = require('wechat');
var tools = require('./tools');
var server = express.Router();
var https = require('https'); 

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

        "template_id":"8oQdCR541Bn7soezK1fNU05ks8o8cZOrEc-DLSCUTk4",
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
    //console.log(data);  

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

        "template_id":"fpa-6VQ6IGJTVRtfedAxvjOdAl57I7zsR3rbrNd35z4",
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
    //console.log(data);  

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

module.exports = message_module;
