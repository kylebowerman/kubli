'use strict';

/*
* CONTROLLER
*/

var mcus = require('../controllers/mcu');

// The Package is past automatically as first parameter
module.exports = function(Mcu, app, auth, database) {

  app.route('/mcus')
     .get(mcus.all);

  /*

  app.get('/mcu/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/mcu/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/mcu/example/render', function(req, res, next) {
    Mcu.render('index', {
      package: 'mcu'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });

  */


};
