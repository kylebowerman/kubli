'use strict';

angular.module('mean.mcu').controller('McuController', ['$scope', 'Global', 'Mcu','$http', '$log', '$timeout', '$interval', 'uiGridConstants',
  function($scope, Global, Mcu, $http, $log, $timeout, $interval, uiGridConstants) {
    $scope.global = Global;
    var data =[];
    $scope.package = {
      name: 'mcu'
    };




    $scope.loadlist = function() {
       $http.get('/mcus').then(function(result) {
        //$scope.mcu = result.data;
        $scope.gridOptions.data = result.data;
      });
    };

    $scope.gridOptions = {
      enableRowSelection: true,
      enableRowHeaderSelection: false,
      showGridFooter:true,
      enableFiltering: true,

      data:data
    };

    $scope.gridOptions.columnDefs = [
         { name: 'Id', field: '_id', visible: false },
         { name: 'Name', field: 'name', cellTemplate: '<span style="padding-left: 3px"><a href="{{row.entity.url}}"> {{ COL_FIELD }} </a></span>', width: '12%'},
         { name: 'Make', field: 'make' },
         { name: 'Processor', field: 'processor'},
         { name: 'Aio', field: 'Aio', displayName: 'Analog I/O' },
         { name: 'dio', field:  'dio', displayName: 'digital IO/PWM' },
         { name: 'V_opp_in', field: 'V_opp_in', displayName: 'Volts opperation/input' },
         { name: 'speed', field: 'speed'   },
         { name: 'EEprom', field:  'EEprom', displayName: 'EEPROM [kb]',  visible: false},
         { name: 'SRAM', field:  'SRAM',  displayName: 'SRAM [kb]',  visible: false },
         { name: 'Flash', field: 'Flash', displayName: 'Flash [kb]'  },
         { name: 'voltage', field: 'voltage', displayName: 'Voltage',  visible: false },
         { name: 'USB', field:  'USB'},
         { name: 'UART', field: 'UART', visible: false },

      ];

      $scope.gridOptions.multiSelect = false;
      $scope.gridOptions.modifierKeysToMultiSelect = false;
      $scope.gridOptions.noUnselect = true;
      $scope.gridOptions.onRegisterApi = function( gridApi ) {
        $scope.gridApi = gridApi;
      };

    $scope.toggleRowSelection = function() {
      $scope.gridApi.selection.clearSelectedRows();
      $scope.gridOptions.enableRowSelection = !$scope.gridOptions.enableRowSelection;
      $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.OPTIONS);
    };

    // $interval whilst we wait for the grid to digest the data we just gave it
    $interval( function() {$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);}, 0, 1);




  }
]);
