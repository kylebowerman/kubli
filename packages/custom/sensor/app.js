'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Sensor = new Module('sensor');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Sensor.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Sensor.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Sensor.menus.add({
    title: 'sensor index page',
    link: 'sensor index page',
  //  roles: ['authenticated'],
    menu: 'main'
  });

  Sensor.aggregateAsset('css', 'sensor.css');
  Sensor.aggregateAsset('js', '../lib/d3/d3.min.js',{
     weight: 4,
     aboslute: false
   });
   Sensor.aggregateAsset('js', '../lib/lodash/dist/lodash.min.js',{
     weight: 3,
     aboslute: false
   });

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Sensor.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Sensor.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Sensor.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Sensor;
});
