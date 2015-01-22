'use strict';

angular.module('mean.sensor').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('sensor index page', {
      url: '/sensor/index',
      templateUrl: 'sensor/views/index.html'
    })
    .state('all devices', {
      url: '/sensor/alldevices',
      templateUrl: 'sensor/views/alldevices.html'
    })
    .state('all devices2', {
      url: '/sensor/alldevices2',
      templateUrl: 'sensor/views/alldevices2.html'
    })
    .state('all devices3', {
      url: '/sensor/alldevices3',
      templateUrl: 'sensor/views/alldevices3.html'
    })
    .state('light', {
      url: '/sensor/light',
      templateUrl: 'sensor/views/light.html'
    })
    .state('moisture', {
      url: '/sensor/moisture',
      templateUrl: 'sensor/views/moisture.html'
    })
    .state('moisture hourly', {
      url: '/sensor/moisture/hourly',
      templateUrl: 'sensor/views/mhourly.html'
    })
    .state('moisture daily', {
      url: '/sensor/moisture/daily',
      templateUrl: 'sensor/views/mdaily.html'
    })
    .state('temp', {
      url: '/sensor/temp',
      templateUrl: 'sensor/views/temp.html'
    });
  }
]);
