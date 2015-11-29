var tools = require('./tools');
//var server = require('./main_response');
//var wechat = require('wechat');
var send_rev = {}
var sender_nickname = [];
var receiver_nickname = [];
var sender = [];
var receiver = [];
var meg_tag = [];
var userid1 = [];
var userid2 = [];
var my_db;
send_rev.logs = "dff";

send_rev.attention = function(db, tool) {
	return function(req, res) {
		var basic = db.get('basic');
		var url = req._parsedOriginalUrl.path;
		var openid = url.substring(11, url.length);
        var userid = "";
        console.log(openid);

		basic.find({}, function(err,docs) {
            //console.log(docs);
			if(docs.length == 0) {
				
			} else {
                var list = [];
                //console.log(docs[0]);
                for(var i = 0; i < docs.length; i++)
                {
                    if(docs[i].openid == openid){
                        userid = docs[i].userid;
                        break;
                    }
                }
				res.render('friends',{userid:userid});
			}
		})
	}
};

send_rev.rev_meg = function(db){
	var basic = db.get('basic');
    my_db = db;
    //console.log("read");
    return function(req, res) {
        //tools.customSendText(req.body.receiver, "hby"+"想要关注你，回复'r"+sender.length+":y'同意关注，回复'r"+sender.length+":n'拒绝关注");
        userid1[userid1.length] = req.body.userid;
        userid2[userid2.length] = req.body.receiver;
        basic.find({}, function(err,docs) {
            if(docs.length == 0) {
            } else {
                for(var i = 0; i < docs.length; i++)
                {
                    if(docs[i].userid == userid1[userid1.length-1]){
                        sender[sender.length] = docs[i].openid;
                        sender_nickname[sender_nickname.length] = docs[i].nickname;
                    }
                    if(docs[i].userid == userid2[userid2.length-1]){
                        receiver[receiver.length] = docs[i].openid;
                        receiver_nickname[receiver_nickname.length] = docs[i].nickname;
                    }
                }
                tools.customSendText(receiver[receiver.length-1], "'"+sender_nickname[sender_nickname.length-1]+"'想要关注你，回复'"+(sender.length-1)+"y'同意关注，回复'"+(sender.length-1)+"n'拒绝关注");
            }
        });
        meg_tag[meg_tag.length] = 0;
        var meg = {"info":"y"};
        res.send(JSON.stringify(meg));
        //console.log(userid);
    }
}

send_rev.rev_friend_list = function (db){
    var attention = db.get('attention');
    var basic = db.get('basic');
    var friends_list = [];
    friends_list.length = 0;
    return function(req, res) {
        var userid = req.body.userid;
        attention.find({}, function(err,docs) {
            if(docs.length == 0) {
            } else {
                for(var i = 0; i < docs.length; i++){
                    if(docs[i].userid1 == userid){
                        var userid_2 = docs[i].userid2;
                        basic.find({}, function(err,doc) {
                            for(var j = 0; j < doc.length; j++){
                                if(doc[j].userid == userid_2){
                                    friends_list[friends_list.length] = doc[j];
                                }
                            }
                        });
                    }
                }
                //console.log(friends_list);
                setTimeout(function(){res.send(JSON.stringify(friends_list));},2000);
            }
        });
        //res.send(JSON.stringify(friends_list));
        //console.log(userid);
    }
}

send_rev.senders = function(){
	return sender;
}

send_rev.receivers = function(){
	return receiver;
}

send_rev.sender_nicknames = function(){
    return sender_nickname;
}

send_rev.receiver_nicknames = function(){
    return receiver_nickname;
}

send_rev.meg_tags = function(){
	return meg_tag;
}

send_rev.set_meg_tags = function(i, val){
	meg_tag[i] = val;
}

send_rev.insert_attentionship = function(i){
    var attention = my_db.get('attention');
    attention.insert({"userid1":userid1[i],"userid2":userid2[i],"friends_type":"1"});
}

module.exports = send_rev