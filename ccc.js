var monk = require('monk');
var db = monk('localhost:27017/wechat');
var day_col = db.get('day_data');
day_col.find({},function(err,docs) {
   for(var i = 0; i < docs.length; i++) {
       console.log(new Date(docs[i].date.setDate(docs[i].date.getDate()+1)));
       day_col.update({"openid":docs[i].openid,"date":new Date(docs[i].date)},{$set:{"date":new Date(docs[i].date.setDate(docs[i].date.getDate()-1))}});
   }
});