let arrBoxNumbers = [];
let winArrBoxNumbers = [];
let number = 1;
let emptyCell_i;
let emptyCell_j;
let previousCord = { i: -1, j: -1 };
const shuffleMaxCount = 40;
let timer;

const gameField = document.getElementById('gameField');


window.onload = function () {
	Game();
	document.getElementById('reset').onclick = Game;
	document.getElementById('resort').onclick = Resort;
	document.getElementById('findWinComboBtn').onclick = findWinningCombo;
}

function cellOnclick(event) {

	//console.log(event); 
	let cellClick = event.target;

	//console.log(cellClick);
	//console.log(cellClick.id.split('')[0]);
	//console.log(cellClick.id.split('')[1]);

	//выборка координат кликнутой клетки по ее id
	let i = cellClick.id.split('')[0];
	let j = cellClick.id.split('')[1];

	//если на одной строке или одном столбце и на соседней клетке
	if (i == emptyCell_i && ((j - emptyCell_j) == 1 || (j - emptyCell_j) == -1) || j == emptyCell_j && (i - emptyCell_i == 1 || i - emptyCell_i == -1)) {

		//в пустую клетку переходит число из кликнутой клетки кликнутая становится пустой
		document.getElementById(emptyCell_i + '' + emptyCell_j).innerHTML = cellClick.innerHTML;
		cellClick.innerHTML = '';    //кликнутая становится пустой
		emptyCell_i = i;              //коорд.новой пустой ячейки
		emptyCell_j = j;
	}

	// проверка на выиграш
	let winCheck = true;

	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			if (document.getElementById(i + '' + j).innerHTML != winArrBoxNumbers[i][j])
				winCheck = false;
		}
	}
	if (winCheck) {
		setTimeout("alert('Win combo!!!!')", 300);
	}
}

function Resort() {
	// arrBoxNumbers = shuffleArray(arrBoxNumbers);
	// updateGameField();
	// updateEmptyCellCoordinates();
	let shuffleCount = 0;
	if (shuffleCount === 0) {
		timer = setInterval(() => {
			arrBoxNumbers = shuffleArray(arrBoxNumbers);
			updateGameField();
			updateEmptyCellCoordinates();
			shuffleCount++;
			if (shuffleCount >= shuffleMaxCount) {			
				clearInterval(timer);
			}
		}, 200);
	}


}

function shuffleArray(array) {
	// array.sort(() => Math.random() - 0.5);
	// for (i = 0; i < 4; ++i) {
	// 	array[i].sort(() => Math.random() - 0.5);
	// }	
	//  array;

	let arrValidCoord = [];      //массив под координаты клеток, которые могут сделать ход
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (i == emptyCell_i && ((j - emptyCell_j) == 1 || (j - emptyCell_j) == -1) || j == emptyCell_j && (i - emptyCell_i == 1 || i - emptyCell_i == -1)) {
				arrValidCoord.push({ i, j });
			}
		}
	}

	arrValidCoord = arrValidCoord.filter(coord => !(coord.i === previousCord.i && coord.j === previousCord.j));

	let oneRandomValidCoord = arrValidCoord[Math.floor(Math.random() * arrValidCoord.length)];

	array[emptyCell_i][emptyCell_j] = array[oneRandomValidCoord.i][oneRandomValidCoord.j];
	array[oneRandomValidCoord.i][oneRandomValidCoord.j] = '';
	previousCord = { i: emptyCell_i, j: emptyCell_j };
	//console.log(array);
	return array;
}

function createTableCell(id, content) {
	let cell = document.createElement("td");
	cell.id = id;
	cell.innerHTML = content;
	cell.onclick = cellOnclick;
	return cell;
}

function updateGameField() {
	let table = document.createElement("table");

	for (let i = 0; i < 4; ++i) {
		let row = document.createElement("tr");

		for (let j = 0; j < 4; ++j) {
			let cell = createTableCell(i + '' + j, arrBoxNumbers[i][j]);
			row.appendChild(cell);
		}

		table.appendChild(row);
	}


	if (gameField.childNodes.length == 1) {
		gameField.removeChild(gameField.firstChild);
	}
	gameField.appendChild(table);
}

function updateEmptyCellCoordinates() {
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (arrBoxNumbers[i][j] === '') {
				emptyCell_i = i;
				emptyCell_j = j;
				return;
			}
		}
	}
}

function Game() {
	number = 1;
	for (i = 0; i < 4; i++) {
		arrBoxNumbers[i] = [];
		for (j = 0; j < 4; j++) {
			arrBoxNumbers[i][j] = number++;
			if (i == 3 && j == 3) { arrBoxNumbers[i][j] = ''; }
		}
	}
	winArrBoxNumbers = arrBoxNumbers;  //выиграшная комбинация
	//console.log(arrBoxNumbers);

	//индекс пустой клетки
	updateEmptyCellCoordinates();
	//console.log(emptyCell_i + ' ' + emptyCell_j);

	let table = document.createElement("table");  //таблица
	for (i = 0; i < 4; ++i) {

		let row = document.createElement("tr");         //строки
		for (j = 0; j < 4; ++j) {
			let cell = createTableCell(i + '' + j, arrBoxNumbers[i][j]);

			row.appendChild(cell);
		}

		table.appendChild(row);
	}

	//убираем предыдущую таблицу после кнопки reset 
	if (gameField.childNodes.length == 1) { gameField.removeChild(gameField.firstChild); }
	gameField.appendChild(table);
}

function findWinningCombo() {
	// Shuffle the array and update the game field
	Resort();

	// Start the recursive method to find the winning combination
	findWinningComboRecursive(1);
}

function findWinningComboRecursive(a) {
	a = a || 1;
	function recursiveStep() {
		// Perform some logic to simulate computer moves
		// For simplicity, let's just perform a random move
		const randomRow = Math.floor(Math.random() * 4);
		const randomCol = Math.floor(Math.random() * 4);

		// Simulate a computer move
		cellOnclick({ target: document.getElementById(randomRow + '' + randomCol) });

		// Check for the winning condition
		let winCheck = true;

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (document.getElementById(i + '' + j).innerHTML != winArrBoxNumbers[i][j])
					winCheck = false;
			}
		}

		// If not a winning condition, continue the recursion
		if (!winCheck) {
			setTimeout(() => {
				recursiveStep();
			}, 300);
		} else {
			alert(a);
		}
	}

	// Start the recursion
	recursiveStep();
}

