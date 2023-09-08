let number = 1;
let arrDayNumbers = [];
let year, month;
let rows, tempRow;
const arrOfMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let tableCalendar = document.getElementById('tableCalendar');
let d;
let dayOfWeek;

let inputMonth = document.getElementById('inputMonth');         // ввод пользователем месяца
let inputYear = document.getElementById('inputYear');           // ввод пользователем года
const btn = document.getElementById('btn');
let showDate = document.getElementById('showDate')
let ErrorsMonth = document.querySelector('.errorsMonth');
let ErrorsYear = document.querySelector('.errorsYear');

btn.disabled = true;                // 
let isValidate = false;

// проверка на валидность input   Месяцы 1-12   Год 1900 - 2100
inputMonth.addEventListener ('blur', ()=> {
  if (+inputMonth.value >= 1 && +inputMonth.value <= 12) {
    isValidate = true;
    btn.disabled = false;
    console.log(isValidate);
    ErrorsMonth.textContent = '';
    inputMonth.style.borderColor = "grey"; 
      } else {isValidate = false; 
        console.log(isValidate);
        btn.disabled = true;
        inputMonth.style.borderColor = "red"; 
        ErrorsMonth.textContent = 'Month must be from 1 to 12';        
      }
})

inputYear.addEventListener ('blur', ()=> {
  if (+inputYear.value >= 1900 && +inputYear.value <= 2100) {
    isValidate = true;
    if (ErrorsMonth.textContent == '') btn.disabled = false;
    console.log(isValidate);
    ErrorsYear.textContent = ''; 
    inputYear.style.borderColor = "grey"; 
      } else {
        isValidate = false; 
        console.log(isValidate); 
        btn.disabled = true;
        inputYear.style.borderColor = "red"; 
        ErrorsYear.textContent = 'Year must be from 1900 to 2100';    
      }
})

  btn.addEventListener('click', () => {          //отслеживаем клик для генерирования календаря
    year = inputYear.value;
    month = inputMonth.value;
    showDate.innerHTML = arrOfMonth[month - 1] + ', ' + year;   //вывод даты над календарем
    GenCalendar();                                              // вызов ф-ции генерирования календаря
  });

function daysInMonth(year, month) {                            //ф-ция сколько дней в месяце
  return new Date(year, month, 0).getDate();
}

function GenCalendar() {                 // генерируем календарь 

  d = new Date(year, month - 1);                  //создаем обьект Date с параметрами введенного года и месяца (месяцы 0-11)
  dayOfWeek = d.getDay();                         // получить день недели 1-го числа

  if (dayOfWeek == 0) dayOfWeek = 7;                // сдвигаем, чтоб неделя начиналась с понедельника, а не с воскресенья
  dayOfWeek -= 1;
  rows = Math.floor((daysInMonth(year, month) + dayOfWeek) / 7);           //вычисляем сколько рядов в календаре нужно
  if ((daysInMonth(year, month) + dayOfWeek) % 7 === 0) rows -= 1;         // случай если последнее число выпало на воскресенье
  // console.log(daysInMonth(year, month) + dayOfWeek + '  ' + rows);
  number = 1;

  for (i = 0; i <= rows; i++) {                                                 //в массив вводим пробелы и числа месяца
    arrDayNumbers[i] = [];
    for (j = 0; j < 7; j++) {
      if (i == 0 && j < dayOfWeek) { arrDayNumbers[i][j] = ''; } else            //пробелы в начале месяца
        arrDayNumbers[i][j] = number++;
      if (number > daysInMonth(year, month) + 1) arrDayNumbers[i][j] = '';                //прорбелы в конце
    }
  }

  if (tableCalendar.childNodes.length > 2) {                                              //проверка, удаление предыдущей таблицы при создании новой
    for (i = tempRow + 1; i > 0; i--) { tableCalendar.deleteRow(i); }
  }

  for (i = 0; i <= rows; ++i) {
    let row = document.createElement("tr");         //строки
    for (j = 0; j < 7; ++j) {
      let cell = document.createElement("td");   // ячейки
      cell.id = i + '' + j;                       //присваиваем уникальные id, хоть они и не нужны
      cell.innerHTML = arrDayNumbers[i][j];        //перенос данных из массива в ячейки   
      row.appendChild(cell);
    }

    tableCalendar.appendChild(row);
    tempRow = rows;                            //запоминаем кол-во строк для корректного удаления после
  }

  // console.log(tableCalendar.childNodes)
}



