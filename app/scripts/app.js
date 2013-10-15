// var currentSymbol = "x";
// // $scope.currentSymbol="x";
// var turnNum = 0;
// // $scope.turnNum


// function turn() {
//       turnNum += 1;
// };


// function handleClick(location) {
//   if (notOccupied(location)) {
//     makeNextMove(location, currentSymbol);

//     if (isWinning(currentSymbol)) {
//       alert( currentSymbol + " wins!");
//       clearBoard();
//     } else {
//       swapSymbol();

//       if (turnNum < 9) {
//         selectRandomSquare(currentSymbol);
//         if (isWinning(currentSymbol)) {
//           alert( "you lose !");
//           restartGame();
//         } else {
//           swapSymbol();
//         }
//       } else {
//         swapSymbol();

//       }
      
//     }
//   } else {
//     // do nothing
//   }
//   if (turnNum == 9) {
//     alert("No body wins! CAT!");
//     restartGame();
//   }
// }

// function makeNextMove(location, symbol) {
//   document.getElementById('cell' + location).classList.add(symbol);
//   document.getElementById('cell' + location).innerHTML = symbol;
//   turn();

// }

// function swapSymbol() {
//   if (currentSymbol == "x") {
//     currentSymbol = "o";
//   } else {
//     currentSymbol = "x";
//   }
// }

// //
// // <div class="cell">X</div>
// function notOccupied(location) {
//   var contentAtLocation = document.getElementById("cell" + location).innerHTML;
//   var result = (contentAtLocation == "");
//   return result;
// }

// function isWinning(currentPlayer) {
//   // check first row horizontal winning condition
//   // isSameSymbolsIn(1, 2, 3, currentPlayer);

//   // wrong !!
//   for (var i=1; i <= 9; i += 3) {
//     if (isSameSymbolsIn(i, i + 1, i +2, currentPlayer)) {
//       return true;
//     }
//   }

//   // check vertical
//   for (var i=1; i <= 3; i++) {
//     if (isSameSymbolsIn(i, i + 3, i +6, currentPlayer)) {
//       return true;
//     }
//   }

//   // check diagonal
//   return isDiagonalSameSymbols(currentPlayer);
// }

// function isSameSymbolsIn(first_cell_id, second_cell_id, third_cell_id, currentPlayer) {
//   var first_comparison = document.getElementById("cell" + first_cell_id).innerHTML == currentPlayer;
//   var second_comparison = document.getElementById("cell" + second_cell_id).innerHTML == currentPlayer;
//   var third_comparison = document.getElementById("cell" + third_cell_id).innerHTML == currentPlayer;

//   var result = first_comparison && second_comparison && third_comparison;

//   return result;
// }

// function isDiagonalSameSymbols(currentPlayer) {
//   var firstDiagonalCheck = (document.getElementById("cell1").innerHTML == currentPlayer &&
//     document.getElementById("cell5").innerHTML == currentPlayer &&
//     document.getElementById("cell9").innerHTML == currentPlayer);
//   var secondDiagonalCheck = (document.getElementById("cell3").innerHTML == currentPlayer &&
//     document.getElementById("cell5").innerHTML == currentPlayer &&
//     document.getElementById("cell7").innerHTML == currentPlayer);
//   return firstDiagonalCheck || secondDiagonalCheck;
// }



// // Lab 1
// function clearBoard() {
//   for ( var i=1 ; i <= 9; i++ ) {
//     var currentCell = document.getElementById("cell" + i);

//     // <div class="cell x">x</div>
//     // <div class="cell o">o</div>
//     // <div class="cell">x</div>
//     currentCell.innerHTML = "";
//     currentCell.classList.remove("x");
//     currentCell.classList.remove("o");
//   }
//   // clear class list
// }

// // Lab 2
// function restartGame() {
//   // setTimeout(function() { clearBoard(); }, 1000);
//   currentSymbol = "x";
//   turnNum = 0;
//   clearBoard();
// }

// // Lab 3
// function selectRandomSquare(currentPlayer) {
//   var randomNumber;

//   do {
//     randomNumber = Math.floor((Math.random()*9)+1);
//   } while( !notOccupied(randomNumber) );

//   makeNextMove(randomNumber, currentPlayer);
// }



//Lab 4
//add Go Back button at gameboard screen
'use strict';


angular.module('LocalStorageModule').value('prefix', 'gaWdiDatabase');





angular.module('ticketyApp', ['LocalStorageModule'])
	.config(function($routeProvider){
		$routeProvider
			.when('/game_board', {
				templateUrl: 'views/game_board.html',
				controller: 'gameBoardCtrl'
			})
			.when('/how_to', {
				templateUrl: 'views/how_to.html',
				controller: 'HowToCtrl'
			})
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'mainCtrl'
			})			
			.otherwise({
				redirectTo: '/'
			})
	});




