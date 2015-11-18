exports.info = function(db) {
    var collection = db.get('logging');
	return function(req, res) {
		var url = req._parsedOriginalUrl.path;
		var openid = url.substring(7, url.length);
		var info = db.get('logging');
		var info_data = new Object;
        console.log(openid);
		info.find({"username":openid}, function(err,docs) {
            console.log("length:"+docs.length);
			if(docs.length == 0) {
                info_data.id = openid;
                info_data.height = 0;
                info_data.weight = 0;
                info_data.sex = "male";
				res.render('info', {db_info : info_data});
			} else {
                console.log(docs);
                info_data.id = openid;
                info_data.height = docs[0].height;
                info_data.weight = docs[0].weight;
                info_data.sex = docs[0].sex;
                console.log(info_data);
				res.render('info', {db_info : info_data});
			}
		})
    }
};

//exports.logging = function(db) {
//    return function(req, res) {
//        var collection = db.get('logging');
//        var data = req.body.data;
//        alert(data);
//    }
//}

exports.logging_finished = function(db) {
    var collection = db.get('logging');
    var info = db.get('logging');
    return function(req, res) {
        var sex = req.body.sex;
        var username = req.body.username;
        var weight = req.body.weight;
        var height = req.body.height;
        info.find({"username":username}, function(err,docs) {
            console.log("length:"+docs.length);
			if(docs.length == 0) {
                collection.insert({"username":username,"sex":sex, "height":height,"weight":weight});
                res.render('info_finished');
			} else {
                collection.update({"username":username},{$set:{"sex":sex}});
                collection.update({"username":username},{$set:{"height":height}});
                collection.update({"username":username},{$set:{"weight":weight}});
                res.render('info_finished');
			}
		})
        
    }
}