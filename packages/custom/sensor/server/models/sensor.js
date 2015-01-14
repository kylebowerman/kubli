'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
Schema = mongoose.Schema;


/**
* Article Schema
*/
var SensorSchema = new Schema({

  msg:       { type: String, trim: true },
  body:      { type: String, trim: true },
  pin:       { type: String, trim: true },
  device:    { type: String, trim: true },
  version:   { type: Number},
  value:     { type: Number},
  time:      { type: Date},
  epochtime: { type: Number},
  user: { type: Schema.ObjectId, ref: 'User' }



});

/**
* Validations
*/


/**
* Statics
*/
SensorSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Sensor', SensorSchema);
