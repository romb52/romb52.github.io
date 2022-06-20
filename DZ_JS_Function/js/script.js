//1. Создайте функцию stringFrom(…), возвращающую
//строку, состоящую из значений всех переданных
//аргументов. Например, вызов stringFrom('I have', 5, 'apples') вернет строку «I have 5 apples»; вызов
//stringFrom('Х value is', true) вернет строку «Х value is true».

function stringFrom(){
	let str = '';
	for (let i = 0; i < arguments.length; i++){
		str += (arguments[i] + ' ') ;
	}
	return str;
}

console.log('\nExercise 1: ');
console.log (stringFrom('I have', 5, 'apples')); 
console.log (stringFrom('Х value is', true)); 


//2. Создайте функцию, возвращающую значение минимального из всех переданных аргументов.

function minFrom(){
	if (arguments.length == 0) return undefined;
	let min = arguments[0];
	for (let i = 1; i < arguments.length; i++){
		if (arguments[i] < min) min = arguments[i];
	}
	return min;
}

console.log('\nExercise 2: ');
console.log (minFrom(55, 1500, 888, 12, 65));

//3. Создайте функцию numbers(), которая будет подсчитывать количество переданных числовых аргументов.
//Например, numbers(1, 2, “a”) вернет значение 2, numbers(true, 2, false) — 1, numbers() — 0.

function numbers(){
	let count = 0;	
	for (let i = 0; i < arguments.length; i++){
		//console.log(i + ' ' + typeof arguments[i]);
		if (typeof arguments[i] === 'number') count++;
	}
	return count;
}

console.log('\nExercise 3: ');
console.log (numbers(1, 2, 'a'));
console.log (numbers(true, 2, false));
console.log (numbers());

//4. Создайте функцию mean(), которая рассчитает среднее значение от всех числовых аргументов, игнорируя
//аргументы нечислового типа. Например, mean (1, 2, “a”) вернет значение 1.5 (среднее 1 и 2), mean(true, 2,
//false) — 2, mean() — 0.

function mean(){
	let count = 0;	
	let average = 0;
	let sum = 0;
	for (let i = 0; i < arguments.length; i++){
		//console.log(i + ' ' + typeof arguments[i]);
		if (typeof arguments[i] === 'number'){
		count++;
		sum += arguments[i]
	}
	}
	if (count == 0) return 0;
	average = sum/count;
	return average;
}

console.log('\nExercise 4: ');
console.log (mean (1, 2, 'a'));
console.log (mean (true, 2, false));
console.log (mean ());


//5. Напишите рекурсивную функцию, которая проверяет, является ли переданный аргумент степенью
//двойки (например, числа 8=23, 32=25 — это степени
//двойки, а числа 7 или 12 — нет). Подсказка: если число «х» делится на два, то нужно проверить, является
//ли число «х/2» степенью двойки.

function isDegreeTwo(x){	
	if (x == 0) return undefined;
	if (x !== 1 && x % 2 == 0){		
		isDegreeTwo(x/2);
		return true;
	}
else {	return false;}
}

console.log('\nExercise 5: ');
console.log (isDegreeTwo(0));
console.log (isDegreeTwo(32));
console.log (isDegreeTwo(7));
