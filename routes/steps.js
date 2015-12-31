var tools = require('./tools');

exports.steps = function(db) {
	return function(req, res) {
		var openid = req.body.openid;
		var data_week = db.get('day_data');
		var basic = db.get('basic');
		var steps = [];
		var firstday = new Date();
		var lastday = new Date();
		var nickname = "", icon = "";
        firstday.setDate(firstday.getDate()-tools.previousDays-7);
        lastday.setDate(lastday.getDate()-tools.previousDays);
        basic.find({"openid":openid}, function(err,doc) {
			if(doc.length == 0) {
				
			} else {
                icon = doc[0].icon;
                nickname = doc[0].nickname;
				data_week.find({"openid":openid, "date":{"$gte":firstday, "$lte":lastday}}, function(err,docs) {
					if(docs.length == 0) {
				
					} else {
						for(var i=0;i<docs.length;i++){
							steps[i] = new Object();
							steps[i] = {"steps":docs[i].steps, "day":docs[i].date};
						}
						steps.sort(function(a, b){
							if(a.day.getYear() != b.day.getYear())
								return a.day.getYear() - b.day.getYear();
							else if(a.day.getMonth() != b.day.getMonth())
								return a.day.getMonth() - b.day.getMonth();
							else
								return a.day.getDate() - b.day.getDate();
						});
						steps[7] = new Object();
						steps[7] = {"steps":0, "day":docs[0].date};
						for(var i=0;i<docs.length;i++){
							steps[7].steps += steps[i].steps;
						}
						steps[8] = new Object();
						steps[8] = {"nickname":nickname, "icon":icon};
						res.send(JSON.stringify(steps));
					}			
				});
			}
			
		});
	}
};