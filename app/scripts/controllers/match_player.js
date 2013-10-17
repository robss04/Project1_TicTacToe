'use strict';

angular.module('ticketyApp')
	.controller('MatchPlayerCtrl', function($scope, $rootScope, angularFire, $location, $routeParams){
		$scope.waitingRoom = {}; 
		var waitingRoomRef = new Firebase('https://robss04tictactoe.firebaseio.com/waiting_room');
		$scope.promise = angularFire(waitingRoomRef, $scope, "waitingRoom");

		// $scope.promise.then (function(){
		// 	$scope.waitingRoom = {xJoined: true, gameBoardNumber: generateGameBoardNumber()};
		// });	


	function generateGameBoardNumber(){
		return Math.floor(Math.random() *16777215).toString(16);
	}

	$scope.promise.then (function(){
		if ($scope.waitingRoom.xJoined==true) {
			$scope.joinWaitingRoom();
		} else {
			$scope.createWaitingRoom();
		}
	});

	$scope.createWaitingRoom=function(){
		$scope.waitingRoom={xJoined: true, gameBoardNumber: generateGameBoardNumber()};
		$scope.noticeMessage = "You are x, waiting for opponent.";

		waitingRoomRef.on('child_removed', function(snapshot){
			$location.path('game_board/' + $scope.waitingRoom.gameBoardNumber + '/x/');
		});
	}

	$scope.joinWaitingRoom = function(){
		var gameBoardNumber = $scope.waitingRoom.gameBoardNumber;
		$scope.waitingRoom = {};

		$location.path('game_board/' + gameBoardNumber + '/o');
	}


  $rootScope.current_page = 'match_player';
	});



	