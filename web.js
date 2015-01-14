var express = require('express');
var  app = express();
var request = require('request');
var moment = require('moment');
var port = process.env.PORT || 3000;


console.log('the time is ' + moment());
console.log('the time 24 hours ago was ' + moment().subtract(24,'hours'));
var ago24hours =  moment().subtract(12,'hours');



var apikey = process.env.MONGO_APIKEY;
//var mongoQuery = encodeURIComponent('{"version":2}');
var mongoQuery = "";
var mongoFields = encodeURIComponent('{"pin":1,"device":1,"value":1,"time":1,"epochtime":1,"_id":0}');
var mongobase = 'https://api.mongolab.com/api/1/databases/arduino/collections/sensors'
var mongosort = encodeURIComponent('{"epochtime":-1}');
//var url = "https://api.mongolab.com/api/1/databases/arduino/collections/kubli?q="+mongoQuery+"&f="+mongoFields+"&apiKey="+apikey;


var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: 'index.html',
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
};

var getData = function(req,res, next) {
  mongoQuery = encodeURIComponent('{"version":2}');
  url = mongobase+"?q="+mongoQuery+"&f="+mongoFields+"&s="+mongosort+"&l=1000&apiKey="+apikey;
  console.log('the aurl requested is ' + decodeURIComponent(url));

  request(url, function (error,response,body){
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
  };


var getA0 = function(req,res, next) {
  mongoQuery = encodeURIComponent('{"version":2, "pin": "A0"}');
  url = mongobase+"?q="+mongoQuery+"&f="+mongoFields+"&s="+mongosort+"&l=1000&apiKey="+apikey;
  request(url, function (error,response,body){
    if (!error && response.statusCode == 200) {
      //console.log(body);
      res.send(body);
    }
  });
};

var getA1 = function(req,res, next) {
  mongoQuery = encodeURIComponent('{"version":2, "pin": "A1"}');
  url = mongobase+"?q="+mongoQuery+"&f="+mongoFields+"&s="+mongosort+"&l=1000&apiKey="+apikey;
  request(url, function (error,response,body){
    if (!error && response.statusCode == 200) {
      //console.log(body);
      res.send(body);
    }
  });
};



app.use(express.static('public', options));

app.route('/all')
 .get(getData);

 app.route('/a0')
 .get(getA0);

 app.route('/a1')
 .get(getA1);

app.listen(port || 3000);
console.log('app started on port ' + port);
