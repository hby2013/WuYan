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

send_rev.attention = function(db) {
	return function(req, res) {
        //console.log(111);
		var basic = db.get('basic');
		var url = req._parsedOriginalUrl.path;
		var openid = url.substring(11, url.length);
        var userid = "";
        //console.log(1);

		basic.find({}, function(err,docs) {
            //console.log(docs);
			if(docs.length == 0) {
				
			} else {
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

send_rev.show_search = function(db){
	var basic = db.get('basic');
    return function(req, res) {
        var userlist = [];
        var search_userid = req.body.userid;
        var search_userid_exp = eval("/^"+search_userid+"/");
        basic.find({}, function(err,docs) {
            for(var i = 0; i < docs.length; i++)
            {
                if(docs[i].userid.search(search_userid_exp) == 0 || docs[i].nickname.search(search_userid_exp) == 0){
                    userlist[userlist.length] = docs[i];
                }
            }
            res.send(JSON.stringify(userlist));
        });
        //res.send(JSON.stringify(userlist));
        //console.log(userid);
    }
}

send_rev.add_friend = function(db){
    var basic = db.get('basic');
    my_db = db;
    //console.log("read");
    return function(req, res) {
        //tools.customSendText(req.body.receiver, "hby"+"想要关注你，回复'r"+sender.length+":y'同意关注，回复'r"+sender.length+":n'拒绝关注");
        userid1[userid1.length] = req.body.userid;
        userid2[userid2.length] = req.body.friendid;
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
    return function(req, res) {
        var attention = db.get('attention');
        var basic = db.get('basic');
        var friends_list = [];
        friends_list.length = 0;
        var userid = req.body.userid;
        attention.find({"userid1":userid, "friends_type":"1"}, function(err,docs) {
            var len = docs.length;
            for(var i = 0; i < docs.length; i++){
                //console.log(len);
                basic.find({"userid":docs[i].userid2}, function(err,doc) {
                    friends_list[friends_list.length] = doc[0];
                    if(len == friends_list.length){
                        res.send(JSON.stringify(friends_list));
                    }
                });
            }
        });
        //res.send(JSON.stringify(friends_list));
        //console.log(userid);
    }
}

send_rev.rev_special_friend_list = function (db){
    return function(req, res) {
        var attention = db.get('attention');
        var basic = db.get('basic');
        var day_data = db.get('day_data');
        //var basic_no = 0, day_data_no = 1;
        var special_friends_list = [];
        var basic_list = [], day_data_list =[];
        var userid = req.body.userid;
        attention.find({"userid1":userid, "friends_type":"2"}, function(err,docs) {
            var len = docs.length;
            for(var i = 0, j =0 ; i < docs.length && j < docs.length;i++,j++){
                //console.log(len);
                basic.find({"userid":docs[i].userid2}, function(err,doc) {
                    basic_list[basic_list.length] = doc[0];
                    console.log("basic");
                    if(len == basic_list.length && len == day_data_list.length){
                        console.log(1);
                        res.send({"basic_list":basic_list,"day_data_list":day_data_list});
                    }
                });
                day_data.find({"userid":docs[i].userid2}, function(err,doc) {
                    day_data_list[day_data_list.length] = doc[0];
                    console.log("day_data");
                    if(len == day_data_list.length && len == basic_list.length){
                        console.log(2);
                        res.send({"basic_list":basic_list,"day_data_list":day_data_list});
                    }
                });
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