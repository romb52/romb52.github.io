//1. Дан целочисленный массив X[1..5, 1..4]. Заменить в нем все элементы, меньшие 5 числом 111.

let X=[];
let lengthX = parseInt(prompt('Введите длину массива Х'));
//
for (let i=0; i<lengthX; i++){
  X[i] = Math.floor(Math.random() * 10);
}
document.write('Оригинальный массив: X = [' + X + ']' + '<br>');

//заменим элементы массива меньше 5 на число 111
for (let i=0; i<lengthX; i++){
  if(X[i] < 5){
    X[i] = 111;
  }   
}
document.write('Все 5 массива заменили на 111: X = [' + X + ']' + '<br>');


//2. Дан целочисленный массив В[1..4, 1..3]. Заменить все его элементы их квадратами.
/*
let B=[];
let lengthB = parseInt(prompt('Введите длину массива B'));
//
for (let i=0; i<lengthB; i++){
  B[i] = Math.floor(Math.random() * 10);
}
document.write('Оригинальный массив: B = [' + B + ']' + '<br>');
//заменим все елементы массыва их квадратами
for (let i=0; i<lengthB; i++){
  B[i] = B[i]*B[i]; 
}
document.write('Массив с элементами в квадрате: B = [' + B + ']' + '<br>');
*/

//3. Дан действительный массив А[1..5, 1..3]. Напечатать индексы его отрицательных элементов.
/*
let A=[];
let indexEvenElementsA = [];
let index = 0;
let lengthA = parseInt(prompt('Введите длину массива A'));
//
for (let i=0; i<lengthA; i++){
  A[i] = Math.floor(Math.random() * 20 - 10);
}
document.write('Оригинальный массив: A = [' + A + ']' + '<br>');
//индексы его отрицательных элементов массива
for (let i=0; i<lengthA; i++){
  if(A[i] < 0){
    indexEvenElementsA[index] = i;
    index ++;
  }
}
if(index==0){
  document.write('В массиве А нет отрицательных элементов' + '<br>');
}else
{
  document.write('Индексы отрицательных элементов массива A: index = [' + indexEvenElementsA + ']' + '<br>');
}
*/

//4. Создайте двумерный целочисленный массив А[1..10, 1..7] и найдите сумму всех его элементов, имеющих оба нечетных индекса.
/*
let A = new Array();
let sumBothEvenIndex = 0;
let rowA = parseInt(prompt('Введите высоту массива A'));
let colA = parseInt(prompt('Введите ширину массива A'));
//наполняем двумерный массив случайными числами
document.write('Оригинальный массив A: ' + '<br>');
for (let i = 0; i < rowA; i++){
  A[i] = new Array();
  for (let j = 0; j < colA; j++){
    A[i][j] = Math.floor(Math.random() * 10);
    document.write('[' + i + ']' + '[' + j + ']=' + A[i][j] + '  ');    
  }  
  document.write('<br>');
}
//находим сумму всех его элементов, имеющих оба нечетных индекса
for (let i = 0; i < rowA; i++){  
  for (let j = 0; j < colA; j++){
    if(i%2 != 0 && j%2 != 0){  
  //console.log(i + ' ' + j);  
    sumBothEvenIndex += A[i][j];
    }   
  }    
}
document.write('Cумма всех элементов массива, имеющих оба нечетных индекса : ' + sumBothEvenIndex);
*/

//5. Дан целочисленный массив А[1..5, 1..3]. Вывести на экран элементы массива, кратные 5, и их индексы.
/*
let A=[];
let lengthA = parseInt(prompt('Введите длину массива A'));
//
for (let i=0; i<lengthA; i++){
  A[i] = Math.floor(Math.random() * 50);  
}
//Элементы массива кратные 5 и их индексы:
document.write('Оригинальный массив: A = [' + A + ']' + '<br>');
document.write('Элементы массива кратные 5 и их индексы: ' + '<br>');
for (let i=0; i<lengthA; i++){
  if(A[i]%5 == 0 && A[i] != 0){
    document.write('A[' + i + '] = ' + A[i] + '<br>');
  }
}
*/