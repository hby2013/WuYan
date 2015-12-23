var tools = require('./tools');

exports.steps = function(db) {
	return function(req, res) {
		var url = req._parsedOriginalUrl.path;
		var openid = url.substring(7, url.length);
		var data_week = db.get('day_data');
		var basic = db.get('basic');
		var steps = [];
		var firstday = new Date();
		var lastday = new Date();
        firstday.setDate(firstday.getDate()-tools.previousDays-7);
        lastday.setDate(lastday.getDate()-tools.previousDays);
        basic.find({"openid":openid}, function(err,doc) {
			if(doc.length == 0) {
				
			} else {
                steps.icon = doc[0].icon;
                //console.log(docs[0].icon);
                steps.nickname = doc[0].nickname;
				//console.log(steps);
				data_week.find({"openid":openid, "date":{"$gte":firstday, "$lte":lastday}}, function(err,docs) {
					if(docs.length == 0) {
				
					} else {
						for(var i=0;i<docs.length;i++){
							steps[i] = new Object();
							steps[i] = {"steps":docs[i].steps, "day":docs[i].date};
							//console.log(i+" "+docs[i].steps);
						}
						//console.log(steps.length);
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
						res.render('sport_statistics', {db_steps : steps});
					}			
				});
			}
			
		});
	}
};