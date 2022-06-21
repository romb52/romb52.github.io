
// расширить класс String добавляем метод проверки полиндрома. 

// let strPoli = 'Аргентина манит негра'
// console.log(myStr.isPolindrom(strPoli)) 

class StringInfo extends String {
	calcLetter (letter) {
		let count = 0;
		let index = this.indexOf(letter);
		while(index != -1){
			count++;
			index = this.indexOf(letter, index +1);
		}
		return count;
	}
	isPolindrom(strPoli) {
		console.log(strPoli);
		let _strPoli = this.toLowerCase();            // создаем копию строки в нижнем регистре
		console.log(_strPoli);
		for(let i = 0; i < _strPoli.length/2; i++){                //делим строку пополам и сравниваем обе части
			if(_strPoli[i] != _strPoli[_strPoli.length - 1 - i]){
				return ' is not polindrom';
			} else {
				return ' is polindrom';
			}
		}
	}
}

let myStr = new StringInfo(' kjdgaeuht routormjgosi  eitjqerpo`igjwr rrtwiejr');
console.log('i in "' + myStr + '" ' + myStr.calcLetter('i'));
console.log(myStr.indexOf('i'));

let strPoli = 'Аргентина манит негра';
myStr = new StringInfo (strPoli);
console.log(strPoli + myStr.isPolindrom(strPoli));



