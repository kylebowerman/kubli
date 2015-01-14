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
  .get(sensors.all)
  .post(auth.requiresLogin, sensors.create);
  app.route('/sensors/:sensorId')
  .get(auth.isMongoId, sensors.show)
  .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, sensors.update)
  .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, sensors.destroy);

  // Finish with setting up the sensorId param
  app.param('sensorId', sensors.sensor);
};
