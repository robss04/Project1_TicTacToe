 'use strict';

angular.module('ticketyApp')
  .controller('gameBoardCtrl', function ($scope, $rootScope, $timeout, $routeParams, angularFire) {
    $scope.name = "Tickety";
    $rootScope.current_page = "match_player";

    $scope.gameBoardId = $routeParams.id;
    $scope.mySymbol = $routeParams.mySymbol;   

    $scope.cell=[];    
    $scope.gameBoard={cell:['','','','','','','','','']};
    var gameBoardRef = new Firebase("https://robss04tictactoe.firebaseio.com/room/" + $routeParams.id);
    $scope.promise = angularFire(gameBoardRef, $scope, "gameBoard");





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


    $scope.click = function(i) {
      console.log("This is " + i);
    }


// var currentSymbol = "x";
$scope.mySymbol="x";
// var turnNum = 0;
$scope.turnNum=0;


$scope.turn = function() {
      $scope.turnNum += 1;
};


$scope.promise.then (function () {
    if ($scope.cell.length == 0 && $routeParams.mySymbol == 'x') {
        console.log("I am First Move: Symbol: " + $routeParams.mySymbol);
        $scope.listenForMyClick();
    } else {
        console.log("I am Second Move: Symbol: " + $routeParams.mySymbol);
        // $scope.waitForOpponentToMove();
    }
});


$scope.swapSymbol = function() {
  if ($scope.mySymbol == "x") {
    $scope.mySymbol = "o";
  } else {
    $scope.mySymbol = "x";
  }
}

  $scope.makeMyMove = function(location) {
      $scope.cell[location-1]=$scope.mySymbol;
      $scope.gameBoard.cell[location-1]=$scope.mySymbol;
      $scope.turn();
      // $scope.swapSymbol;
    }
    
   
    $scope.waitForOpponentToMove = function(value) {
      gameBoardRef.on('child_added', function(snapshot) {
        // gameBoardRef.off('child_added');
         $scope.cells = snapshot.val();
        // if ($scope.isLosing()) {
          // print losing
          // redirect to match player if play again
        // } else if ($scope.isDraw()) {
          // print draw
          // redirect to match player if play again
        // } else {
        //   $scope.makeMyMove();
        // }
      });
    };

  

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

    $scope.notOccupied = function(location) {
        var contentInSquare = $scope.gameBoard.cell[location-1];
        var result = (contentInSquare == "");
      return result;
    }


    $scope.listenForMyClick = function(location) {
      // handle click event on cell 
      if ($scope.notOccupied(location)) {
        $scope.makeMyMove(location, $scope.mySymbol);
        
        if ($scope.isWinning($scope.mySymbol)) {
          alert($scope.mySymbol + " wins!");
          $scope.restartGame();
        } else {
          $scope.waitForOpponentToMove;

          if ($scope.turnNum < 9) {
            $scope.makeMyMove($scope.mySymbol);
            if ($scope.isWinning($scope.mySymbol)){
              console.log($scope.mySymbol);
              console.log($scope.cell);
              alert ($scope.mySymbol + " Wins!");
              $scope.restartGame();
            } else {
              $scope.waitForOpponentToMove;
            }
            } else {
              $scope.waitForOpponentToMove;
            }
            }
          } else {
          }
          if ($scope.turnNum == 9) {
            alert("Nobody wins! Try again!");
            $scope.restartGame();
          }
          }
        



    
    
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





$scope.isWinning = function(currentPlayer) {
  // check first row horizontal winning condition
  // isSameSymbolsIn(1, 2, 3, currentPlayer);

  // wrong !!
  for (var i=1; i <= 9; i += 3) {
    if ($scope.isSameSymbolsIn(i, i + 1, i +2, currentPlayer)) {
      return true;
    }
  }

  // check vertical
  for (var i=1; i <= 3; i++) {
    if ($scope.isSameSymbolsIn(i, i + 3, i +6, currentPlayer)) {
      return true;
    }
  }

  // check diagonal
  return $scope.isDiagonalSameSymbols(currentPlayer);
}

$scope.isSameSymbolsIn = function(first_cell_id, second_cell_id, third_cell_id, currentPlayer) {
  var first_comparison = document.getElementById("cell" + first_cell_id).innerHTML == currentPlayer;
  var second_comparison = document.getElementById("cell" + second_cell_id).innerHTML == currentPlayer;
  var third_comparison = document.getElementById("cell" + third_cell_id).innerHTML == currentPlayer;

  var result = first_comparison && second_comparison && third_comparison;

  return result;
}

$scope.isDiagonalSameSymbols=function(currentPlayer) {
  var firstDiagonalCheck = (document.getElementById("cell1").innerHTML == currentPlayer &&
    document.getElementById("cell5").innerHTML == currentPlayer &&
    document.getElementById("cell9").innerHTML == currentPlayer);
  var secondDiagonalCheck = (document.getElementById("cell3").innerHTML == currentPlayer &&
    document.getElementById("cell5").innerHTML == currentPlayer &&
    document.getElementById("cell7").innerHTML == currentPlayer);
  return firstDiagonalCheck || secondDiagonalCheck;
}



// Lab 1
$scope.clearBoard = function() {
  
  console.log($scope.cell);
  for ( var i=1 ; i <= 9; i++ ) {
    var currentCell = document.getElementById("cell" + i);
    $scope.cell[i-1]="";
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

$scope.minutes = $scope.zeroPaddingFunc(Math.floor($scope.totalTimeInSeconds/60));
        $scope.seconds = $scope.zeroPaddingFunc($scope.totalTimeInSeconds%60);

        $scope.callTimer = $timeout(timerFunction, 1000);        
        }, 1000);
};

$scope.endTimer = function() {
$timeout.cancel($scope.callTimer);
};

$scope.resetTimer = function(){
  $scope.minutes = "00";
  $scope.seconds = "00";
  $scope.totalTimeInSeconds = 0;

  $timeout.cancel($scope.callTimer);
}

$scope.zeroPaddingFunc = function(value) {
if ((value >= 0) && (value <10))
return "0"+value;
else return value;
};
  

});













