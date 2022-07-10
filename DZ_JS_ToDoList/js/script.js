let ul = document.getElementById('ul'),
li = document.getElementById('ul li'),
todoList =[];                                      //массив для хранения списка дел, можно потом сохранить в localStorage

const inputText = document.querySelector('.message');  //ввод нового пункта в списке дел


let btn = document.getElementById('btn');
btn.addEventListener('click', addLi);              //обработка нажатия кнопки - добавляем текст из поля ввода в список дел
function addLi (){
	if(!inputText.value) return;                     //пустую строку не добавляем
	let tempLi = document.createElement('li');           //динамически создаем <li><input type="checkbox"><label>'Text from inputText'</label></li>
	let tempInput = document.createElement('input');
	let tempLabel = document.createElement('label');
	tempInput.type = "checkbox";
	//console.log( tempLi);	
	//console.log( tempInput);

	tempLi.appendChild(tempInput);
	tempLi.appendChild(tempLabel);
	tempLabel.innerHTML = inputText.value;

	ul.appendChild(tempLi);                     //добавляем li к родителю ul
	todoList.push(tempLi);                    //пушим элемент li в массив обьектов todoList
	//console.log( todoList);
	inputText.value = '';                   //очищаем роле ввода
}
