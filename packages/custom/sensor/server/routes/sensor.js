'use strict';

var sensors = require('../controllers/sensors');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.sensor.user.id !== req.user.id) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

module.exports = function(Articles, app, auth) {

  app.route('/sensors')
  .get(sensors.analog)
  .post(auth.requiresLogin, sensors.create);
  app.route('/sensors/:sensorId')
  .get(auth.isMongoId, sensors.show)
  .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, sensors.update)
  .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, sensors.destroy);
  app.route('/a1')
   .get(sensors.a1);
   app.route('/a0')
   .get(sensors.a0);
   app.route('/mhourly')
   .get(sensors.mhourly);
   app.route('/mdaily')
   .get(sensors.mdaily);
   app.route('/temp')
   .get(sensors.temp);


  // Finish with setting up the sensorId param
  app.param('sensorId', sensors.sensor);
};
