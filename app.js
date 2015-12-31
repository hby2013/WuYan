var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var query_steps = require('./routes/steps');
var query_ranking = require('./routes/ranking');
var attention = require('./routes/attention');
var wechat = require('./routes/main_response');
var info = require('./routes/info');
var invitation = require('./routes/invitation')
var database = require('./routes/database');
var tools = require('./routes/tools');
var message_module = require('./routes/message_module');
var world = require('./routes/travel_world');
var query_coins = require('./routes/coins');
var app = express();

//database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/wechat');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/wechat/', wechat);

// check weekly report
app.post('/get_worldmap1',world.get_worldmap1(db));
app.post('/steps', query_steps.steps(db));

app.post('/ranking', query_ranking.ranking(db));

app.post('/attention', attention.attention(db));
app.post('/country_info',world.post_country_info(db));

app.post('/info', info.info(db));
app.post('/coins',query_coins.coins(db));
app.post('/buy_item',query_coins.buy_item(db));
app.post('/get_ranking_info',query_ranking.get_ranking_info(db)); 
app.post('/logging',info.logging_finished(db)); 
app.post('/send_invitation',invitation.send_invitation(db));
app.post('/get_invitation_info',invitation.get_invitation_info(db));
app.post('/deal_with_invitation',invitation.deal_with_invitation(db));
app.post('/logging',info.logging_finished(db)); 
app.post('/attention/search/',attention.show_search(db)); 
app.post('/attention/add_friend/',attention.add_friend(db)); 
app.post('/attention/add_special_friend/',attention.add_special_friend(db)); 
app.post('/attention/friend_list/',attention.rev_friend_list(db)); 
app.post('/attention/special_friend_list/',attention.rev_special_friend_list(db));
//app.post('/logging',info.logging(db)); 
//database.adduser(db);
//database.add_day_data(db);
//database.add_walk_detail(db);
//database.add_country_info(db);
//console.log(db.get('basic').count());

app.listen(80);
//database.adduser(db);

//app.listen(80);

/*var basic = db.get('basic');
basic.find({}, function(err,docs) {
    database.adduser(db, docs.length);
});
*/
module.exports = app;
