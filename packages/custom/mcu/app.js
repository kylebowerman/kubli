'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Mcu = new Module('mcu');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Mcu.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Mcu.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Mcu.menus.add({
    title: 'Microcontrollers',
    link: 'mcu list all',
    roles: ['authenticated','anonymous'],
    menu: 'main'
  });




  Mcu.aggregateAsset('css', 'mcu.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Mcu.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Mcu.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Mcu.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Mcu;
});
