 'use strict';

 angular.module('ticketyApp')
     .controller('gameBoardCtrl', function($scope, $rootScope, $timeout, $routeParams, angularFire) {
         $scope.name = "Tickety";
         $rootScope.current_page = "match_player";

         $scope.gameBoardId = $routeParams.id;
         $scope.mySymbol = $routeParams.mySymbol;

         $scope.cell = [];
         $scope.gameBoard = {
             cell: ['', '', '', '', '', '', '', '', '']
         };
         var gameBoardRef = new Firebase("https://robss04tictactoe.firebaseio.com/room/" + $routeParams.id);
         $scope.promise = angularFire(gameBoardRef, $scope, "gameBoard");


         // $scope.mySymbol="x";
         $scope.turnNum = 0;
         $scope.endGame = false;
         $scope.myTurn = false;

         // $scope.turn = function() {
         //       $scope.turnNum += 1;
         // };


         $scope.promise.then(function() {
             // $scope.gameBoard = [];
             if ($routeParams.mySymbol == 'x') {
                 console.log("I am First Move: Symbol: " + $scope.mySymbol);
                 $scope.myTurn = true;
             } else {
                 console.log("I am Second Move: Symbol: " + $scope.mySymbol);
                 $scope.myTurn = false;
             }
         });

         function arrays_equal(a, b) {
             return !(a < b || b < a);
         }

         gameBoardRef.on('value', function(snapshot) {
             console.log("wait received");
             if (!$scope.myTurn && !$scope.endGame) {
                 if (snapshot.val().cell != null) {
                     if (!arrays_equal(snapshot.val(), $scope.gameBoard.cell)) {
                         console.log("diff gameboard");
                         if ($scope.testForLose($scope.mySymbol, snapshot.val().cell)) {
                             // print losing
                             // redirect to match player if play again
                             console.log("opponent wins!");
                             $timeout(function() {
                                 window.alert("You lose!");
                             }, 50);
                             $scope.endGame = true;

                         } else if ($scope.testForCat()) {
                             // print draw
                             // redirect to match player if play again
                             console.log("Nobody wins! Try again!");
                             $scope.mySymbol = 'Cat';
                             $scope.endGame = true;
                         } else {
                             console.log("Changed myTurn to true");
                             $scope.myTurn = true;
                             $scope.turnNum++;
                         }
                         console.log("After opponent click: turn # " + $scope.turnNum + "$scope.gameBoard: " + snapshot.val().cell.join(""));
                     } else {
                         console.log("same gameboard");
                         console.log($scope.myTurn);
                     }
                 } else {
                     console.log("snapshot is empty");
                 }
             } else {
                 console.log("it is not my turn but I receive ");
             }
         });


         // $scope.makeMyMove = function(index) {
         //     $scope.cell[index-1]=$scope.mySymbol;
         //     $scope.gameBoard.cell[index-1]=$scope.mySymbol;
         //     $scope.turn();
         //   }


         $scope.listenForMyClick = function(index) {
             // handle click event on cell 
             if (!$scope.endGame) {
                 if ($scope.myTurn && !$scope.isOccupied(index)) {

                     $scope.gameBoard.cell[index] = $scope.mySymbol;

                     if ($scope.testForWin($scope.mySymbol, $scope.gameBoard.cell)) {
                         $timeout(function() {
                             window.alert('You win!');
                         }, 50);
                         $scope.endGame = true;
                     } else if ($scope.testForCat()) {
                         $scope.mySymbol = 'cat';
                         $scope.endGame = true;
                     } else {
                         $scope.myTurn = false;
                         $scope.turnNum++;
                     }

                     console.log("After my click, turn #: " + $scope.turnNum + "$scope.gameBoard: " + $scope.gameBoard.cell.join(''));
                 } else {
                     alert("It's not your turn!");
                 }
             }
         }

         $scope.isOccupied = function(index) {
             return ($scope.gameBoard.cell[index] === 'x' || $scope.gameBoard.cell[index] === 'o');
         }

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





         // $scope.makeMyMove(index);

         // if ($scope.isWinning($scope.mySymbol)) {
         //   alert($scope.mySymbol + " wins!");
         //   $scope.restartGame();
         // } else {
         //   // $scope.waitForOpponentToMove;

         //   if ($scope.turnNum <= 9) {
         //     $scope.makeMyMove($scope.mySymbol);
         //     if ($scope.isWinning($scope.mySymbol)){
         //       console.log($scope.mySymbol);
         //       console.log($scope.cell);
         //       alert ($scope.mySymbol + " Wins!");
         //       $scope.restartGame();
         //     } else {
         //       // $scope.waitForOpponentToMove;
         //     }
         //     } else {
         //       // $scope.waitForOpponentToMove;
         //     }
         //     }
         //   } else {
         //   }
         //   if ($scope.turnNum == 9) {
         //     alert("Nobody wins! Try again!");
         //     $scope.restartGame();
         //   }
         //   }



         // $scope.listenForMyClick = function(index) {
         //     if ($scope.myTurn) {
         //       $scope.gameBoard[index] = $scope.mySymbol;

         //       if ($scope.isWinning()) {
         //         // print winning
         //         // redirect to match player if play again
         //         alert($scope.mySymbol + " wins!");
         //         restartGame()
         //       } else if ($scope.isDraw()) {
         //         // print draw
         //         // redirect to match player if play again
         //       } else {
         //         $scope.myTurn = false;
         //       }
         //     }
         //   }

         // $scope.waitForOpponentToMove = function(value) {
         //   gameBoardRef.once('child_changed', function(snapshot) {
         //     // gameBoardRef.off('child_added');
         //       $scope.cell = snapshot(value);
         //     }}




         // $scope.makeMyMove = function() {


         // $scope.listenForMyClick();

         // if ($scope.isWinning()) {
         //   // print winning
         //   // redirect to match player if play again
         //   alert($scope.currentSymbol + " wins!")
         //   $scope.restartGame();
         // } else if ($scope.turnNum == 9) {
         //   // print draw
         //   // redirect to match player if play again equal to 9, no one wins
         //     alert("Nobody wins! Try again!")
         //     $scope.restartGame();
         //   // } else {
         //   // $scope.waitForOpponentToMove();
         // }
         // }

         // $scope.notOccupied = function(index) {
         //     var contentInSquare = $scope.gameBoard[index];
         //     var result = (contentInSquare == "");
         //   return result;
         // }







         // $scope.isLosing = function() {
         //   return false; 
         // }

         // $scope.isWinning = function() {
         //   return false; 
         // }

         // $scope.isDraw = function() {
         //   return false; 
         // }    
         // };
         //  $scope.handleClick = function(location) {
         //   if ($scope.notOccupied(location)) {
         //     $scope.makeNextMove(location, $scope.currentSymbol);

         //     if ($scope.isWinning($scope.currentSymbol)) {
         //       alert($scope.currentSymbol + " wins!");
         //       $scope.addNumberOfXWins();
         //       $scope.restartGame();

         //     } else {
         //       $scope.swapSymbol();

         //       if ($scope.turnNum < 9) {
         //         $scope.selectRandomSquare($scope.currentSymbol);
         //         if ($scope.isWinning($scope.currentSymbol)) {
         //           console.log($scope.currentSymbol);
         //           console.log($scope.cell);
         //           alert( "O Wins!");
         //           $scope.addNumberOfOWins();
         //           $scope.restartGame();
         //         } else {
         //           $scope.swapSymbol();
         //         }
         //       } else {
         //         $scope.swapSymbol();

         //       }

         //     }
         //   } else {
         //     // do nothing
         //   }
         //   if ($scope.turnNum == 9) {
         //     alert("Nobody wins! Try again!");
         //     $scope.restartGame();
         //   }
         // }

         // $scope.swapSymbol = function() {
         //   if ($scope.currentSymbol == "x") {
         //     $scope.currentSymbol = "o";
         //   } else {
         //     $scope.currentSymbol = "x";
         //   }
         // }

         //
         // <div class="cell">X</div>





         // $scope.isWinning = function(currentPlayer) {
         //   // check first row horizontal winning condition
         //   // isSameSymbolsIn(1, 2, 3, currentPlayer);

         //   // wrong !!
         //   for (var i=1; i <= 9; i += 3) {
         //     if ($scope.isSameSymbolsIn(i, i + 1, i +2, currentPlayer)) {
         //       return true;
         //     }
         //   }

         //   // check vertical
         //   for (var i=1; i <= 3; i++) {
         //     if ($scope.isSameSymbolsIn(i, i + 3, i +6, currentPlayer)) {
         //       return true;
         //     }
         //   }

         //   // check diagonal
         //   return $scope.isDiagonalSameSymbols(currentPlayer);
         // }

         // $scope.isSameSymbolsIn = function(first_cell_id, second_cell_id, third_cell_id, currentPlayer) {
         //   var first_comparison = document.getElementById("cell" + first_cell_id).innerHTML == currentPlayer;
         //   var second_comparison = document.getElementById("cell" + second_cell_id).innerHTML == currentPlayer;
         //   var third_comparison = document.getElementById("cell" + third_cell_id).innerHTML == currentPlayer;

         //   var result = first_comparison && second_comparison && third_comparison;

         //   return result;
         // }

         // $scope.isDiagonalSameSymbols=function(currentPlayer) {
         //   var firstDiagonalCheck = (document.getElementById("cell1").innerHTML == currentPlayer &&
         //     document.getElementById("cell5").innerHTML == currentPlayer &&
         //     document.getElementById("cell9").innerHTML == currentPlayer);
         //   var secondDiagonalCheck = (document.getElementById("cell3").innerHTML == currentPlayer &&
         //     document.getElementById("cell5").innerHTML == currentPlayer &&
         //     document.getElementById("cell7").innerHTML == currentPlayer);
         //   return firstDiagonalCheck || secondDiagonalCheck;
         // }



         // Lab 1
         $scope.clearBoard = function() {

             console.log($scope.cell);
             for (var i = 1; i <= 9; i++) {
                 var currentCell = document.getElementById("cell" + i);
                 $scope.cell[i - 1] = "";
                 // <div class="cell x">x</div>
                 // <div class="cell o">o</div>
                 // <div class="cell">x</div>
                 currentCell.innerHTML = "";
                 currentCell.classList.remove("x");
                 currentCell.classList.remove("o");
             }
             // clear class list
         }

         // Lab 2
         $scope.restartGame = function() {
             // setTimeout(function() { clearBoard(); }, 1000);
             $scope.currentSymbol = "x";
             $scope.turnNum = 0;
             $scope.clearBoard();
         }

         //timer

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




         // var ref = new Firebase('https://robss04tictactoe.firebaseio.com/');
         // // $scope.leaderData = {};
         // var p = angularFire(ref, $scope, "leaderData");



         //   $scope.leaderData = {name:
         //     {

         //     }
         //   };

         // p.then(function(){
         //   console.log("Data loaded!")

         // });

         // $scope.getName = function(){
         //   $scope.userName = prompt("What's your name?");
         //   console.log($scope.userName);
         // }

         // $scope.addWinToLeaderBoard = function(){
         //   if($scope.userName) {
         //     if ($scope.leaderData.name.hasOwnProperty($scope.userName)){
         //       $scope.leaderData.name[$scope.userName]++;
         //     } else {
         //       $scope.leaderData.name[$scope.userName] = 1;
         //     }
         //   }
         // };




     });