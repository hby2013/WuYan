    var express = require('express');
var wechat = require('wechat');
var tools = require('./tools');
var server = express.Router();
var message_module = require('./message_module');
var https = require('https'); 

var config = {
    token: tools.token,
    appid: tools.appid,
}

var ip_address = "59.66.139.103"

//database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/wechat');

server.use(express.query());
server.use('/', wechat(config).text(function(message, req, res, next){
  res.reply("text");
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
    query_steps_today(message, req, res, next);
  } else if (req.weixin.Event == 'CLICK' && req.weixin.EventKey == 'WALK_WEEK') {
    query_steps_week(message, req, res, next);
  } else if (req.weixin.Event == 'CLICK' && req.weixin.EventKey == 'SLEEP') {
    query_sleep_today(message, req, res, next);
  } else if (req.weixin.Event == 'CLICK' && req.weixin.EventKey == 'RANKING') {
    query_ranking(message, req, res, next);
  }else if (req.weixin.Event == 'CLICK' && req.weixin.EventKey == 'ACHIEVEMENTS') {
    get_info(message, req, res, next);
  }else {
	//get_info(message, req, res, next);
  }
}).middlewarify());

function query_steps_today(message, req, res, next) {
  var data_day = db.get('day');
    var steps;
    data_day.find({"username":message.FromUserName}, function(err,docs) {
      if(docs.length == 0) {
        steps = parseInt(Math.random() * 20000);
        var icon = '';
        get_icon_and_send_message(message, data_day, steps);
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
    data_week.find({"username":message.FromUserName}, function(err,docs) {
      if(docs.length == 0) {
        for(var i=0 ; i<7; i++) {
          steps[i] = parseInt(Math.random() * 20000);
        }
        data_week.insert({"username":message.FromUserName, 
                          "steps1":steps[0]+" ",
                          "steps2":steps[1]+" ",
                          "steps3":steps[2]+" ",
                          "steps4":steps[3]+" ",
                          "steps5":steps[4]+" ",
                          "steps6":steps[5]+" ",
                          "steps7":steps[6]+" "
                        });
        var reply_msg = '';
        for(var i=0; i<7; i++) {
          reply_msg += steps[i];
        }
        res.reply("");
        tools.customSendArticle(message.FromUserName, "本周运动趋势", "点击查看详细", "http://img.taopic.com/uploads/allimg/120410/9128-12041023430285.jpg", url);
      } else {
        var reply_message = '';
        reply_message += docs[0].steps1;
        reply_message += ' ';
        reply_message += docs[0].steps2;
        reply_message += ' ';
        reply_message += docs[0].steps3;
        reply_message += ' ';
        reply_message += docs[0].steps4;
        reply_message += ' ';
        reply_message += docs[0].steps5;
        reply_message += ' ';
        reply_message += docs[0].steps6;
        reply_message += ' ';
        reply_message += docs[0].steps7;
        res.reply("");
        tools.customSendArticle(message.FromUserName, "本周运动趋势", "点击查看详细", "http://img.taopic.com/uploads/allimg/120410/9128-12041023430285.jpg", url);
      }
    });
}

function query_sleep_today(message, req, res, next) {
  message_module.send_sleep_module(message.FromUserName, '7.5');
  res.reply('');
}

function query_ranking(message, req, res, next) {
  var url = "http://"+ip_address+"/ranking/"+message.FromUserName;
  tools.customSendArticle(message.FromUserName, "本日运动排行榜", "点击查看详细", "http://img.taopic.com/uploads/allimg/120410/9128-12041023430285.jpg", url);
  res.reply('');
}

function get_icon_and_send_message(message, data_day, steps) {
  var options = {
    hostname: 'api.weixin.qq.com',
    port: 443,
    path: '/cgi-bin/token?grant_type=client_credential&appid='+tools.appid+'&secret='+tools.appsec,
    method: 'GET'
  };

  var access_token;
  var icon_url;

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
          data_day.insert({"username":message.FromUserName, "steps":steps+"", "icon":icon_url});
          message_module.send_walk_module(message.FromUserName, steps);
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
