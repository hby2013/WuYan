exports.info = function(db) {
	return function(req, res) {
		var url = req._parsedOriginalUrl.path;
        console.log(url);
		var openid = url.substring(6, url.length);
		var info = db.get('basic');
		var info_data = new Object();
        console.log(openid);
		info.find({"openid":openid}, function(err,docs) {
            console.log("length:"+docs.length);
			if(docs[0].weight <= 0) {
                info_data.id = openid;
                info_data.height = 0;
                info_data.weight = 0;
                info_data.sex = "male";
				res.render('info', {db_info : info_data});
			} else {
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
    var collection = db.get('basic');
    return function(req, res) {
        var info = db.get('basic');
        var sex = req.body.sex;
        var username = req.body.username;
        var weight = req.body.weight;
        var height = req.body.height;
        info.update({"openid":username},{$set:{"sex":sex}}); 
        info.update({"openid":username},{$set:{"height":height}});  
        info.update({"openid":username},{$set:{"weight":weight}});         
    }
}