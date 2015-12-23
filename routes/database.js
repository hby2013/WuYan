var https = require('https'); 
var http = require('http'); 
var tools = require('./tools');
var message_module = require('./message_module');
var database = {};
var time = 1000;
//console.log("2"+tools.access_token);


function get_user_info(db, openid, i, access_token){
    var basic = db.get('basic');
    var travel_world = db.get('travel_world');
    var shopping = db.get("shopping");
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
            basic.find({"openid":openid}, function(err,docs) {
                if(docs.length == 0){
                    var last_step = parseInt(Math.random()*20000);
                    basic.insert({"userid":(i+""),"openid":openid,"nickname":info.nickname,"icon":info.icon,"height":0,"weight":0,"sex":"male","coins":100, "latitude":40.007+Math.random()/100, "longitude":116.315+Math.random()/100});
                    travel_world.insert({"userid":(i+""),"openid":openid,"last_step":last_step,"now_step":20000+parseInt(Math.random()*15000),"trans_step":last_step,"f_vehicle":"shoes","vehicle":"nothing"})
                    shopping.insert({"userid":(i+""),"openid":openid,"attention":100,"near_map":1})
                    var today = new Date();
                    today.setDate(today.getDate()-tools.previousDays+1);
                    for(var j=0;j<7;j++){
                        today.setDate(today.getDate()-1);
                        var search_day = today.toLocaleDateString().replace(/-/g,"\/");
                        get_day_data(db, openid, i+"", search_day);
                    }
                }

                //basic.insert({"userid":(i+""),"openid":openid,"nickname":info.nickname,"icon":info.icon,"height":160,"weight":150,"sex":"male","coins":0,"distance":0})
            });
        });
    });
    reqs.end();

    reqs.on('error', function(e) {
        console.error(e);
    });
}

function get_day_data(db, openid, userid, day){
    var day_data = db.get('day_data');
    day_data.find({"openid":openid, "date":new Date(day)}, function(err,docs) {
        if(docs.length == 0){
            day_data.insert({"userid":userid,"openid":openid,"date":new Date(day),"steps":2000+parseInt(Math.random()*500),"sleep_time":360+parseInt(Math.random()*200),"calories":3000+parseInt(Math.random()*5000),"sport_time":100+parseInt(Math.random()*100)});
        }
    });
    //day_data.insert({"userid":(i+""),"openid":openid,"date":new Date("2015/12/03"),"steps":0,"sleep_time":0,"calories":0});
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
    add_user(db);
}

database.add_day_data = function (db){
    var basic = db.get('basic');
    //var today = new Date();
    basic.find({}, function(err,docs) {
        for (var i=0;i<docs.length;i++){
            var today = new Date();
            today.setDate(today.getDate()+1);
            for(var j=0;j<7;j++){
                today.setDate(today.getDate()-1);
                var search_day = today.toLocaleDateString().replace(/-/g,"\/");
                get_day_data(db, docs[i].openid, docs[i].userid, search_day);
            }
        }
    });
    /*var access_token;
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
*/
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

database.add_location = function(db){
    var basic = db.get('basic');
    basic.find({}, function(err,docs) {
        for(var i = 0; i < docs.length; i++)
        {
            basic.update({"userid":docs[i].userid},{$set:{"latitude":40+Math.random()/100}});
            basic.update({"userid":docs[i].userid},{$set:{"longitude":116.3+Math.random()/100}});
        }
    });
}

function add_user(db){
    //time = time + 2000;
    console.log(time);
    var basic = db.get('basic');
    //basic_len = len;
    var access_token;
    var userlist = [];
    var tag;
    var basic_len;

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
                    basic.find({}, function(err,docs) {
                        basic_len = docs.length;
                        //tag = true;
                        for (var i=0;i<userlist.length;i++){
                            tag = true;
                            for(var j=0; j<docs.length;j++){
                                if(userlist[i] == docs[j].openid){
                                    tag = false;
                                    break;
                                }
                            }
                            if(tag == true){
                                basic_len++;
                                get_user_info(db, userlist[i], basic_len-1, access_token);
                            }
                        }
                    });
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

module.exports = database;