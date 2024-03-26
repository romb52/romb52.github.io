let firstNumber = '';
let lastNumber = '';
let mathSign = '';


document.querySelector('.buttons').addEventListener('click', clickEvent);      //отслеживаем клики в классе .buttons
const out = document.querySelector('.calc-screen p');                         //экран калькулятора


function clickEvent(e) {
	if (e.target.className === "line") { //если кликнул между кнопками
		//console.log('return');
		return;
	}
	if (e.target.classList.contains('clearAll')) {       //если нажал очистку
		//console.log('clearAll');
		clickClearAllEvent(e);
		return;
	}
	if (e.target.classList.contains('oddEven')) {              //кнопка +/-
		//console.log('oddEven');
		clickOddEven(e);
		return;
	}
	if (e.target.classList.contains('deletelastSymbol')) {       //удаление последнего символа в строке
		//console.log('deletelastSymbol');
		clickDeletelastSymbol(e);
		return;
	}


	if (!e.target.classList.contains('mathOpSign') || !e.target.classList.contains('equals')) {			//если вводят числа, то посимвольно добавляем в строку вывода
		if (out.innerHTML === mathSign) { out.innerHTML = '' };
		if (e.target.innerHTML == 0 && out.innerHTML[0] == 0) {                           //заморочки, чтоб оставить ноль, когда его вводим сами
			//console.log('zeroooo');
			return;
		}
		if (firstNumber !== '' && mathSign === '' && lastNumber === '' && !e.target.classList.contains('mathOpSign')) {
			out.innerHTML = '';
			// Reset firstNumber to allow for a new calculation
			firstNumber = '';
			console.log('Reset firstNumber');
		}
		out.innerHTML += e.target.innerHTML;
		console.log(out.innerHTML);


	}                                                                               //заморочки, чтоб убрать первый ноль когда он не нужен

	if (out.innerHTML.length > 1 && out.innerHTML[0] == 0 && !e.target.classList.contains('mathOpSign') && !e.target.classList.contains('equals')) {
		//console.log(out.innerHTML.length);
		//console.log(out.innerHTML[0] + out.innerHTML[1]);	 
		out.innerHTML = out.innerHTML.substring(1);
		//console.log(out.innerHTML[0] );
	}

	//как только пользователь нажал математический знак + - / * то фиксируем значение первого введенного числа и самого знака 

	if (e.target.classList.contains('mathOpSign') && firstNumber == '') {
		firstNumber = out.innerHTML.substring(0, out.innerHTML.length - 1);
		mathSign = e.target.innerHTML;
		out.innerHTML = mathSign;
		//console.log(firstNumber);
	}
	//в случае если первое число - это результат предыдущего вычисления 
	if (e.target.classList.contains('mathOpSign') && firstNumber !== '') {
		console.log(firstNumber);
		mathSign = e.target.innerHTML;
		out.innerHTML = mathSign;
		return;
		//при нажатии знака = фиксируем значение второго числа и производим необходимое вычисление 
	} else if (e.target.classList.contains('equals') || e.target.classList.contains('mathOpSign') && firstNumber !== '') {
		lastNumber = out.innerHTML.substring(0, out.innerHTML.length - 1);
		console.log(lastNumber);
		out.innerHTML = '';
		switch (mathSign) {
			case "+":
				firstNumber = parseInt(firstNumber) + parseInt(lastNumber);
				//console.log("+ plus");
				break;
			case "-":
				//console.log("- minus");
				firstNumber = parseInt(firstNumber) - parseInt(lastNumber);
				break;
			case "÷":
				//console.log("÷ divide");
				if (lastNumber === '0' || lastNumber === 0) {
					firstNumber = 'Error!'
					//console.log("Error");
				} else
					firstNumber = parseInt(firstNumber) / parseInt(lastNumber);
				break;
			case "×":
				//console.log("× mult");
				firstNumber = parseInt(firstNumber) * parseInt(lastNumber);
				break;
			default:
				firstNumber = 0;
				console.log("FuckUp!");
		}
		out.innerHTML = firstNumber;  //результат вычисления становится первым числом
		lastNumber = '';
		mathSign = '';
	}


	//console.log(firstNumber + ' ' + lastNumber + ' ' + mathSign);
}

//функция очистить все
function clickClearAllEvent(e) {
	out.innerHTML = "0";
	firstNumber = '';
	lastNumber = '';
	mathSign = '';
	//console.log(firstNumber + ' ' + lastNumber + ' ' + mathSign);

}

//функция поменять знак на противоположный
function clickOddEven(e) {
	out.innerHTML = -out.innerHTML;
	//console.log(firstNumber + ' ' + lastNumber + ' ' + mathSign);

}

//функция удаления последнего символа(числа) в строке
function clickDeletelastSymbol(e) {
	const temp = out.innerHTML;
	out.innerHTML = temp.substring(0, temp.length - 1);
	//console.log(out.innerHTML );

}





