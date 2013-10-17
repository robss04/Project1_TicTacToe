'use strict';

angular.module('ticketyApp')
  .controller('mainCtrl', function ($scope, $rootScope) {

    console.log("Inside Main");

    $rootScope.current_page = 'home_page';

  	
  });