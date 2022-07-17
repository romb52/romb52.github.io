const locStor = window.localStorage;
console.log(locStor);
let tempToDoList = [],                    //массив для списка дел на выбранный (один) день        
todoList =[];                             //массив для хранения списка дел для localStorage
let ul = document.getElementById('ul'),
li = document.getElementById('ul li');                                    
const inputText = document.querySelector('.message');  //ввод нового пункта в списке дел


let btn = document.getElementById('btn');
btn.addEventListener('click', addLi);              //обработка нажатия кнопки - добавляем текст из поля ввода в список дел


let block = document.querySelector('.btn_day_of_week');   // родитель для 7ми кнопок дней недели
d = new Date();
let te = +d.toLocaleDateString().split('.')[0]    //вычисляем текущее число месяца
let clickDate = te;                             //по умолчантю текущий день - это выбранный (кликнутый) 

// if(clickDate == te){                             //выводим на экран спсок дел на текущий день (если есть) при первой загрузке программы
//   if(localStorage.length){
//     getListFromLocalStorage (clickDate); }   
// }

//динамически создаем кнопки на 7 дней от текущей даты
  for (let i = te; i<(te+ 7); i++){
  
    let temp = document.createElement('button');
    if(i==te){
      temp.classList.add('active');         //по умолчанию первый день - активный (в фокусе)
    }

    temp.innerHTML = i;
    temp.onclick = toggleBtn;
    temp.classList.add('dayOfWeek', 'dayOfWeek')
    block.appendChild(temp);
  }

//обработка клика по дням, становятся active, подгружаются уже введенные дела из LocalStorage 
function toggleBtn (e){
  todoList.splice(0,todoList.length);
  tempToDoList.splice(0,tempToDoList.length);                
  console.log(tempToDoList); 
  let arrBtn = document.getElementsByTagName('button');
  //console.log(arrBtn);
  for(i=0; i<arrBtn.length; i++){
    if (arrBtn[i].classList.contains('active')){
      arrBtn[i].classList.remove('active');
    }
  }
e.target.classList.add('active');
clickDate = e.target.innerHTML;

getListFromLocalStorage (clickDate);

removePreviousDayList(); 

showToDoDayList();

}

//перебор данных в localstorage по ключу - выбранной дате 
function getListFromLocalStorage (clickDate){
    for (let i = 0; i < localStorage.length; i++){
    let key = `${clickDate}_${i}`; 
      if(localStorage.getItem(key)){
          console.log(localStorage.getItem(key));  
          tempToDoList.push(localStorage.getItem(key));      // при совпадении добавляем во временный массив
      }  
    } 
console.log(tempToDoList); 
}

//добавить элемент li после ввода в строку inputText
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
  console.log( todoList);
  inputText.value = '';                   //очищаем роле ввода

  console.log(todoList);

  let locIndex = 0;

  for (let i = 0; i < localStorage.length; i++){
    let key = `${clickDate}_${i}`; 
      if(localStorage.getItem(key)){
          //console.log(localStorage.getItem(key));  
         locIndex++;
      }  
    } 


  for(i = 0; i < todoList.length; i++){
    locStor.setItem(`${clickDate}_${i+locIndex}`, `${todoList[i].lastChild.innerHTML}`);
  }
}


for (let i = 0; i < localStorage.length; i++){
    let key = `${clickDate}_${i}`; 
      if(localStorage.getItem(key)){
          console.log(localStorage.getItem(key));  
          tempToDoList.push(localStorage.getItem(key));      // при совпадении добавляем во временный массив
      }  
    } 

for (let i = 0; i < localStorage.length; i++){
  let key = `${clickDate}_${i}`; 
  if(localStorage.getItem(key)){console.log(localStorage.getItem(key));}
}

showToDoDayList();

//удаление списка дня (для корректного вывода нового)
function removePreviousDayList(){
  while (ul.firstChild) {ul.removeChild(ul.firstChild);}
}

//вывод на экран списка дел на выбранный день
function showToDoDayList(){
  if(tempToDoList.length>0){
    for(i = 0; i < tempToDoList.length ; i++){
    let tempLi = document.createElement('li');           
    let tempInput = document.createElement('input');
    let tempLabel = document.createElement('label');
    tempInput.type = "checkbox";  

    tempLi.appendChild(tempInput);
    tempLi.appendChild(tempLabel);
    tempLabel.innerHTML = tempToDoList[i];

    ul.appendChild(tempLi);     
    inputText.value = '';    
    }
  }
}

//Еще сделать: 
//адаптация для мобильных устройств
//придумать как сохранить нажатый чек-бокс
//удаление всех дел, дел на день, одного дела
//пометить важные дела (например двойным кликом)