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
    var currentdate = date.getHours() + seperator2 + minute + seperator2 + date.getSeconds();
    return currentdate;
}



message_module.send_walk_module = function(open_id, steps){
		var current_time = getNowFormatDate();
	    var model_info = {

        "touser":open_id,

        "template_id":"C_L-8NaIkqDFlLMRYMbr63wJBMsvoKxm2ekOIvaVa_4",
        "url":"http://weixin.qq.com/download",

        "topcolor":"green",

        "data":{

            "steps": {
                "value": steps,
				"color":"red",
            },
			
			"current_time": {
                "value": current_time,
				"color":"blue",     
            }
       }

    };
  
	
    var data = JSON.stringify(model_info);

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
            serverFeedback.on('data', function (data) { body += data; });
        }  
        else {  
            res.send(500, "error");  
        }  
    });  
    req.write(data+'\n');  
    req.end();  
}

message_module.send_sleep_module = function(open_id, sleep_time){
  var model_info = {

        "touser":open_id,

        "template_id":"CFlHUYq63-ZlGxnXZmjysmkiV7qGIg_0Ave-3EfHNs0",
        "url":"http://weixin.qq.com/download",

        "topcolor":"#FF0000",

        "data":{

            "sleep_hour": {
                "value":parseInt(sleep_time / 60),
                "color":"red",
            },
            "sleep_min": {
                "value":sleep_time % 60,
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

message_module.send_invitation_module = function(openid, invitation_id){
  var model_info = {

        "touser":openid,

        "template_id":"RIRGHX5mhPJx6fgudj34n0nBHaTx5JhEWnWFXQpX_04",
        "url":tools.ip+"/show_invitation.html?invitation_id="+invitation_id,

        "topcolor":"#FF0000",

        "data":{

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
