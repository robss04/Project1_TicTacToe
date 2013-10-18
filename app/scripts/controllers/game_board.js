'use strict';

angular.module('ticketyApp')
    .controller('gameBoardCtrl', function($scope, $routeParams, angularFire, $timeout) {
        $scope.mySymbol = $routeParams.mySymbol;
        $scope.myTurn = false;
        $scope.turnNum = 0;
        $scope.endGame = false;

        $scope.gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        var gameBoardRef = new Firebase("https://robss04tictactoe.firebaseio.com/room/" + $routeParams.id);
        $scope.promise = angularFire(gameBoardRef, $scope, "gameBoard", []);

        $scope.promise.then(function() {
            // $scope.gameBoard = [];
            $scope.gameBoard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
            if ($routeParams.mySymbol == 'x') {
                console.log("I am First Move: Symbol: " + $routeParams.mySymbol);
                $scope.myTurn = true;
            } else {
                console.log("I am Second Move: Symbol: " + $routeParams.mySymbol);
                $scope.myTurn = false;
            }
        });

        gameBoardRef.on('value', function(snapshot) {
            console.log("wait received");
            if (!$scope.endGame && !$scope.myTurn) {
                if (snapshot.val() != null) {
                    if (!arrays_equal(snapshot.val(), $scope.gameBoard)) {
                        console.log("diff gameboard - data from remote");
                        if ($scope.testForLose($scope.mySymbol, snapshot.val())) {
                            console.log("opponent won. you lost.");
                            $timeout(function() {
                                window.alert("You lost!");
                            }, 50);
                            $scope.endGame = true;
                        } else if ($scope.testForCat()) {
                            console.log("Cat Won");
                            $scope.mySymbol = 'Cat';
                            $scope.endGame = true;
                        } else {
                            console.log("my turn. I can pick a square");
                            $scope.myTurn = true;
                            $scope.turnNum++;
                        }
                        console.log("After opponent click: turn # " + $scope.turnNum + "$scope.gameBoard: " + snapshot.val().join(""));
                    } else {
                        console.log("same gameboard");
                    }
                } else {
                    console.log("snapshot is empty");
                }
            } else {
                console.log("it is my turn but I receive ");
            }
        });


        $scope.listenForMyClick = function(index) {
            if (!$scope.endGame) {
                if ($scope.myTurn && !$scope.isOccupied(index)) {
                    console.log("I clicked on index: " + index);

                    $scope.gameBoard[index] = $scope.mySymbol;

                    if ($scope.testForWin($scope.mySymbol, $scope.gameBoard)) {
                        $timeout(function() {
                            window.alert('You won!');
                        }, 50);
                        $scope.endGame = true;
                    } else if ($scope.testForCat()) {
                        $scope.mySymbol = 'Cat';
                        $scope.endGame = true;
                    } else {
                        $scope.myTurn = false;
                        $scope.turnNum++;
                    }

                    console.log("After my click: turn # " + $scope.turnNum + "$scope.gameBoard: " + $scope.gameBoard.join(""));
                } else {
                    alert("It's NOT your turn fool!");
                }
            }
        }

        $scope.isOccupied = function(index) {
            return ($scope.gameBoard[index] === 'x' || $scope.gameBoard[index] === 'o');
        }

        // TODO  Shared functions => service!
        var X_WIN_PATTERNS = [
            'xxx......',
            '...xxx...',
            '......xxx',
            'x..x..x..',
            '.x..x..x.',
            '..x..x..x',
            'x...x...x',
            '..x.x.x..'
        ];
        var O_WIN_PATTERNS = X_WIN_PATTERNS.map(function(str) {
            return str.replace(/x/g, 'o');
        });

        function arrays_equal(a, b) {
            return !(a < b || b < a);
        }




        $scope.testForWin = function(playerSymbol, gameBoardData) {
            console.log("hi testForWin has been fired!")
            $scope.gameBoardStr = gameBoardData.join("");
            var patt1 = /\s/g;
            var properStr = $scope.gameBoardStr.replace(patt1, '.');
            console.log("I'm gameboard string: " + properStr)
            if (playerSymbol == "x") {
                var patterns = X_WIN_PATTERNS;
            } else {
                var patterns = O_WIN_PATTERNS;
            };

            for (var i = 0; i < patterns.length; i++) {
                var re = new RegExp(patterns[i], "i");
                if (properStr.match(re)) {
                    console.log("Pattern Matching success. We Won");
                    return true;
                };
            };

            return false;
        }

        $scope.testForLose = function(mySymbol, gameBoardData) {
            var opponentSymbol = mySymbol == "x" ? "o" : "x";
            return $scope.testForWin(opponentSymbol, gameBoardData);
        }

        $scope.testForCat = function() {
            return ($scope.turnNum === 9);
        }

        $scope.minutes = "00";
        $scope.seconds = "00";
        $scope.totalTimeInSeconds = 0;

        $scope.startTimer = function() {

            $scope.callTimer = $timeout(function timerFunction() {
                $scope.totalTimeInSeconds += 1;

                $scope.minutes = $scope.zeroPaddingFunc(Math.floor($scope.totalTimeInSeconds / 60));
                $scope.seconds = $scope.zeroPaddingFunc($scope.totalTimeInSeconds % 60);

                $scope.callTimer = $timeout(timerFunction, 1000);
            }, 1000);
        };

        $scope.endTimer = function() {
            $timeout.cancel($scope.callTimer);
        };

        $scope.resetTimer = function() {
            $scope.minutes = "00";
            $scope.seconds = "00";
            $scope.totalTimeInSeconds = 0;

            $timeout.cancel($scope.callTimer);
        }

        $scope.zeroPaddingFunc = function(value) {
            if ((value >= 0) && (value < 10))
                return "0" + value;
            else return value;
        };


    });