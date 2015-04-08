'use strict';

/**
* MODEL
* Module dependencies.
*/
var mongoose = require('mongoose'),
Schema = mongoose.Schema;


/**
* Article Schema
*/
var McudbSchema = new Schema({

  name:       { type: String, trim: true },
  make:       { type: String, trim: true },
  url:        { type: String, trim: true },
  processor:  { type: String, trim: true },
  V_opp_in:   { type: String, trim: true },
  speed:      { type: String, trim: true },
  Aio:        { type: String, trim: true },
  dio:        { type: String, trim: true },
  SRAM:       { type: Number},
  Flash:      { type: Number},
  time:       { type: Date},
  USB:        { type: String, trim: true},
  UART:       { type: String, trim: true},
  user:       { type: Schema.ObjectId, ref: 'User' }



}, {
  collection: 'flok'
});

/**
* Validations
*/


/**
* Statics
*/

McudbSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};


mongoose.model('Mcudb', McudbSchema);
