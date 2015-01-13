'use strict';

angular.module('mean.sensor').controller('SensorController', ['$scope', 'Global', 'Sensor',
  function($scope, Global, Sensor) {
    $scope.global = Global;
    $scope.package = {
      name: 'sensor'
    };
  }
]);
