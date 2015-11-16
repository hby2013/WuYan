
exports.steps = function(db) {
	return function(req, res) {
		var collection = db.get('week');
		//console.log(req);
		var url = req._parsedOriginalUrl.path;
		var openid = url.substring(7, url.length);
		var data_week = db.get('week');
		var steps = new Object;
		data_week.find({"username":openid}, function(err,docs) {
			if(docs.length == 0) {
				
			} else {
				steps.d1 = parseInt(docs[0].steps1);
				steps.d2 = parseInt(docs[0].steps2);
				steps.d3 = parseInt(docs[0].steps3);
				steps.d4 = parseInt(docs[0].steps4);
				steps.d5 = parseInt(docs[0].steps5);
				steps.d6 = parseInt(docs[0].steps6);
				steps.d7 = parseInt(docs[0].steps7);
				console.log(steps);
				res.render('sport_statistics', {db_steps : steps});
			}
			
		})
	}
};