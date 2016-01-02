var aa = 0;
exports.info = function(db) {
	return function(req, res) {
		var openid = req.body.openid;
		var info = db.get('basic');
		info.find({"openid":openid}, function(err,docs) {
            var info_data = new Object();
            //console.log("length:"+docs.length);
			if(docs[0].weight <= 0) {
                info_data.id = openid;
                info_data.height = 0;
                info_data.weight = 0;
                info_data.sex = "male";
				res.send(JSON.stringify(info_data));
			} else {
                info_data.id = openid;
                info_data.height = docs[0].height;
                info_data.weight = docs[0].weight;
                info_data.sex = docs[0].sex;
                //console.log(info_data);
				res.send(JSON.stringify(info_data));
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
    aa++;
    return function(req, res) {
        var info = db.get('basic');
        var sex = req.body.sex;
        var openid = req.body.openid;
        var weight = req.body.weight;
        var height = req.body.height;
        //console.log("hh"+sex);
        info.update({"openid":openid},{$set:{"sex":sex}}); 
        info.update({"openid":openid},{$set:{"height":height}});  
        info.update({"openid":openid},{$set:{"weight":weight}});
        res.send("succesuful!");
    }
}