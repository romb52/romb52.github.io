/*
С помощью методов setTimeout() или setInterval() вы-
ведите в тело документа методом document.write() пер-
вую строку из монолога Гамлета «To be, or not to be, that
is the question...» так, чтобы буквы появлялись по одной
через 200-300 миллисекунд, а затем с новой строки так-
же методом document.write() нужно вывести «William
Shakespeare, from "Hamlet"»
*/
/*
let strText = 'To be, or not to be, that is the question...';
let strAutor = 'William Shakespeare, from "Hamlet"';
let textDelay = '';
let timerId = 0;

function show(str, index){

	if (index < str.length){	
		textDelay += str.charAt(index);
	document.write(textDelay[index]);	
	index++;
	timerId = setTimeout(show, setRandomTime(200, 300), strText, index);
	console.log('line 22 id: ' + timerId);
} else if (index == str.length){
	document.write('<br>');	
	index = 0;
	timerId = setTimeout(show, 200, strAutor, index);
	console.log('line 26 id: ' + timerId);

	setTimeout(() => { clearInterval(timerId);});
	console.log('line 29 id: ' + timerId);
}
}
// function showAutor(strAutorstrAutor, index){
// 	if (index < strAutor.length){	
// 		textDelay += strAutor[index];
// 	document.write(textDelay[index]);	
// 	index++;
// 	timerId = setTimeout(showAutor, setRandomTime(200, 300), strAutor, index);
// 	console.log('line 38 id: ' + timerId);
// } else if (index == strAutor.length){
// 	document.write('<br>');	
// 	setTimeout(() => { clearInterval(timerId);});
// 	console.log('line 42 id: ' + timerId);
// }
// }

function setRandomTime(min, max){
	return Math.random() * (max - min) + min;
}

timerId = setTimeout(show, setRandomTime(200, 300), strText, 0);
console.log('line 51 id: ' + timerId);

setTimeout(() => { clearInterval(timerId);});

// timerId = setTimeout(showAutor, 13200, strAutor, 0);
// console.log('line 56 id: ' + timerId);
*/  

let strText = 'To be, or not to be, that is the question...';
let strAutor = 'William Shakespeare, from "Hamlet"';
let setRandomTime = (Math.random() * (100) + 200);
let stopText = false;  

function show (str, currentIndexOfChar){
	document.write(str[currentIndexOfChar]);	
}

function setTimerAndStartText (str){
	let index = 0;	
	const timerId = setInterval(() => {        
    show (str, index ++);        
    if (index == str.length) { 
    	clearInterval(timerId); 
    	stopText = ! stopText;          //костыль )))
    	document.write('<br>');
    	if(stopText){ 
    		setTimerAndStartText (strAutor); 
}
}
}, setRandomTime); //не меняет значение setRandomTime, использует первое полученное  
}

setTimerAndStartText (strText);
//программа запускает сразу и второй таймер не дожидаясь полной отработки вызванных функций
//setTimerAndStartText (strAutor, 13000);


