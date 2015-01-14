'use strict';

angular.module('mean.sensor').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('sensor example page', {
      url: '/sensor/example',
      templateUrl: 'sensor/views/index.html'
    })
    .state('all devices', {
      url: '/sensor/alldevices',
      templateUrl: 'sensor/views/alldevices.html'
    })
    .state('light', {
      url: '/sensor/light',
      templateUrl: 'sensor/views/light.html'
    })
    .state('moisture', {
      url: '/sensor/moisture',
      templateUrl: 'sensor/views/moisture.html'
    });
  }
]);
