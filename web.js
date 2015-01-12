var express = require('express');
var  app = express();
var request = require('request');
  // controller = require('./server/controller');



//var apikey = "MpG21p39McRueq-3ColxkXIReiHua-Vf";
var apikey = process.env.MONGO_APIKEY;
var mongoQuery = encodeURIComponent('{"version":2}');
var mongoFields = encodeURIComponent('{"pin":1,"device":1,"value":1,"time":1,"epochtime":1,"_id":0}');
var url = "https://api.mongolab.com/api/1/databases/arduino/collections/kubli?q="+mongoQuery+"&f="+mongoFields+"&apiKey="+apikey;


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
  request(url, function (error,response,body){
    if (!error && response.statusCode == 200) {
      //console.log(body);
      res.send(body);
    }
  });
};

var getA0 = function(req,res, next) {
  mongoQuery = encodeURIComponent('{"version":2, "pin": "A0"}');
  url = "https://api.mongolab.com/api/1/databases/arduino/collections/kubli?q="+mongoQuery+"&f="+mongoFields+"&apiKey="+apikey;
  request(url, function (error,response,body){
    if (!error && response.statusCode == 200) {
      //console.log(body);
      res.send(body);
    }
  });
};

var getA1 = function(req,res, next) {
  mongoQuery = encodeURIComponent('{"version":2, "pin": "A1"}');
  url = "https://api.mongolab.com/api/1/databases/arduino/collections/kubli?q="+mongoQuery+"&f="+mongoFields+"&apiKey="+apikey;
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

app.listen(process.env.PORT || 3000);
