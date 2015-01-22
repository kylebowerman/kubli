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
  Sensor
    .find({
      version: 2
    })
    .sort('-epochtime')
    .populate('user', 'name username')
    .limit(1000)
    .exec(function(err, sensors) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: 'Cannot list the sensors'

        });
      }
      res.json(sensors);

    });
};

exports.analog = function(req, res) {
  Sensor
  .find({
    version: 2,
    class: { $not: /temp/ }
  })
  .sort('-epochtime')
  .populate('user', 'name username')
  .limit(1000)
  .exec(function(err, sensors) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Cannot list the sensors'

      });
    }
    res.json(sensors);

  });
};

exports.a0 = function(req, res) {
  Sensor
    .find({
      version: 2,
      pin: 'A0'
    })
    .sort('-epochtime')
    .limit(1000)
    .exec(function(err, sensors) {
      if (err) {
        return res.status(500).json({
          error: 'Cannot list the sensors'
        });
      }
      res.json(sensors);

    });
};

exports.a1 = function(req, res) {
  Sensor
    .find({
      version: 2,
      pin: 'A1'
    })
    .sort('-epochtime')
    .limit(1000)
    .exec(function(err, sensors) {
      if (err) {
        return res.status(500).json({
          error: 'Cannot list the sensors'
        });
      }
      res.json(sensors);
    });
};

exports.mhourly = function(req, res) {
  Sensor
    .aggregate([{
      $match: {
        'device': 'moisture',
        'version': 2
      }
    }, {
      $group: {
        _id: {
          time: {
            $concat: [{
              $substr: ['$time', 0, 14]
            }, '00:00.000Z']
          }
        },
        value: {
          $avg: '$value'
        },
        epochtime: {
          $min: '$epochtime'
        },
        pin: {
          $first: '$pin'
        },
        device: {
          $first: '$device'
        }
      }
    }, {
      $sort: {
        _id: -1
      }
    }])
    .exec(function(err, sensors) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: 'Cannot list the sensors'
        });
      }
      res.json(sensors);
    });
};

exports.mdaily = function(req, res) {
  Sensor
    .aggregate([{
      $match: {
        'device': 'moisture',
        'version': 2
      }
    }, {
      $group: {
        _id: {
          time: {
            $concat: [{
              $substr: ['$time', 0, 11]
            }, '00:00:00.000Z']
          }
        },
        value: {
          $avg: '$value'
        },
        epochtime: {
          $min: '$epochtime'
        },
        pin: {
          $first: '$pin'
        },
        device: {
          $first: '$device'
        }
      }
    }, {
      $sort: {
        _id: -1
      }
    }])
    .exec(function(err, sensors) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: 'Cannot list the sensors'
        });
      }
      res.json(sensors);
    });
};

exports.temp = function(req, res) {
  Sensor
  .find({version: 2, class: 'temp'})
  .sort('-epochtime')
  .limit(1000)
  .exec(function(err, sensors) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the sensors'
      });
    }
    res.json(sensors);
  });
};

// hourly averages of both light and moisture
exports.analog_mean = function(req, res) {
  Sensor
  .aggregate([{
    $match: {
      'device': {$in: ['light','moisture']},
      'version': 2
    }
  }, {
    $group: {
      _id: {
        time: { $concat: [{ $substr: ['$time', 0, 14] }, '00:00.000Z'] },
        pin: '$pin',
      },
      value: { $avg: '$value' },
      epochtime: { $min: '$epochtime' },
      pin: { $first: '$pin' },
      device: { $first: '$device' },
      time: {$first: '$time'}
    }
  }, {
    $sort: {
      _id: -1
    }
  }])
  .exec(function(err, sensors) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Cannot list the sensors'
      });
    }
    res.json(sensors);
  });
};

// hourly averages of both light and moisture
exports.hourly_mean = function(req, res) {
  Sensor
  .aggregate([{
    $match: {
      'version': 2
    }
  }, {
    $group: {
      _id: {
        time: { $concat: [{ $substr: ['$time', 0, 14] }, '00:00.000Z'] },
        pin: '$pin',
      },
      value: { $avg: '$value' },
      epochtime: { $min: '$epochtime' },
      pin: { $first: '$pin' },
      device: { $first: '$device' },
      time: {$first: '$time'}
    }
  }, {
    $sort: {
      _id: -1
    }
  }])
  .exec(function(err, sensors) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Cannot list the sensors'
      });
    }
    res.json(sensors);
  });
};

// gets pins, average max a min for key use.
exports.get_pins = function(req, res) {
  Sensor
  .aggregate([
  { $match: {'version': 2}},
  { $group: {
      _id: {
        pin: '$pin',
        version: '$version'
      },
      avgValue: { $avg: '$value' },
      maxValue: { $max: '$value' },
      minValue: { $min: '$value' },
      msg: { $last: '$msg' },
      pin: { $first: '$pin' },
      device: { $first: '$device' },
      class: { $last: '$class' },
      oldest: {$first: '$time'},
      newest: {$last: '$time'},
      version: {$last: '$version'},
      epochmin: {$min: '$epochtime'},
      epochmax: {$max: '$epochtime'}
    }
  },
  { $project: {
    '_id':0,
    'msg': 1,
    'avgValue':1,
    'maxValue': 1,
    'minValue': 1,
    'pin': 1,
    'device': 1,
    'class': 1,
    'oldest': 1,
    'newest': 1,
    'version': 1,
    'epochmin': 1,
    'epochmax': 1,
    'line_id': { $concat: ['v',{$substr:[ '$version',0,1]},'-','$pin']},
    'line_name': {$concat: ['$pin',' ','$device']}
    }
  },
  { $sort: { _id: -1 },
  }])
  .exec(function(err, sensors) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Cannot list the sensors'
      });
    }
    res.json(sensors);
  });
};
