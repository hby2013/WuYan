exports.coins = function(db) {
	return function(req, res) {
		var openid = req.body.openid;
		var user_info = db.get('basic');
        var shopping = db.get('shopping');
        var world = db.get('travel_world');
        var data = {coins:0,attention:0,near_user:0,f_vehicle:"nothing",vehicle:"nothing"};
		user_info.find({"openid":openid}, function(err,docs) {
            data.coins = docs[0].coins;
            shopping.find({"openid":openid}, function(err,docs) {
                data.attention = docs[0].attention;
                data.near_user = docs[0].near_map;
                world.find({"openid":openid}, function(err,docs) {
                    data.f_vehicle = docs[0].f_vehicle;
                    data.vehicle = docs[0].vehicle;
                    res.send(JSON.stringify(data));
                });
            });
		});
	}
};

exports.buy_item = function(db) {
    return function(req, res) {
        var openid = req.body.openid;
        var cost = req.body.cost;
        var item = req.body.item;
        var user_info = db.get('basic');
        var shopping = db.get('shopping');
        var world = db.get('travel_world');
        var data = {coins:0,attention:0,near_user:0,f_vehicle:"nothing",vehicle:"nothing"};
        user_info.find({"openid":openid}, function(err,docs) {
            data.coins = docs[0].coins - cost;
            user_info.update({"openid":openid},{$set:{"coins":data.coins}});
            shopping.find({"openid":openid}, function(err,docs) {
                data.attention = docs[0].attention;
                if(item == "attention") {
                    data.attention++;
                    shopping.update({"openid":openid},{$set:{"attention":data.attention}});
                }
                data.near_user = docs[0].near_map;
                if(item == "near_user") {
                    data.near_user = 1;
                    shopping.update({"openid":openid},{$set:{"near_map":1}});
                }
                world.find({"openid":openid}, function(err,docs) {
                    data.f_vehicle = docs[0].f_vehicle;
                    if(item == "shoes" || item == "bicycle" || item == "motor" || item == "car") {
                        data.f_vehicle = item;
                        world.update({"openid":openid},{$set:{"f_vehicle":item}});
                    }
                    data.vehicle = docs[0].vehicle;
                    if(item == "ballon" || item == "train" || item == "plane" || item == "rocket") {
                        data.vehicle = item;
                        world.update({"openid":openid},{$set:{"vehicle":item}});
                    }
                    res.send(JSON.stringify(data));
                });
            });
		});
    }
};