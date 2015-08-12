var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var request = require('request');
var jsdom = require('jsdom');
var url = require('url');
var parseString = require('xml2js').parseString;

var routes = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use('/', routes);


//Api starts here
app.get('/getOpapCoupon',function(req,res){
  //Variables
  var request = require('request');
  var couponNumber;
  var header = {
    'LOCALE':'en_GB'
  }
  //End
  //URL Data
  var couponNumberUrl = 'http://www.opap.gr/web/services/rs/draw/4100/last/1';
  var couponUrl;
  //End
    request({url:couponNumberUrl,headers:header}, function (error, response, body) {
      if (!error) {
        parseString(body,function(err,result){
        couponNumber = result['ns1:draws']['ns1:draw'][0]['$']['drawNumber'];
        couponUrl = 'http://www.opap.gr/web/services/rs/betting/availableBetGames/sport/program/4100/0/sport-1/'+couponNumber+'.json?localeId=en_GB';
        });

        request({url:couponUrl,headers:header}, function (error, response, body) {
      if (!error) {
        var betGames = JSON.parse(body);
        res.send(betGames.betGames);
        }
        }); 
      }    
});

});
//Api ends here
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
