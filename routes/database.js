var https = require('https'); 
var tools = require('./tools');


var database = {};

function get_user_info(db, openid){
    var basic = db.get('basic');
    var access_token;
    var info ={};

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
                path: '/cgi-bin/user/info?access_token='+access_token+'&openid='+openid,
                method: 'GET'
            };
            var reqs = https.request(option, function(res) {
                res.on('data', function(d) {
                    info.nickname = eval('('+d+')').nickname;
                    info.icon = eval('('+d+')').headimgurl;
                    console.log(info);
                    basic.find({}, function(err,docs) {
                        basic.insert({"userid":(docs.length+""),"openid":openid,"nickname":info.nickname,"icon":info.icon,"height":"160","weight":"150","sex":"male","coins":"0","distance":"-1"})
                    });
                    //return info;
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

database.adduser = function (db){
    var basic = db.get('basic');
    var userlist = ["oFfkHw4eCUQAwW4FSEvDH4yat-l4"]
    for (var i=0;i<userlist.length;i++){
        get_user_info(db, userlist[i]);
        //basic.insert({"userid":(i+""),"openid":userlist[i],"nickname":info.nickname,"icon":info.icon,"height":"160","weight":"150","sex":"male","coins":"0","distance":"-1"})
        //console.log(info);
    }
    //basic.insert({"userid":"-1","openid":"-2","nickname":"fneowqiou","icon":"asdffdsa","height":"160","weight":"150","sex":"male","coins":"0","distance":"-1"})
}

module.exports = database;