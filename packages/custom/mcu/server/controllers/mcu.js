'use strict';

/**
 * CONTROLLER
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Mcu = mongoose.model('Mcudb'),
  _ = require('lodash');



  /**
   * List of Articles
   */
  exports.all = function(req, res) {
    Mcu.find().sort('-name').populate('user', 'name username').exec(function(err, mcus) {
      if (err) {
        return res.status(500).json({
          error: 'Cannot list the mcus'
        });
      }
      res.json(mcus);

    });
  };
