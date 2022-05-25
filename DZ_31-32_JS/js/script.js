// Game: cows & bulls

//фиксированное значение загаданного числа
//var Rand=71302;

let Bull=0;   //коровы и быки
let Cow=0;
let count=0;   //счетчик ходов
let Answer;    //ответ игрока
let resultString;
let resultStringPrevious;

let x1, x2, x3, x4, x5;    //переменные для каждой отдельной цифры пятизначного числа (загаданного AI)
let y1, y2, y3, y4, y5;     // для каждой отдельной цифры пятизначного числа вводимого игроком

//для фиксированного значения var Rand; 
/*x1 = parseInt(Rand/10000);
console.log(x1);
x2 = parseInt((Rand/1000)%10);
console.log(x2);
x3 = parseInt((Rand/100)%10);
console.log(x3);
x4 = parseInt((Rand/10)%10);
console.log(x4);
x5 = parseInt(Rand%10);
console.log(x5);*/

//Рандомно задаем 5 цифр числа AI 
do{
  x1=Math.floor(Math.random() * 10);
}while (x1==0);                         //первое число не равно 0
console.log(x1);
do{
  x2=Math.floor(Math.random() * 10);
}while (x2==x1);                        //все числа уникальные (не равны друг другу)
console.log(x2);
do{
  x3=Math.floor(Math.random() * 10);
}while(x3==x1 || x3==x2);
console.log(x3);
do{
  x4=Math.floor(Math.random() * 10);
}while(x4==x1 || x4==x2 || x4==x3)
console.log(x4);
do{
  x5=Math.floor(Math.random() * 10);
}while(x5==x1 || x5==x2 || x5==x3 || x5==x4);
console.log(x5);


while (true && Answer!=0) {
  let Answer = parseInt(prompt('Enter your 5-digit number or enter 0 to exit'));
  count++;
  if(Answer==0){
    alert('Game over'); 
    break;
  }
  if(Answer==11111){
    alert('Number = ' + x1 + x2 + x3 + x4 + x5);
    count--;
    continue;
  }
  if(Answer<10000){
    alert("Число не должно быть с нуля!!!");
    count--;
    continue;
  }
  if(Answer>99999){
    alert('Число должно быть пятизначное!!! ');
    count--;
    continue;
  }

  y1= parseInt(Answer/10000);
  //console.log(y1);
  y2= parseInt((Answer/1000)%10);
  //console.log(y2);
  y3= parseInt((Answer/100)%10);
  //console.log(y3);
  y4= parseInt((Answer/10)%10);
  //console.log(y4);
  y5= parseInt(Answer%10);
  //console.log(y5);
  
  if (y1==y2 || y1==y3 || y1==y4 || y1==y5 || y2==y3 || y2==y4 || y2==y5 || y3==y4 || y3==y5 || y4==y5){
    alert ("Цифры не должны повторяться! Введите еще раз!");
    count--;
    continue;
  }
//если цифры совпали в одном месте - прибавляем быка
if (x1==y1)Bull++;
if (x2==y2)Bull++;
if (x3==y3)Bull++;
if (x4==y4)Bull++;
if (x5==y5)Bull++;

//если цифры совпали, но в разных местах - прибавляем корову
if(x1==y2 || x1==y3 || x1==y4 || x1==y5)Cow++;
if(x2==y1 || x2==y3 || x2==y4 || x2==y5)Cow++;
if(x3==y1 || x3==y2 || x3==y4 || x3==y5)Cow++;
if(x4==y1 || x4==y2 || x4==y3 || x4==y5)Cow++;
if(x5==y1 || x5==y2 || x5==y3 || x5==y4)Cow++;
  
//условие выиграша
  if(Bull==5){
    alert('You win \n' + count + ' steps'); 
    break;
  }

//сохраняем результаты хода в строку
  resultString = (Answer + ' Bull= ' + Bull + ' Cow= ' + Cow + '\n');
  if(count>1){
    resultString = resultStringPrevious + resultString; //добавляем при каждом новом ходе новую строку
  }

  alert(resultString); 
  resultStringPrevious = resultString;

   Bull=0;
   Cow=0;
}



