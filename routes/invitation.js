var express = require('express');
var wechat = require('wechat');
var tools = require('./tools');
var server = express.Router();
var message_module = require('./message_module');
var https = require('https');
var tools = require('./tools');

exports.send_invitation = function(db) {
	var collection = db.get('invitation');
    return function(req, res) {
        var openid1 = req.body.openid1;
        var openid2 = req.body.openid2;
        var longitude = req.body.longitude;
        var latitude = req.body.latitude;
        var time = req.body.time;
        var place = req.body.place;
        var postscript = req.body.postscript;
        var data1 = req.body.data1;
        var data2 = req.body.data2;
        var similarity = req.body.similarity;
        var nickname1,nickname2;
        var invitation_id;
        var basic = db.get('basic');
        console.log(similarity+"haha");
        basic.find({"openid":openid1}, function(err,docs) {
            nickname1 = docs[0].nickname;
            icon = docs[0].icon;
            collection.find({},function(err,docs){
                invitation_id = docs.length;
                basic.find({"openid":openid2}, function(err,docs) { 
                    nickname2 = docs[0].nickname;
                    console.log(nickname1 + "sdasd " + nickname2);
                    collection.insert({"invitation_id":invitation_id,"openid1":openid1,"openid2":openid2,"icon":icon, "nickname1":nickname1,"nickname2":nickname2, "latitude":latitude,"longitude":longitude,"time":time,"place":place,"postscript":postscript,"similarity":similarity});
                    message_module.send_invitation_module(openid2, invitation_id);
                });
            });
            res.send("123");
        });
    }
}
        
exports.get_invitation_info = function(db){
    var collection = db.get('invitation');
    return function(req, res) {
        var invitation_id = req.body.invitation_id;
        var invitation_info = new Object();
        collection.find({"invitation_id":parseInt(invitation_id)},function(err,docs){
            invitation_info.nickname1 = docs[0].nickname1;
            invitation_info.nickname2 = docs[0].nickname2;
            invitation_info.icon = docs[0].icon;
            invitation_info.time = docs[0].time;
            invitation_info.longitude = docs[0].longitude;
            invitation_info.latitude = docs[0].latitude;
            invitation_info.place = docs[0].place;
            invitation_info.postscript = docs[0].postscript;
            invitation_info.similarity = docs[0].similarity;
            invitation_info.openid1 = docs[0].openid1;
            invitation_info.openid2 = docs[0].openid2;
            console.log(invitation_info);
            res.send(JSON.stringify(invitation_info));
        });
        
    }
}

exports.deal_with_invitation = function(db){
    return function(req, res){
        var collection = db.get('invitation');
        var invitation_id = req.body.invitation_id;
        var openid = req.body.openid;
        var invitation_status = req.body.invitation_status;
        var nickname =req.body.nickname;
        console.log(req.body);
        console.log("invitation_status："+invitation_status);
        console.log("invitation_id："+invitation_id);
        if(invitation_status == "1"){
            collection.find({"invitation_id":parseInt(invitation_id)},function(err,docs){
                var time = docs[0].time;
                var place = docs[0].place;
                console.log(time+"hhhh"+place);
                tools.customSendText(openid, nickname + "同意了你的邀请，请于" + time + "去" + place + "赴约,愿你们运动愉快。");
            });
        }
        else if(invitation_status == "2"){
            tools.customSendText(openid, nickname + "拒绝了你的邀请。");
        }
        res.send("123");
    }
}