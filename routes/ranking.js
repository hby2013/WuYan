var tools = require("./tools");

exports.ranking = function(db) {
	return function(req, res) {
        var openid = req.body.openid;
        getData(openid, db, res, 0);
        /*var user_col = db.get('basic');
		var day_col = db.get('day_data');
        var lat, lng;
        var distance;
        var near_user = [];
        var firstday = new Date();
        var lastday = new Date();
        firstday.setDate(firstday.getDate()-tools.previousDays-7);
        lastday.setDate(lastday.getDate()-tools.previousDays);
        var lastdayString = lastday.toLocaleDateString();
        var day_step = 0, day_clr = 0, day_sport_time = 0, week_step = 0, week_clr = 0, week_sport_time = 0;
        var myinfo = new Object();
        var ranking_info = new Object();
        var info;
        var flag = false;
        ranking_info.list = [];
        ranking_info.myid = openid;
        user_col.find({"openid":openid},function(err,docs) {
            lat = parseInt(docs[0].latitude);
            lng = parseInt(docs[0].longitude);
            user_col.find({},function(err,docs) {
                for(var i = 0; i < docs.length; i++) {
                    distance = getDistance(lat,lng,parseInt(docs[i].latitude),parseInt(docs[i].longitude));
                    if(distance < 5000 && docs[i].openid != openid) {
                        info = new Object();
                        info.openid = docs[i].openid;
                        info.icon = docs[i].icon;
                        info.nickname = docs[i].nickname;
                        info.similarity = 0;
                        info.week_clr = 0;
                        info.week_sport_time = 0;
                        info.week_step = 0;
                        near_user[near_user.length] = info;
                        //console.log(distance);
                    }
                }
                myinfo.week_clr = 0;
                myinfo.week_sport_time = 0;
                myinfo.week_step = 0;
                myinfo.day_clr = 1;
                myinfo.day_sport_time = 1;
                myinfo.day_step = 1;
                day_col.find({"openid":openid,"date":{'$gte':firstday,'$lte':lastday}}, function(err,docs) {
                    for(var i = 0; i < docs.length; i++) {
                        var str = docs[i].date.toLocaleDateString();
                        if(str == lastdayString) {
                            //console.log("11");
                            myinfo.day_step = docs[i].steps;
                            myinfo.day_sport_time = docs[i].sport_time;
                            myinfo.day_clr = docs[i].calories;
                        }
                        myinfo.week_clr += docs[i].calories;
                        myinfo.week_sport_time += docs[i].sport_time;
                        myinfo.week_step += docs[i].steps;
                    }
                    console.log("yaeh");
                    day_col.find({"date":{'$gte':firstday,'$lte':lastday}}, function(err,docs) {
                        for(var j = 0; j < docs.length; j++) {
                            for(var i = 0; i < near_user.length; i++) {
                                if(docs[j].openid == near_user[i].openid) {
                                    var str = docs[j].date.toLocaleDateString();
                                    if(str == lastdayString) {
                                        console.log("11");
                                        near_user[i].day_step = docs[j].steps;
                                        near_user[i].day_sport_time = docs[j].sport_time;
                                        near_user[i].day_clr = docs[j].calories;
                                    }
                                    near_user[i].week_clr += docs[j].calories;
                                    near_user[i].week_sport_time += docs[j].sport_time;
                                    near_user[i].week_step += docs[j].steps;
                                    break;
                                }
                            }
                        }
                        for(var i = 0; i < near_user.length; i++) {
                            //console.log(near_user[i]);
                            near_user[i].similarity = 6 - Math.abs(parseFloat(near_user[i].day_step) - parseFloat(myinfo.day_step)) / parseFloat(myinfo.day_step)
                                                        - Math.abs(parseFloat(near_user[i].day_clr) - parseFloat(myinfo.day_clr)) / parseFloat(myinfo.day_clr)
                                                        - Math.abs(parseFloat(near_user[i].day_sport_time) - parseFloat(myinfo.day_sport_time)) / parseFloat(myinfo.day_sport_time)
                                                        - Math.abs(parseFloat(near_user[i].week_clr) - parseFloat(myinfo.week_clr)) / parseFloat(myinfo.week_clr)
                                                        - Math.abs(parseFloat(near_user[i].week_sport_time) - parseFloat(myinfo.week_sport_time)) / parseFloat(myinfo.week_sport_time)
                                                        - Math.abs(parseFloat(near_user[i].week_step) - parseFloat(myinfo.week_step)) / parseFloat(myinfo.week_step);
                            near_user[i].similarity = (near_user[i].similarity/6.0*100).toFixed(2);
                            ranking_info.list[i] = near_user[i];
                            console.log(near_user[i]);
                        }   
                        ranking_info.list.sort(function(a,b){return parseInt(a.similarity) < parseInt(b.similarity)?1:-1});
                        res.render('ranking_list', {ranking_info : ranking_info});
                    });
                });
            });
        });*/
	}
};

var EARTH_RADIUS = 6378137.0; //单位M 
var PI = Math.PI;

function getRad(d){ 
    return d*PI/180.0; 
} 

function getDistance(lat1,lng1,lat2,lng2){ 
    var radLat1 = getRad(lat1); 
    var radLat2 = getRad(lat2); 
    var a = radLat1 - radLat2; 
    var b = getRad(lng1) - getRad(lng2); 
    var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2))); 
    s = s*EARTH_RADIUS; 
    s = Math.round(s*10000)/10000.0; 
    return s; 
} 

exports.get_ranking_info = function(db) {
    return function(req, res) {
        var openid = req.body.openid;
        getData(openid, db, res, 1);
        /*var user_col = db.get('basic');
		var day_col = db.get('day_data');
		var openid = req.body.openid;
        var lat, lng;
        var distance;
        var near_user = [];
        var today = new Date().setHours(0,0,0,0);
        var day_step = 0, day_clr = 0, day_sport_time = 0, week_step = 0, week_clr = 0, week_sport_time = 0;
        var myinfo = new Object();
        var info;
        var flag = false;
        console.log(openid);
        user_col.find({"openid":openid},function(err,docs) {
            lat = parseInt(docs[0].latitude);
            lng = parseInt(docs[0].longitude);
            user_col.find({},function(err,docs) {
                for(var i = 0; i < docs.length; i++) {
                    distance = getDistance(lat,lng,parseInt(docs[i].latitude),parseInt(docs[i].longitude));
                    if(distance < 5000) {
                        info = new Object();
                        info.openid = docs[i].openid;
                        info.icon = docs[i].icon;
                        info.nickname = docs[i].nickname;
                        info.similarity = 0;
                        info.data = [0,0,0,0,0,0];
                        info.latitude = docs[i].latitude;
                        info.longitude = docs[i].longitude;
                        near_user[near_user.length] = info;
                    }
                }
                myinfo.week_clr = 0;
                myinfo.week_sport_time = 0;
                myinfo.week_step = 0;
                myinfo.day_clr = 1;
                myinfo.day_sport_time = 1;
                myinfo.day_step = 1;
                day_col.find({"openid":openid,"date":{'$gte':new Date(new Date(today).setDate(new Date(today).getDate()-7)),'$lte':new Date(today)}}, function(err,docs) {
                    for(var i = 0; i < docs.length; i++) {
                        if(docs[i].date.getTime() == new Date(today).getTime()) {
                            myinfo.day_step = parseInt(docs[i].steps);
                            myinfo.day_sport_time = parseInt(docs[i].sport_time);
                            myinfo.day_clr = parseInt(docs[i].calories);
                        }
                        myinfo.week_clr += parseInt(docs[i].calories);
                        myinfo.week_sport_time += parseInt(docs[i].sport_time);
                        myinfo.week_step += parseInt(docs[i].steps);
                    }
                    day_col.find({"date":{'$gte':new Date(new Date(today).setDate(new Date(today).getDate()-7)),'$lte':new Date(today)}}, function(err,docs) {
                        for(var j = 0; j < docs.length; j++) {
                            for(var i = 0; i < near_user.length; i++) {
                                if(docs[j].openid == near_user[i].openid) {
                                    near_user[i].data[5] = 1;
                                    near_user[i].data[3] = 1;
                                    near_user[i].data[1] = 1;
                                    if(docs[j].date.getTime() == new Date(today).getTime()) {
                                        near_user[i].data[3] = parseInt(docs[j].steps);
                                        near_user[i].data[1] = parseInt(docs[j].sport_time);
                                        near_user[i].data[5] = parseInt(docs[j].calories);
                                    }
                                    near_user[i].data[4] += parseInt(docs[j].calories);
                                    near_user[i].data[0] += parseInt(docs[j].sport_time);
                                    near_user[i].data[2] += parseInt(docs[j].steps);
                                    break;
                                }
                            }
                        }
                        for(var i = 0; i < near_user.length; i++) {
                            near_user[i].similarity = 6 - Math.abs(parseFloat(near_user[i].data[3]) - parseFloat(myinfo.day_step)) / parseFloat(myinfo.day_step)
                                                        - Math.abs(parseFloat(near_user[i].data[5]) - parseFloat(myinfo.day_clr)) / parseFloat(myinfo.day_clr)
                                                        - Math.abs(parseFloat(near_user[i].data[1]) - parseFloat(myinfo.day_sport_time)) / parseFloat(myinfo.day_sport_time)
                                                        - Math.abs(parseFloat(near_user[i].data[4]) - parseFloat(myinfo.week_clr)) / parseFloat(myinfo.week_clr)
                                                        - Math.abs(parseFloat(near_user[i].data[0]) - parseFloat(myinfo.week_sport_time)) / parseFloat(myinfo.week_sport_time)
                                                        - Math.abs(parseFloat(near_user[i].data[2]) - parseFloat(myinfo.week_step)) / parseFloat(myinfo.week_step);
                            near_user[i].similarity = (near_user[i].similarity/6.0*100).toFixed(2);
                            console.log(near_user[i].similarity);
                        }   
                        near_user.sort(function(a,b){return parseInt(a.similarity) < parseInt(b.similarity)?1:-1});
                        res.send(JSON.stringify(near_user));
                    });
                });
            });
        });*/
    }
};

function getData(openid, db, res, tag){
    var user_col = db.get('basic');
    var day_col = db.get('day_data');
    var lat, lng;
    var distance;
    var near_user = [];
    var firstday = new Date();
    var lastday = new Date();
    firstday.setDate(firstday.getDate()-tools.previousDays-7);
    lastday.setDate(lastday.getDate()-tools.previousDays);
    var lastdayString = lastday.toLocaleDateString();
    var day_step = 0, day_clr = 0, day_sport_time = 0, week_step = 0, week_clr = 0, week_sport_time = 0;
    var myinfo = new Object();
    var ranking_info = new Object();
    var info;
    var flag = false;
    ranking_info.list = [];
    ranking_info.myid = openid;
    user_col.find({"openid":openid},function(err,docs) {
        lat = parseInt(docs[0].latitude);
        lng = parseInt(docs[0].longitude);
        myinfo.openid = openid;
        myinfo.icon = docs[0].icon;
        myinfo.nickname = docs[0].nickname;
        myinfo.similarity = 100;
        myinfo.latitude = docs[0].latitude;
        myinfo.longitude = docs[0].longitude;
        user_col.find({},function(err,docs) {
            for(var i = 0; i < docs.length; i++) {
                distance = getDistance(lat,lng,parseInt(docs[i].latitude),parseInt(docs[i].longitude));
                if(distance < 5000 && docs[i].openid != openid) {
                    info = new Object();
                    info.openid = docs[i].openid;
                    info.icon = docs[i].icon;
                    info.nickname = docs[i].nickname;
                    info.similarity = 0;
                    info.week_clr = 0;
                    info.week_sport_time = 0;
                    info.week_step = 0;
                    info.longitude = docs[i].longitude;
                    info.latitude = docs[i].latitude;
                    near_user[near_user.length] = info;
                    //console.log(distance);
                }
            }
            myinfo.week_clr = 0;
            myinfo.week_sport_time = 0;
            myinfo.week_step = 0;
            myinfo.day_clr = 1;
            myinfo.day_sport_time = 1;
            myinfo.day_step = 1;
            day_col.find({"openid":openid,"date":{'$gte':firstday,'$lte':lastday}}, function(err,docs) {
                for(var i = 0; i < docs.length; i++) {
                    var str = docs[i].date.toLocaleDateString();
                    if(str == lastdayString) {
                        //console.log("11");
                        myinfo.day_step = docs[i].steps;
                        myinfo.day_sport_time = docs[i].sport_time;
                        myinfo.day_clr = docs[i].calories;
                    }
                    myinfo.week_clr += docs[i].calories;
                    myinfo.week_sport_time += docs[i].sport_time;
                    myinfo.week_step += docs[i].steps;
                }
                console.log("yaeh");
                day_col.find({"date":{'$gte':firstday,'$lte':lastday}}, function(err,docs) {
                    for(var j = 0; j < docs.length; j++) {
                        for(var i = 0; i < near_user.length; i++) {
                            if(docs[j].openid == near_user[i].openid) {
                                var str = docs[j].date.toLocaleDateString();
                                if(str == lastdayString) {
                                    console.log("11");
                                    near_user[i].day_step = docs[j].steps;
                                    near_user[i].day_sport_time = docs[j].sport_time;
                                    near_user[i].day_clr = docs[j].calories;
                                }
                                near_user[i].week_clr += docs[j].calories;
                                near_user[i].week_sport_time += docs[j].sport_time;
                                near_user[i].week_step += docs[j].steps;
                                break;
                            }
                        }
                    }
                    for(var i = 0; i < near_user.length; i++) {
                        //console.log(near_user[i]);
                        near_user[i].similarity = 6 - Math.abs(parseFloat(near_user[i].day_step) - parseFloat(myinfo.day_step)) / parseFloat(myinfo.day_step)
                                                    - Math.abs(parseFloat(near_user[i].day_clr) - parseFloat(myinfo.day_clr)) / parseFloat(myinfo.day_clr)
                                                    - Math.abs(parseFloat(near_user[i].day_sport_time) - parseFloat(myinfo.day_sport_time)) / parseFloat(myinfo.day_sport_time)
                                                    - Math.abs(parseFloat(near_user[i].week_clr) - parseFloat(myinfo.week_clr)) / parseFloat(myinfo.week_clr)
                                                    - Math.abs(parseFloat(near_user[i].week_sport_time) - parseFloat(myinfo.week_sport_time)) / parseFloat(myinfo.week_sport_time)
                                                    - Math.abs(parseFloat(near_user[i].week_step) - parseFloat(myinfo.week_step)) / parseFloat(myinfo.week_step);
                        near_user[i].similarity = (near_user[i].similarity/6.0*100).toFixed(2);
                        ranking_info.list[i] = near_user[i];
                        console.log(near_user[i]);
                    }
                    //console.log(myinfo);   
                    ranking_info.list.sort(function(a,b){return parseInt(a.similarity) < parseInt(b.similarity)?1:-1});
                    if(tag == 0){
                        console.log(ranking_info);
                        res.send(JSON.stringify(ranking_info));
                    }
                    else{
                        near_user.unshift(myinfo);
                        res.send(JSON.stringify(near_user));
                    }
                });
            });
        });
    });
}