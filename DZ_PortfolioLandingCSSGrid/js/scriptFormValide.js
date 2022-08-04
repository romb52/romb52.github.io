
//обработчик события DOMContentLoaded когда весь HTML был полностью загружен и пройден парсером
document.addEventListener('DOMContentLoaded', ()=>{
	
const form = document.querySelector('form');
//console.log(form);
//регулярные выражения
const regExpName = /^[a-zA-Z0-9_-]{3,16}$/;
const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
const regExpMessage = /^[a-zA-Z\s]*$/g;
//let isValidate = false;

//обратока отправки формы
const submit = () => {
	alert('Your data sent');

}

//обработка (валидация) события blur
const validateElem = (elem) => { 
	switch(elem.name){
		case 'username':
			//console.log(elem);
			//тестирование на рег.выр. и проверка на заполненность 
			if(!regExpName.test(elem.value) && elem.value != ''){	
				isValidate = false;	
				if(elem.value.length < 3){
					elem.nextElementSibling.textContent = 'Use more than 2 letters';					
					elem.style.borderColor = "orange";
				}else if(elem.value.length > 16){
					elem.nextElementSibling.textContent = 'Use less than 16 letters';
					elem.style.borderColor = "orange";
				} else					
				elem.nextElementSibling.textContent = 'Enter a valid name. Use latin letter.';

			} else{
				elem.nextElementSibling.textContent = '';
				elem.style.borderColor = "grey";
				isValidate = true;
			}
			break;
		case 'email':
			//тестирование на рег.выр. и проверка на заполненность 
			if(!regExpEmail.test(elem.value) && elem.value != ''){
				isValidate = false;
				elem.nextElementSibling.textContent = 'Enter a valid email';
				elem.style.borderColor = "orange";
			} else{
				elem.nextElementSibling.textContent = '';
				elem.style.borderColor = "grey";
				isValidate = true;
			}
			break;
		case 'message':
			//тестирование на рег.выр. и проверка на заполненность 
			if(!regExpMessage.test(elem.value) && elem.value != ''){
				isValidate = false;
				elem.nextElementSibling.textContent = 'Use English!';
				elem.style.borderColor = "orange";
			} else{				
				elem.nextElementSibling.textContent = '';
				elem.style.borderColor = "grey";
				isValidate = true;
			}
			break;
			default:
			console.log('Error!');			
	}
}

for(let elem of form.elements){
	//console.log(elem.type);
	if(elem.type != 'submit'){
		//вешаем обработчик события blur на каждый input (событие после снятия фокуса)
		//вызов функции validateElem по событию
		elem.addEventListener('blur', () => {validateElem(elem)});
	}	
}

for(let elem of form.elements){
	//console.log(elem.type);
	if(elem.type != 'submit'){
		//вешаем обработчик события focus на каждый input (input в фокусе)		
		elem.addEventListener('focus', () => {elem.style.borderColor = "grey";});
	}	
}


form.addEventListener('submit', (event)=>{
//остановить стандартное поведение браузера
event.preventDefault();
//console.dir(form);
//перебор всех элементов формы, кроме кнопки submit
for(let elem of form.elements){
	//console.log(elem.type);
	if(elem.type != 'submit'){
		if (elem.value == '') { //если поле ввода не заполнено, оповещаем в классе errors
			elem.nextElementSibling.textContent = 'Fill in the lines!';
			isValidate = false;
		}else{ //если заполнено, пустая строка в классе errors
			if (isValidate) {
			elem.nextElementSibling.textContent = '';				
			}		
		}	
	}
}

//если все инпуты прошли валидацию, то отправляем форму
if(isValidate){	
//console.log('isValidate')
	submit();	
	form.reset();  //очищаем поля
} 
});

});