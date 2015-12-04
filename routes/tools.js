var tools = {};
var API = require("wechat-api");
var request = require("request");
var fs = require("fs");
var path = require("path");
var https = require('https'); 

tools.token = "hby13";
tools.appid = "wx04f3330c621e1dec";
tools.appsec = "d4624c36b6795d1d99dcf0547af5443d"; 
tools.ip = "127.0.0.1";
tools.access_token = "";

var custom_url = "https://api.weixin.qq.com/cgi-bin/message/custom/send";
var device_url = "https://api.weixin.qq.com/device/";
var access_token = "";
var latest_time = 0;

var api = new API(tools.appid, tools.appsec);

var wrapper = function(callback){
   return function(err, data){
      callback = callback || function () {};
      if(err){
	err.name = "WeChatAPI" + err.name;
	return callback(err, data);      }
      if(data && data.errcode){
	err = new Error(data.errmsg);
	err.name = "WeChatAPIError";
	err.code = data.errcode;
	return callback(err, data);
      }
       callback(null, data);
   };
};

var postJSON = function(data){
   return {
	dataType: "json",
	type: "POST",
	data: data,
	headers: {
	  "Content-Type": "application/json"
	}
   };
};


tools.get_access_token = function(){
  var options = {
    hostname: 'api.weixin.qq.com',
    port: 443,
    path: '/cgi-bin/token?grant_type=client_credential&appid='+tools.appid+'&secret='+tools.appsec,
    method: 'GET'
  };

  var req = https.request(options, function(res) {
  //console.log("statusCode: ", res.statusCode);
  //console.log("headers: ", res.headers);

    res.on('data', function(d) {
    //process.stdout.write(d);
    //var ss = d;
      tools.access_token = eval('('+d+')').access_token;
      //console.log(tools.access_token);
    });
  });
  req.end();

  req.on('error', function(e) {
    console.error(e);
  });
}


tools.menuCreate = function(menu, callback){
    api.createMenu(menu, callback);
};

tools.menuQuery = function(callback){
    api.getMenu(callback);
};

tools.menuDelete = function(callback){
    api.remove(callback);
};

tools.getToken = function(callback){
    request("http://wx.chendaxixi.me/token",function(err, res, body){
        callback(err, body);
    });
};

tools.getMToken = function(callback){
    if(access_token == "" || new Date.now() > latest_time - 20000){
	api.getLatestToken(function(err, result){
	    access_token = result.accessToken;
	    latest_time = result.expireTime;
	    callback(null, access_token);
	});
    } else {
	callback(null, access_token);
    } 
};

tools.uploadMedia = function(type, filename, callback){
    tools.getMToken(function(err, token){
	if(err){ 
	    callback(err, null);
	    return;
        }
	var url = "https://api.weixin.qq.com/cgi-bin/media/upload?access_token=" + token + "&type=" + type;
	var r = request.post(url, function(err, res, data){
	    callback(err, data);
	});
	var form = r.form();
	form.append("files", fs.createReadStream(filename));
    });
};

tools.customSendText = function(user, content, callback){
    api.sendText(user, content, callback);
};

tools.customSendImageByName = function(user, filename, callback){
    tools.uploadMedia("image", filename, function(err, result){
	api.sendImage(user, JSON.parse(result).media_id, callback);
    });
};

tools.customSendImage = function(user, mediaId, callback){
   api.sendImage(user, mediaId, callback);
};

tools.customSendVoice = function(user, mediaId, callback){
   api.sendVoice(user, mediaId, callback);
};

tools.customSendVideoByName = function(user, filename, callback){
   tools.uploadMedia("video", filename, function(err, result){
	api.sendVideo(user, JSON.parse(result).media_id, callback);
   });
};

tools.customSendVideo = function(user, mediaId, callback){
   api.sendVideo(user, mediaId, callback);
};

tools.customSendArticle = function(user, title, description, image, url, callback){
   var articles = [{
     "title": title,
     "description": description,
     "picurl": image,
     "url": url
   }];
   api.sendNews(user, articles, callback);
};

tools.customSendArticles = function(user, articles, callback){
   api.sendNews(user, articles, callback);
};

tools.getStat = function(device_id, callback){
   tools.getToken(function(err, token){
	var url = device_url + "get_stat?access_token=" + token + "&device_id=" + device_id;
        api.request(url, {dataType: "json"}, wrapper(callback));
   });
};

tools.getOpenId = function(device_type, device_id, callback){
   tools.getToken(function(err, token){
	var url = device_url + "get_openid?access_token=" + token + "&device_type=" + device_type + "&device_id=" + device_id;
	api.request(url, {dataType: "json"}, wrapper(callback));
   });
};

tools.getBindDevice = function(openid, callback){
   tools.getToken(function(err, token){
        var url = device_url + "get_bind_device?access_token=" + token + "&openid=" + openid;
        api.request(url, {dataType: "json"}, wrapper(callback));
   });
};

tools.transMsg = function(device_type, device_id, user, content, callback){
   tools.getToken(function(err, token){
        var url = device_url + "transmsg?access_token=" + token;
	var info = {
	  "device_type": device_type,
	  "device_id": device_id,
	  "open_id": user,
	  "content": new Buffer(content).toString('base64')
        };
        api.request(url, postJSON(info), wrapper(callback));
   });
};

module.exports = tools;
