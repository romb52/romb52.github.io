//1. У нас есть объект, в котором хранятся зарплаты нашей команды:
//let salaries = {
//John: 100,
//Ann: 160,
//Pete: 130
//}
//Напишите код для суммирования всех зарплат и сохраните результат в переменной sum. Должно получиться 390.
//Если объект salaries пуст, то результат должен быть 0.

let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130,
  sumSalaries: function() {
  	let sum = this.John + this.Ann + this.Pete;   	
  	return (! sum ? 0 : sum); 
  }
}

let sum = salaries.sumSalaries();
console.log('Exercise 1: ')
console.log (sum);


// 2. Создайте функцию multiplyNumeric(obj), которая умножает все числовые свойства объекта obj на 2.
// Например:
// let menu = {
//   width: 200,
//   height: 300,
//   title: "My menu"
// };
// multiplyNumeric(menu);
// menu = {
//   width: 400,
//   height: 600,
//   title: "My menu"
// };
// Обратите внимание, что multiplyNumeric не нужно ничего возвращать. Следует напрямую изменять объект.
// P.S. Используйте typeof для проверки, что значение свойства числовое.

let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

function multiplyNumeric (obj){
	for(let key in obj){
	if (typeof(obj[key]) === 'number'){
		obj[key] = obj[key] * 2; 
	}
}
}

console.log('\nExercise 2: ')
console.log (menu);
multiplyNumeric(menu);
console.log (menu);

//3. Создайте конструктор для студента с основными характиристиками.

class Student {
	constructor (firstName, lastName, birthday, number, course = [], level, points ){
		this.firstName = firstName;
		this.lastName = lastName;
		this.birthday = birthday;
		this.number = number;
		this.course = course;
		this.level = level;
		this.points = points;		
	}
	showInfo() {
		console.log(this.firstName + ' ' + this.lastName + ' id:' + this.number + ' course:' + this.course);
	}
	showAge(){
		const deltaTime = Date.now() - Date.parse(this.birthday);
		const age = Math.floor(deltaTime/(365*24*60*60*1000));
		console.log(age + ' years old');
	}
	showLevel(){
		if (this.points < 0){			
			this.level = 'loser';
		} else if(this.points >= 0 && this.points <=300){
			this.level = 'intemedia';
		} else if (this.points >300 && this.points <=500){
			this.level = 'upperintermedia';
		} else {
			this.level = 'nerd';
		}
		console.log('level: ' + this.level);
	}
} 

const Bond = new Student ('James', 'Bond', '04/22/1970', 325258, [' HTML', ' JS', ' React'], 'intemedia', 255);
console.log('\nExercise 3: ');
Bond.showInfo();
Bond.showAge();
Bond.showLevel();
Bond.points = 330;
Bond.showLevel();

