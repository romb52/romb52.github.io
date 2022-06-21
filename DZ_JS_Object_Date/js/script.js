
// Задание 2
// Рассчитайте, сколько дней, часов, минут и секунд
// осталось до Нового года. Выведите эти значения кра-
// сиво, используя метод document.write() с тегами <p> и
// <span> и классами для них. Стили можно записать в от-
// дельном css-файле. Если одно из чисел будет меньше 10,
// то его нужно вывести с ведущим 09.



let days = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;

let _days = '';
let _hours = '';
let _minutes = '';
let _seconds = '';

let strCountdownToNewYear = '';

function CountdownToNewYear (){

	let deltaTime = Date.parse('01/01/2023') - Date.now ();
	days = Math.floor(deltaTime/(24*60*60*1000));
	hours = Math.floor(deltaTime % (24*60*60*1000)/(60*60*1000));
	minutes = Math.floor(deltaTime % (60*60*1000)/(60*1000));
	seconds = Math.floor(deltaTime % (60*1000)/1000);

	//console.log( days + ' ' + hours + ' ' + minutes + ' ' + seconds);

	if (days < 10){_days = '0' + days.toString();}
		else {_days = days.toString();}
	if (hours < 10){_hours = '0' + hours.toString();}
		else {_hours = hours.toString();} 
	if (minutes < 10){_minutes = '0' + minutes.toString();}
		else {_minutes = minutes.toString();}
	if (seconds < 10){_seconds = '0' + seconds.toString();}
		else {_seconds = seconds.toString();}

	strCountdownToNewYear = ( _days + ': ' + _hours + ': ' + _minutes + ': ' + _seconds);

	document.getElementById('countdown').innerHTML = strCountdownToNewYear;

	setTimeout (CountdownToNewYear, 1000);
}

CountdownToNewYear ();
