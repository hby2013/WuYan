var https = require('https'); 
var http = require('http'); 
var tools = require('./tools');
var message_module = require('./message_module');

var database = {};
//console.log("2"+tools.access_token);


function get_user_info(db, openid, i, access_token){
    var basic = db.get('basic');
    var info ={};

    var option = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/user/info?access_token='+access_token+'&openid='+openid,
        method: 'GET'
    };
    var reqs = https.request(option, function(res) {
        res.on('data', function(d) {
            info.nickname = eval('('+d+')').nickname;
            info.icon = eval('('+d+')').headimgurl;
            basic.find({}, function(err,docs) {
                basic.insert({"userid":(i+""),"openid":openid,"nickname":info.nickname,"icon":info.icon,"height":160,"weight":150,"sex":"male","coins":0,"distance":0})
            });
        });
    });
    reqs.end();

    reqs.on('error', function(e) {
        console.error(e);
    });
}

function get_day_data(db, openid, i, access_token){
    var day_data = db.get('day_data');
    day_data.insert({"userid":(i+""),"openid":openid,"date":new Date("2015/12/03"),"steps":0,"sleep_time":0,"calories":0});
}

function add_single_detail(db, userid, openid, myDate){
    var today = myDate.toLocaleDateString().replace(/\//g,"-");
    myDate.setDate(myDate.getDate()-6);
    var beginDate = myDate.toLocaleDateString().replace(/\//g,"-");
    var options = {
    hostname: 'wrist.ssast2015.com',
    port: 443,
    path: '/bongdata/?startTime='+beginDate+'%2000:00:00&endTime='+today+'%2000:00:00&user='+userid,
    method: 'GET'
  };

  var req = http.request(options, function(res) {
    res.on('data', function(d) {
      console.log(eval('('+d[0]+')').startTime);
      //console.log(tools.access_token);
    });
  });
  req.end();

  req.on('error', function(e) {
    console.error(e);
  });
    
}

database.adduser = function (db){
    var basic = db.get('basic');
    var access_token;
    var userlist = [];

    var options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/token?grant_type=client_credential&appid='+tools.appid+'&secret='+tools.appsec,
        method: 'GET'
    };

    var req = https.request(options, function(res) {
        res.on('data', function(d) {
            access_token = eval('('+d+')').access_token;
            //console.log(access_token+"hby");
            var option = {
                hostname: 'api.weixin.qq.com',
                port: 443,
                //https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=NEXT_OPENID
                path: '/cgi-bin/user/get?access_token='+access_token,
                method: 'GET'
            };
            var reqs = https.request(option, function(res) {
                res.on('data', function(d) {
                    userlist = eval('('+d+')').data.openid;
                    for (var i=0;i<userlist.length;i++){
                        get_user_info(db, userlist[i], i, access_token);
                    }
                });
            });
            reqs.end();

            reqs.on('error', function(e) {
                console.error(e);
            });
        });
    });
    req.end();

    req.on('error', function(e) {
        console.error(e);
    });
    for (var i=0;i<userlist.length;i++){
        //get_user_info(db, userlist[i], i);
        //basic.insert({"userid":(i+""),"openid":userlist[i],"nickname":info.nickname,"icon":info.icon,"height":"160","weight":"150","sex":"male","coins":"0","distance":"-1"})
        //console.log(info);
    }
    //basic.insert({"userid":"-1","openid":"-2","nickname":"fneowqiou","icon":"asdffdsa","height":"160","weight":"150","sex":"male","coins":"0","distance":"-1"})
}

database.add_day_data = function (db){
    var basic = db.get('basic');
    var access_token;
    var userlist = [];

    var options = {
        hostname: 'api.weixin.qq.com',
        port: 443,
        path: '/cgi-bin/token?grant_type=client_credential&appid='+tools.appid+'&secret='+tools.appsec,
        method: 'GET'
    };

    var req = https.request(options, function(res) {
        res.on('data', function(d) {
            access_token = eval('('+d+')').access_token;
            //console.log(access_token+"hby");
            var option = {
                hostname: 'api.weixin.qq.com',
                port: 443,
                //https://api.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=NEXT_OPENID
                path: '/cgi-bin/user/get?access_token='+access_token,
                method: 'GET'
            };
            var reqs = https.request(option, function(res) {
                res.on('data', function(d) {
                    userlist = eval('('+d+')').data.openid;
                    for (var i=0;i<userlist.length;i++){
                        get_day_data(db, userlist[i], i, access_token);
                    }
                });
            });
            reqs.end();

            reqs.on('error', function(e) {
                console.error(e);
            });
        });
    });
    req.end();

    req.on('error', function(e) {
        console.error(e);
    });
}

database.add_walk_detail = function(db){
    var basic = db.get('basic');
    var myDate = new Date();
    basic.find({}, function(err,docs) {
        for(var i = 0; i < docs.length; i++)
        {
            var userid = docs[i].userid;
            var openid = docs[i].openid;
            add_single_detail(db, userid, openid, myDate);
        }
    });
}

module.exports = database;