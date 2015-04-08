'use strict';

angular.module('mean.mcu').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('mcu list all', {
      url: '/mcu/all',
      templateUrl: 'mcu/views/list.html'
    });
  }
]);
