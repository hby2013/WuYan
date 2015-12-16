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
var database = require('./routes/database');
var tools = require('./routes/tools');
var message_module = require('./routes/message_module');
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
app.get(/steps/, query_steps.steps(db));

//check ranking
//console.log(tools.ip);

app.get(/ranking/, query_ranking.ranking(db));
app.get(/attention/, attention.attention(db));
app.get(/info/, info.info(db));

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
//console.log(db.get('basic').count());

app.listen(80);

/*var basic = db.get('basic');
basic.find({}, function(err,docs) {
    database.adduser(db, docs.length);
});
*/
module.exports = app;
