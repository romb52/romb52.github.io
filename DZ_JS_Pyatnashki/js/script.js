let arrBoxNumbers = [];
let winArrBoxNumbers = [];
let number = 1;
let emptyCell_i;
let emptyCell_j;
let gameField = document.getElementById('gameField');

window.onload = function(){
	Game();
	document.getElementById('reset').onclick = Game;
}

function cellOnclick(event){
 
	//console.log(event); 
	let cellClick = event.target;

	//console.log(cellClick);
	console.log(cellClick.id.split('')[0]);
	console.log(cellClick.id.split('')[1]);

	//выборка координат кликнутой клетки по ее id
	let i = cellClick.id.split('')[0];
	let j = cellClick.id.split('')[1];

	//если на одной строке или одном столбце и на соседней клетке
	if(i == emptyCell_i && ((j - emptyCell_j) == 1 || (j - emptyCell_j) == -1) || j == emptyCell_j && (i - emptyCell_i == 1 || i - emptyCell_i == -1))
	  {
	  console.log(' cell is near ');

	  //в пустую клетку переходит число из кликнутой клетки кликнутая становится пустой
	  document.getElementById(emptyCell_i + '' + emptyCell_j).innerHTML = cellClick.innerHTML;
	  cellClick.innerHTML = '';    //кликнутая становится пустой
	  emptyCell_i = i;              //коорд.новой пустой ячейки
	  emptyCell_j = j;

	} else {console.log(' cell is not near ');}

	// проверка на выиграш

	let winCheck = true; 

	for(i = 0; i < 4; i++){
	    for(j = 0; j < 4; j++){      
	        if(document.getElementById(i + '' + j).innerHTML != winArrBoxNumbers[i][j]) 
	        winCheck = false;       
	    }
	  }

	if(winCheck){
		setTimeout ("alert('Win combo!!!!')", 300);
	}
}

function Game(){
	number = 1;
	for(i = 0; i < 4; i++){
	    arrBoxNumbers[i] = [];
	    for(j = 0; j < 4; j++){      
	        arrBoxNumbers[i][j] = number++;
	        if (i ==3 && j== 3){arrBoxNumbers[i][j] = '';}
	    }
	  }
	winArrBoxNumbers = arrBoxNumbers;  //выиграшная комбинация
	console.log(arrBoxNumbers);


	//сортируем перемешиваем
	// arrBoxNumbers.sort(() => Math.random()-0.5);
	//  for(i = 0; i < 4; ++i){
	//      arrBoxNumbers[i].sort(() => Math.random()-0.5);
	//    }
	//  console.log(arrBoxNumbers);


	//индекс пустой клетки
	for(i = 0; i < 4; i++){    
	    for(j = 0; j < 4; j++){  
	      if(arrBoxNumbers[i][j] == ''){
	        emptyCell_i = i;
	        emptyCell_j = j;
	      }
	    }
	  }
	console.log(emptyCell_i + ' ' + emptyCell_j);


	let table = document.createElement("table");  //таблица
	for(i = 0; i < 4; ++i){

	  let row = document.createElement("tr");         //строки
	      for(j = 0; j < 4; ++j){
	        let cell = document.createElement("td");   // ячейки

	        cell.id = i + '' + j; 

	        cell.innerHTML = arrBoxNumbers[i][j];

	        cell.onclick = cellOnclick;

	        row.appendChild(cell);   
	      }

	  table.appendChild(row);    
	}

	//убираем предыдущую таблицу после кнопки reset 
	if (gameField.childNodes.length == 1) {gameField.removeChild(gameField.firstChild);}
	gameField.appendChild(table);
}

