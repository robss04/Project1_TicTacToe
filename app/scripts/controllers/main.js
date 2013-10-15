'use strict';

angular.module('ticketyApp')
  .controller('mainCtrl', function ($scope, $rootScope) {

    console.log("Inside Main");

    $rootScope.gameboard_page = false;
    $rootScope.home_page = true;
    $rootScope.how_to_page = false;

  	
  });