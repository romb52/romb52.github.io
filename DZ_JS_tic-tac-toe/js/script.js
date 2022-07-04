let num = 0;
let win = false;
let draw = false;
//let id = -1;
let currentTurn = document.getElementById('current-turn');


//////////////////////// Ход игрока - анализ хода - ход пк - анализ хода //////////////////////////////////

function step(event){
	
		if (event.innerHTML == ''){				
			event.innerHTML = 'X';			
			analiz(event, 'X');
		if (win == true || draw == true){
			restart (event);
		}
		if(num==1){	
			AiFirstTurn(event);
		} else if (num>1 && (win == false || draw == false)){
			AiNextTurn(event);
			analiz(event, '0');
			}
		}
		if (win == true || draw ==true){
			restart (event);
		}
			
}

//////////////////////////////// первый ход пк ///////////////////////////////////

function AiFirstTurn(event){

	let tr = event.parentNode.parentNode;
	let AiArr = getArray(event);
	let aiCoordX, aiCoordY;                    // координаты ячейки для хода пк
	do                                         //генерируем случайные координаты по х и у 
	{
		aiCoordX = Math.floor(Math.random() * 3);
		aiCoordY = Math.floor(Math.random() * 3);
	} while (AiArr[aiCoordX][aiCoordY] != '');                 //если сгенерированные координаты уже заняты - то повторяем цикл


	AiArr[aiCoordX][aiCoordY] = '0'; 
	setArray(event, aiCoordX, aiCoordY);              //добавляем 0 в таблицу по координатам	
}


////////////////////////////// последующие ходы пк //////////////////////////////////

function AiNextTurn(event){

	let findPoint = false;           //найдено ли место для хода пк
	let aiCoordX, aiCoordY;           // координаты ячейки для хода пк
	let AiArr = getArray(event);

	let countXinRows = 0;   //счетчик X для строк
	let countXinColumns = 0;   //счетчик X для столбцов
	let countXinFirstDiagonal = 0;   //счетчик X для главной диагонали
	let countXinSecondDiagonal = 0;   //счетчик X для побочной диагонали

	let count0inRows = 0;   //счетчик 0 для строк
	let count0inColumns = 0;   //счетчик 0 для столбцов
	let count0inFirstDiagonal = 0;   //счетчик 0 для главной диагонали
	let count0inSecondDiagonal = 0;   //счетчик 0 для побочной диагонали

///////////////////////// to win logic ///////////////////////////////////////////////////////////

for (let i = 0; i < 3; i++)	
	{
		if (findPoint == false)                        // ищем комбинации строк с двумя нулями 
		{
				for (let j = 0; j < 3; j++)
				{                   
					if (AiArr[j][i] == '0')               
						count0inColumns++;		
					                    
					if (AiArr[i][j] == '0')
						count0inRows++; 		
					                                
					if (AiArr[j][j] == '0' )
						count0inFirstDiagonal++;
		                                       
					if (AiArr[2-j][j] == '0' )
						count0inSecondDiagonal++;
				}
				/*
				console.log (' X: ' + countXinRows + ' ' + 
							countXinColumns + ' ' +	
							countXinFirstDiagonal + ' ' +
							countXinSecondDiagonal + ' ' +

							' 0: ' + count0inRows + ' ' +
							count0inColumns + ' ' +
							count0inFirstDiagonal+ ' ' +
							count0inSecondDiagonal );*/
				
			  
				for (let l = 0; l < 3; l++)                           //если находим вариант с двумя нулями и одной свободной клеткой - запоминаем координаты и выходим из цикла
					{                                 
					if (AiArr[l][i] == '' && count0inColumns == 2 )               
						{AiArr[l][i] = '0';
						aiCoordX = l; aiCoordY = i;
						findPoint = true;
						console.log(findPoint);
						break;}                      
					else if (AiArr[i][l] == '' && count0inRows == 2 )
						{AiArr[i][l] = '0';
						aiCoordX = i; aiCoordY = l;
						findPoint = true;
						console.log(findPoint);
						break;}                            
					else if (AiArr[l][l] == '' && count0inFirstDiagonal == 2 )
						{AiArr[l][l] = '0';
						aiCoordX = l; aiCoordY = l;
						findPoint = true;
						console.log(findPoint);
						break;}                                
					else if (AiArr[2-l][l] == '' && count0inSecondDiagonal == 2 )
						{AiArr[2-l][l] = '0';
						aiCoordX = 2-l; aiCoordY = l;
						findPoint = true;
						console.log(findPoint);
						break;}
					}
				
				
				countXinRows = 0;       //обнуляем счетчики после внутреннего цикла
				countXinColumns = 0;
				countXinFirstDiagonal = 0;
				countXinSecondDiagonal = 0;
		
				count0inRows = 0;   
				count0inColumns = 0;   
				count0inFirstDiagonal = 0;   
				count0inSecondDiagonal = 0;
		}
	
	}

  /////////////////////////// to block ///////////////////////////////////////////////////////////


	if	(findPoint == false)
	{
		for (let i = 0; i < 3; i++)	
		{
			if (findPoint == false)                     //фиксируем варианты с двумя Х
			{
					for (let j = 0; j < 3; j++)
					{                                  
						if (AiArr[j][i] == 'X')               
							countXinColumns++;
			
						if (AiArr[i][j] == 'X')
							countXinRows++;  
			
						if (AiArr[j][j] == 'X' )
							countXinFirstDiagonal++; 
			
						if (AiArr[2-j][j] == 'X' )
							countXinSecondDiagonal++;  
					}
					/*
					console.log (' X: ' + countXinRows + ' ' + 
								countXinColumns + ' ' +	
								countXinFirstDiagonal + ' ' +
								countXinSecondDiagonal + ' ' +
								' 0: ' +count0inRows + ' ' +
								count0inColumns + ' ' +
								count0inFirstDiagonal+ ' ' +
								count0inSecondDiagonal );*/					  		 
					
					for (let l = 0; l < 3; l++)	                             //если находим вариант с двумя Х и одной свободной клеткой - записываем координаты
					{                                  
						if (AiArr[l][i] == '' && countXinColumns == 2 )               
							{AiArr[l][i] = '0';
							aiCoordX = l; aiCoordY = i;
							findPoint = true;
							console.log(findPoint);
							break;}                      
						else if (AiArr[i][l] == '' && countXinRows == 2 )
							{AiArr[i][l] = '0';
							aiCoordX = i; aiCoordY = l;
							findPoint = true;
							console.log(findPoint);
							break;}                            
						else if (AiArr[l][l] == '' && countXinFirstDiagonal == 2 )
							{AiArr[l][l] = '0';
							aiCoordX = l; aiCoordY = l;
							findPoint = true;
							console.log(findPoint);
							break;}                                
						else if (AiArr[2-l][l] == '' && countXinSecondDiagonal==2 )
							{AiArr[2-l][l] = '0';
							aiCoordX = 2-l; aiCoordY = l;
							findPoint = true;
							console.log(findPoint);
							break;}                                     
					}	
					
					countXinRows = 0;       
					countXinColumns = 0;
					countXinFirstDiagonal = 0;
					countXinSecondDiagonal = 0;
			
					count0inRows = 0;   
					count0inColumns = 0;   
					count0inFirstDiagonal = 0;   
					count0inSecondDiagonal = 0;
			}		
		}
	}

	///////////////////////////////////// if player is stupid //////////////////////////////////////////

	if	(findPoint == false)
	{
		AiFirstTurn(event);               //вариант когда две предыдущие логики не срабатывают
	} else 
	{
	console.log(AiArr);
	setArray(event, aiCoordX, aiCoordY);
	}
	//analiz(event, '0');
	//id = setTimeout(analiz, 1000, event, '0');

}


function analiz(event, Xor0){
	num++;
	let move = Xor0;
	let el = getArray(event);
	//let currentTurn = document.getElementById('current-turn');
  
	//(move == 'X')? currentTurn.innerHTML = 'Ход Противника' : currentTurn.innerHTML = 'Ход Игрока';

	let c1 = 0;   //счетчик для столбцов
	let c2 = 0;   //счетчик для строк
	let c3 = 0;   //счетчик для главной диагонали
	let c4 = 0;   //счетчик для побочной диагонали
	for (let i = 0; i < 3; i++)
	{
		for (let j = 0; j < 3; j++)
		{                                  
			if (el[j][i] == move)               
				c1++;                      //подсчитываем количество Х или 0 в столбцахстоках
			if (el[i][j] == move)
				c2++;                           //подсчитываем количество Х или 0 в стоках
			if (el[j][j] == move )
				c3++;                                 //подсчитываем количество Х или 0 в главной диагонали
			if (el[2-j][j] == move )
				c4++;                                        //подсчитываем количество Х или 0 в побочной диагонали
		}
		if (c1 == 3 || c2 == 3 || c3 == 3 || c4 == 3)
		{                                                   //если на диагонали, строке или столбце три подряд Х или 0 - то кто-то из них выиграл
			currentTurn.innerHTML = (move + ' win!');
			//console.log(move + ' win!');
			win = true; 
			//id = setTimeout( function ( ) { alert( move + ' win!!!' ); }, 1000 );
			//setTimeout("alert( move + ' win!!!' )", 1000);
			//alert( move + ' win!!!' );			
			//restart (event); 			
			break;                                     
		}
		c1 = 0;       //обнуляем счетчики после внутреннего цикла
		c2 = 0;
		c3 = 0;
		c4 = 0;
	}
	if(num == 7 && !win){
		draw = true;
		//id = setTimeout( function ( ) { alert( ' Draw!' ); }, 1000 );
		alert( ' Draw!' );
		//restart (event);		
	}
	//clearTimeout(id);
}

function getArray(event){
	let tr = event.parentNode.parentNode;
	let Arr = [['','',''],                         //создаем для удобства анализа игры двухмерный массив и заполняем его данными с таблицы
	           ['','',''],
	           ['','','']];
	let n = 0;
	for (let i = 0; i < 3; i++)
	{		
		for (let j = 0; j < 3; j++)
		{
			Arr[i][j] = tr.getElementsByTagName('td')[n++].innerHTML;
		}	
	}
	console.log(Arr);
	return Arr;
}

function restart (event){
	console.log('RESTART');
	let tr = event.parentNode.parentNode;
	for (let i = 0; i < 9; i++)
	{	
		tr.getElementsByTagName('td')[i].innerHTML = '';			
	}
	num = 0;
	win = false; 
	draw = false;
}

function setArray(event, coordX, coordY){
	let tr = event.parentNode.parentNode;
	let aiCoordX = coordX;
	let aiCoordY = coordY;
	let n = 0;

		for (let i = 0; i < 3; i++)
	{		
		for (let j = 0; j < 3; j++)
		{			
			if (i == aiCoordX && j == aiCoordY){ 
			tr.getElementsByTagName('td')[n].innerHTML = '0';
			}			
			n++;
		}	
	}
}

