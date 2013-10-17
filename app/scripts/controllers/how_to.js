'use strict';

angular.module('ticketyApp')
  .controller('HowToCtrl', function($scope, $rootScope) {
    	$scope.how = "Tic Tac Toe is a two-player game. One player is X and the other is O. Players take turns marking the spaces in a 3×3 grid. The player who succeeds first in placing three respective marks in a horizontal, vertical, or diagonal row wins the game."

    $rootScope.current_page = "how_to";

  });