 'use strict';

angular.module('ticketyApp')
  .controller('computerGameBoardCtrl', function ($scope, $rootScope, $timeout, angularFire) {
      
    $scope.name = "Tickety";
    $rootScope.current_page = "computer_game_board";


    var ref = new Firebase('https://tictactoedata.firebaseio.com/');
    // $scope.leaderData = {};
    var p = angularFire(ref, $scope, "leaderData");


    

      $scope.leaderData = {name:
        {
        
        }
      };

    p.then(function(){
      console.log("Data loaded!")

    });

    $scope.getName = function(){
      $scope.userName = prompt("What's your name?");
      console.log($scope.userName);
    }

    $scope.addWinToLeaderBoard = function(){
      if($scope.userName) {
        if ($scope.leaderData.name.hasOwnProperty($scope.userName)){
          $scope.leaderData.name[$scope.userName]++;
        } else {
          $scope.leaderData.name[$scope.userName] = 1;
        }
      }
    };




    $scope.click = function(i) {
      console.log("This is " + i);
    }


    // var currentSymbol = "x";
$scope.currentSymbol="x";
// var turnNum = 0;
$scope.turnNum=0;
$scope.cell=[];





$scope.turn = function() {
      $scope.turnNum += 1;
};


 $scope.handleClick = function(location) {
  if ($scope.notOccupied(location)) {
    $scope.makeNextMove(location, $scope.currentSymbol);

    if ($scope.isWinning($scope.currentSymbol)) {
      alert($scope.currentSymbol + " wins!");
      $scope.restartGame();

    } else {
      $scope.swapSymbol();

      if ($scope.turnNum < 9) {
        $scope.selectRandomSquare($scope.currentSymbol);
        if ($scope.isWinning($scope.currentSymbol)) {
          console.log($scope.currentSymbol);
          console.log($scope.cell);
          alert( "O Wins!");
          $scope.restartGame();
        } else {
          $scope.swapSymbol();
        }
      } else {
        $scope.swapSymbol();

      }
      
    }
  } else {
    // do nothing
  }
  if ($scope.turnNum == 9) {
    alert("Nobody wins! Try again!");
    $scope.restartGame();
  }
}

    

$scope.makeNextMove = function(location, symbol) {
  // document.getElementById('cell' + location).classList.add(symbol);
  document.getElementById('cell' + location).innerHTML = symbol;
  $scope.cell[location-1]=symbol;
  $scope.turn();

}

$scope.swapSymbol = function() {
  if ($scope.currentSymbol == "x") {
    $scope.currentSymbol = "o";
  } else {
    $scope.currentSymbol = "x";
  }
}

//
// <div class="cell">X</div>
$scope.notOccupied = function(location) {
  var contentAtLocation = document.getElementById("cell" + location).innerHTML;
  var result = (contentAtLocation == "");
  return result;
};




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

// Lab 3
$scope.selectRandomSquare=function(currentPlayer) {
  var randomNumber;

  do {
    randomNumber = Math.floor((Math.random()*9)+1);
  } while( !$scope.notOccupied(randomNumber) );

  $scope.makeNextMove(randomNumber, currentPlayer);
}

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