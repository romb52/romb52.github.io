let firstNumber ='';
let secondNumber ='';
let arithmeticOperation;
let indexArithmeticOperation;
let result;
let str = prompt('Введите математическую операцию с двумя числами (например: x+y; x-y; x*y; x/y) '); 
//Функции для арифметических операций
function addition(first, second){
  return first + second;
}
function subtraction(first, second){
  return first - second;
}
function multiplication(first, second){
  return first * second;
}
function division(first, second){
  return first / second;
}

function enterMe(){
  str = prompt('Введите математическую операцию с двумя числами (например: x+y; x-y; x*y; x/y) '); 
}

//Функция вывода на экран
function showMe(first, oper, second, res){
  alert(first + oper + second + ' = ' + res);
}

//поиск знака арифметической операции в полученной от пользователя строке str
for (let i=0; i<str.length; i++){
  //console.log(str[i]);
  if(str[i] ==  '+' || str[i] ==  '-' || str[i] ==  '*' ||str[i] ==  '/'){
    arithmeticOperation = str[i];
    indexArithmeticOperation = i;
  }
}
//поиск первого числа
for (let i=0; i<indexArithmeticOperation; i++){
  firstNumber += str[i];
}
//поиск второго числа
for (let i=indexArithmeticOperation+1; i<str.length; i++){
  secondNumber += str[i];
}
//приводим число из строки к int
firstNumber = parseInt(firstNumber);
secondNumber = parseInt(secondNumber);
//console.log(typeof firstNumber);
//console.log(firstNumber);
//console.log(arithmeticOperation);
//console.log(secondNumber);

//в зависимости от знака арифметической операции вызываем соответствующие функции для расчета выражения и для вывода на экран 

switch (arithmeticOperation){
  case '+':
   showMe(firstNumber, arithmeticOperation, secondNumber, addition(firstNumber, secondNumber));     
    break;
  case '-':
    showMe(firstNumber, arithmeticOperation, secondNumber, subtraction(firstNumber, secondNumber));     
    break; 
    case '*':
    showMe(firstNumber, arithmeticOperation, secondNumber,multiplication(firstNumber, secondNumber));      
    break;
    case '/':
    showMe(firstNumber, arithmeticOperation, secondNumber, division(firstNumber, secondNumber)); 
    break;
  default:
    alert( "Arithmetic operation doesn't exist" );
}