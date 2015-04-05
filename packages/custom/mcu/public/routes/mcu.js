'use strict';

angular.module('mean.mcu').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('mcu example page', {
      url: '/mcu/example',
      templateUrl: 'mcu/views/index.html'
    });
  }
]);
