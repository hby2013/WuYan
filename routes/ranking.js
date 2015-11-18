exports.ranking = function(db) {
	return function(req, res) {
		var collection = db.get('day');
		var url = req._parsedOriginalUrl.path;
		var openid = url.substring(7, url.length);
		var data_day = db.get('day');

		data_day.find({}, function(err,docs) {
			if(docs.length == 0) {
				
			} else {
                var list = [];
                console.log(docs[0]);
                for(var i = 0; i < docs.length; i++)
                {
                    list[i] = docs[i];
                }
				console.log(list);
				res.render('ranking_list', {list : list});
			}
			
		})
	}
};