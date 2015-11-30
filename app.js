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
var wechat = require('./routes/main_response');
var info = require('./routes/info')
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
app.get(/ranking/, query_ranking.ranking(db));
app.get(/info/, info.info(db));

app.get('/json',query_ranking.get_ranking_info(db)); 
app.post('/logging',info.logging_finished(db)); 
//app.post('/logging',info.logging(db)); 

app.listen(80);

module.exports = app;
