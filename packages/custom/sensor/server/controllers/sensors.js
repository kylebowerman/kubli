'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
Sensor = mongoose.model('Sensor'),
_ = require('lodash');


/**
* Find sensor by id
*/
exports.sensor = function(req, res, next, id) {
  Sensor.load(id, function(err, sensor) {
    if (err) return next(err);
    if (!sensor) return next(new Error('Failed to load sensor ' + id));
    req.sensor = sensor;
    next();
  });
};

/**
* Create an sensor
*/
exports.create = function(req, res) {
  var sensor = new Sensor(req.body);
  sensor.user = req.user;

  sensor.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot save the sensor'
      });
    }
    res.json(sensor);

  });
};

/**
* Update an sensor
*/
exports.update = function(req, res) {
  var sensor = req.sensor;

  sensor = _.extend(sensor, req.body);

  sensor.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the sensor'
      });
    }
    res.json(sensor);

  });
};

/**
* Delete an sensor
*/
exports.destroy = function(req, res) {
  var sensor = req.sensor;

  sensor.remove(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot delete the sensor'
      });
    }
    res.json(sensor);

  });
};

/**
* Show an sensor
*/
exports.show = function(req, res) {
  res.json(req.sensor);
};

/**
* List of Articles
*/
exports.all = function(req, res) {
  Sensor.find().sort('-epochtime').populate('user', 'name username').exec(function(err, sensors) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the sensors'
      });
    }
    res.json(sensors);

  });
};
