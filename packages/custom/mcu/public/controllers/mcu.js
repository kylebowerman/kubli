'use strict';

angular.module('mean.mcu').controller('McuController', ['$scope', 'Global', 'Mcu',
  function($scope, Global, Mcu) {
    $scope.global = Global;
    $scope.package = {
      name: 'mcu'
    };
  }
]);
