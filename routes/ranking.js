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
                for(var i = 0; i < docs.length; i++)
                {
                    list[i] = docs[i];
                }
                list.sort(function(a,b){return parseInt(a.steps) < parseInt(b.steps)?1:-1});
				res.render('ranking_list', {list : list});
			}
		})
	}
};

exports.get_ranking_info = function(db) {
    return function(req, res) {
        console.log("adhfkjdsahfkjhdsakjfhsakjfha");
        var data_day = db.get('day');
        data_day.find({}, function(err,docs) {
            console.log(docs);
            console.log(JSON.stringify(docs));
            console.log("I want to send something")
            res.send(JSON.stringify(docs));
        });
    }
};