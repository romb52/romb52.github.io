//Пишим калькулятор выражений 
//var array = [2, '*', '(', 2, "+", 2, ')', "*", 2];

let openBrackets, closeBrackets;
let array = [2, '*', '(', 2, "+", 2, ')', "*", 2];
//2*(2+2)*2
for(let i=0; i<array.length; i++){
  if(array[i]=='(')openBrackets=i;
  if(array[i]==')')closeBrackets=i;
}

for (let j=openBrackets+1; j<closeBrackets; j++){
	if(array[j]=='*'){
		array[j-1]=array[j-1]*array[j+1];
		array.splice(j, 2);
	}
}
//console.log( openBrackets,' ', closeBrackets)

for (let j=openBrackets+1; j<closeBrackets; j++){
	if(array[j]=='+'){
		array[j-1]=array[j-1]+array[j+1];
		array.splice(j, 2);
	}
}
//console.log(array);

for(let i=0; i<array.length; i++){
  if(array[i]=='(')array.splice(i,1);
  if(array[i]==')')array.splice(i,1);
}
//console.log(array);

for (let i=0; i<array.length; i++){
	if(array[i]=='*'){		
		array[i-1]=array[i-1]*array[i+1];
		array.splice(i, 2);
		i=i-2;
	}
}
//console.log(array);

for (let i=0; i<array.length; i++){
	if(array[i]=='+'){
		array[i-1]=array[i-1]+array[i+1];
		array.splice(i, 2);
		i=i-2;
	}
}
console.log(array);







