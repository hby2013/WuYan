var express = require('express');
var wechat = require('wechat');
var tools = require('./tools');
var server = express.Router();
var message_module = require('./message_module');
var attention = require('./attention');
var https = require('https'); 
var database = require("./database");
var config = {
    token: tools.token,
    appid: tools.appid,
}

var ip_address = tools.ip;


//database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/wechat');

server.use(express.query());
server.use('/', wechat(config).text(function(message, req, res, next){
  response_text(message, req, res, next);
}).image(function(message, req, res, next){
  res.reply("image");
}).voice(function(message, req, res, next){
  res.reply("voice");
}).location(function(message, req, res, next){
  res.reply("location");
}).link(function(message, req, res, next){
  res.reply("link");
}).event(function(message, req, res, next){
  if(req.weixin.Event == 'CLICK' && req.weixin.EventKey == 'WALK_TODAY') {
    console.log("click");
    query_steps_today(message, req, res, next);
  } else if (req.weixin.Event == 'CLICK' && req.weixin.EventKey == 'WALK_WEEK') {
    query_steps_week(message, req, res, next);
  } else if (req.weixin.Event == 'CLICK' && req.weixin.EventKey == 'SLEEP') {
    query_sleep_today(message, req, res, next);
  } else if (req.weixin.Event == 'CLICK' && req.weixin.EventKey == 'RANKING') {
    query_ranking(message, req, res, next);
  }else if (req.weixin.Event == 'CLICK' && req.weixin.EventKey == 'ATTENTION') {
    query_attention(message, req, res, next);
  }else if (req.weixin.Event == 'CLICK' && req.weixin.EventKey == 'ACHIEVEMENTS') {
    get_info(message, req, res, next);
  }else {
    //res.reply("imdddage");
	  database.adduser(db);
    //res.reply("image");
  }
}).middlewarify());

function input_location(message){
    var data = db.get('location');
    get_icon_and_send_message(message, data, [], 3);
}

function response_text(message, req, res, next){
  var my_text = message.Content;
  var sender_no = parseInt(my_text.substring(0,my_text.length-1));
  var special_sender_no = parseInt(my_text.substring(1,my_text.length));
  //console.log(sender_no);
  if(my_text.length > 1 && (attention.meg_tags())[sender_no] == 0){
    //console.log("attention");
    if(my_text.substring(my_text.length-1,my_text.length)=="y"){
      var response = "'"+(attention.receiver_nicknames())[sender_no]+"'同意了你的关注";
      tools.customSendText((attention.senders())[sender_no],response);
      attention.set_meg_tags(sender_no, 1);
      attention.insert_attentionship(sender_no);
    }
    else if(my_text.substring(my_text.length-1,my_text.length)=="n"){
      var response = "'"+(attention.receiver_nicknames())[sender_no]+"'拒绝了你的关注";
      tools.customSendText((attention.senders())[sender_no],response);
      attention.set_meg_tags(sender_no, 1);
    }
  }
  else if(my_text.length > 1 && (attention.special_meg_tags())[special_sender_no] == 0){
    //console.log("attention");
    if(my_text.substring(0,1)=="y"){
      var response = "'"+(attention.special_receiver_nicknames())[special_sender_no]+"'同意了你的特别关注";
      tools.customSendText((attention.special_senders())[special_sender_no],response);
      attention.set_special_meg_tags(special_sender_no, 1);
      attention.insert_special_attentionship(special_sender_no);
    }
    else if(my_text.substring(0,1)=="n"){
      var response = "'"+(attention.special_receiver_nicknames())[special_sender_no]+"'拒绝了你的关注";
      tools.customSendText((attention.special_senders())[special_sender_no],response);
      attention.set_special_meg_tags(special_sender_no, 1);
    }
  }
  res.reply("");
}

function query_steps_today(message, req, res, next) {
    var data_day = db.get('day_data');
    var today = new Date();
    today.setDate(today.getDate()-tools.previousDays);
    var search_day = today.toLocaleDateString().replace(/-/g,"\/");
    var steps;
    data_day.find({"openid":message.FromUserName, "date":new Date(search_day)}, function(err,docs) {
      if(docs.length == 0) {
      } else {
        message_module.send_walk_module(message.FromUserName, docs[0].steps);
      }
      res.reply("");
    });
}

function query_steps_week(message, req, res, next) {
    var data_week = db.get('week');
    var steps = [];
    var url = "http://"+ip_address+"/steps/"+message.FromUserName;
    tools.customSendArticle(message.FromUserName, "本周运动趋势", "点击查看详细", "http://img.taopic.com/uploads/allimg/120410/9128-12041023430285.jpg", url);
}

function query_sleep_today(message, req, res, next) {
    var data_day = db.get('day_data');
    var today = new Date();
    today.setDate(today.getDate()-3);
    var search_day = today.toLocaleDateString().replace(/-/g,"\/");
    var steps;
    data_day.find({"openid":message.FromUserName, "date":new Date(search_day)}, function(err,docs) {
      if(docs.length == 0) {
        steps = parseInt(Math.random() * 20000);
        var icon = '';
        get_icon_and_send_message(message, data_day, steps, 1);
      } else {
        message_module.send_sleep_module(message.FromUserName, docs[0].sleep_time);
      }
      res.reply("");
    });
}

function query_ranking(message, req, res, next) {
    var url = "http://"+ip_address+"/ranking/"+message.FromUserName;
    tools.customSendArticle(message.FromUserName, "本日运动排行榜", "点击查看详细", "http://img.taopic.com/uploads/allimg/120410/9128-12041023430285.jpg", url);
    res.reply('');
}

function query_attention(message, req, res, next) {
  var url = "http://"+ip_address+"/attention/"+message.FromUserName;
  tools.customSendArticle(message.FromUserName, "我的关注", "点击查看详细", "http://img.taopic.com/uploads/allimg/120410/9128-12041023430285.jpg", url);
  res.reply('');
}

function get_icon_and_send_message(message, database, steps, mode) {
    var options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/token?grant_type=client_credential&appid='+tools.appid+'&secret='+tools.appsec,
        method: 'GET'
    };
    
    var access_token;
    var icon_url;
    var nickname;
    console.log(message);
    var req = https.request(options, function(res) {
        res.on('data', function(d) {
        access_token = eval('('+d+')').access_token;
        var options1 = {
            hostname: 'api.weixin.qq.com',
            port: 443,
            path: '/cgi-bin/user/info?access_token='+access_token+'&openid='+message.FromUserName+'&lang=zh_CN',
            method: 'GET'
        };
    
        var req1 = https.request(options1, function(res) {
            res.on('data', function(d) {
            icon_url = eval('('+d+')').headimgurl;
            nickname = eval('('+d+')').nickname;
            if(mode == 1){
                database.insert({"username":message.FromUserName,"nickname": nickname,"steps":steps+"", "icon":icon_url});
                message_module.send_walk_module(message.FromUserName, steps);
            }
            else if(mode == 2){
                database.insert({"username":message.FromUserName,
                    "icon":icon_url,
                    "nickname":nickname,
                    "steps1":steps[0]+" ",
                    "steps2":steps[1]+" ",
                    "steps3":steps[2]+" ",
                    "steps4":steps[3]+" ",
                    "steps5":steps[4]+" ",
                    "steps6":steps[5]+" ",
                    "steps7":steps[6]+" "
                    });
            }
            else if(mode ==3){
                database.insert({"username":message.FromUserName,
                        "latitude":message.Latitude,
                        "longitude":message.Longitude
                    });
            }
            });
        });
        req1.end();
        });
    });
    req.end();  
}

function get_info(message, req, res, next){
	var url = "http://"+ip_address+"/info/"+message.FromUserName;
    tools.customSendArticle(message.FromUserName, "信息设置", "点击查看详细", "http://img.taopic.com/uploads/allimg/120410/9128-12041023430285.jpg", url);
    res.reply('');
}

module.exports = server;
