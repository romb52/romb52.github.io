let img = document.createElement('img');
img.src = "img/knight_dark.svg";
let y,x;
let count = -1;    //счетчик ходов коня
let q = 0;
const step = [[-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1]]; //массив вариантов след.хода коня
let arrChess = []; //массив всех ходов коня

//рекурсивная функция ход коня
function knightMove (y, x){

console.log('count: ' + count + 'pc steps:' + q++);

//проверка на выход за пределы доски
if (y < 0 || y >= 6 || x < 0 || x >= 6)	return false;

//проверка на занятость клетки
if (arrChess[y][x] != 0 ) return false;

//следующий ход
count ++;
arrChess[y][x] = count;

//условие выхода из рекурсии 
if (count == 35) return true;

//8 возможных ходов коня
for (let i = 0; i < 8; i++){
	if(knightMove (+y + step[i][0], +x + step[i][1])) return true;
}

//если функция вернула false (вышли за пределы доски или уже занята клетка), то возращаем ноль ячейке и отнимаем ход на счетчике
	count --;
	arrChess[y][x] = 0;	
	return false; 
}

const start = (event) => { 
	if (event.innerHTML == 'X') return;
    event.appendChild(img);        //добавляем рисунок коня в выбранную клетку
    let cellClick = event;
    y = cellClick.id[0];           //координаты стартовой клетки с конем
    x = cellClick.id[1];    

//можно работать напрямую с таблицей через document.getElementById(y +''+ x).innerHTML, но чаще зависает.
//заполняем вспомогательный массив нулями
    for(i = 0; i < 6; i++){          
	    arrChess[i] = [];
	    for(j = 0; j < 6; j++){      
	        arrChess[i][j] = 0 ;	        
	    }
	  }	   

	//console.log(arrChess);

//после вызова и отработки рекурсии данные из arrChess копируем в таблицу
	if(knightMove(y, x)){
		//console.log(arrChess);
	  	for(i = 0; i < 6; i++){	   
		    for(j = 0; j < 6; j++){ 
		    	if(arrChess[i][j] == 0)continue;     
		        document.getElementById(i +''+ j).innerHTML = arrChess[i][j] ;	        
		    }
		}
	}
};


