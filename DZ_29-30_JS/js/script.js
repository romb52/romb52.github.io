/* 1. Создать программу, которая выводит на экран простые числа от 2 до 1000. 
(число называется простым, если оно делиться только на 1 и на само себя без остатка;
 причем числа 1 и 2 простыми не считаются).*/

document.write("<br> Exercise 1 <br>");
for ( let i=3; i<=1000; i++) {
	for (let j=2; j<=i; j++){
		if (i%j != 0) continue;     //если число делится с остатком, то останавливаем итерацию и переходим к j++
		if (j<i) break;             //после деления число без остатка, но j меньше i (значит i не простое)
		                            //останавливаем внутренний цикл, переходим на внешний к следующему i
		if (i==j) document.write (i + ', ');  //выводим на экран простое число i
	}
}
document.write("<br>");



/* 2. Написать программу, которая выводит на экран следующую фигуру:
**********************************
*                                *
*                                *
*                                *
**********************************
ширина и высота фигуры задаются в ручную */

document.write("<br> Exercise 2 <br>");
document.write('<pre>');
//document.write("<br> Exercise 2 <br>");
let hight = prompt('enter hight of rectangle');                     //запрашиваем значение ширины и высоты
let width = prompt('enter width of rectangle');
for ( let i=1; i<=hight; i++) {         //внешний цикл - кол-во строк в прямоугольнике
	for (let j=1; j<=width; j++) {      //во внутреннем цикле выводим символы "*" или " " в каждой строке
		if (i==1 || i==hight || j==1 || j==width) document.write('*');
		else document.write(' ');
	}
	document.write("<br>");
}
document.write('</pre>');



/* 3. При помощи цикла показать на экран календарь текущего месяца. */

document.write("<br> Exercise 3 <br>");
document.write('<pre>');
document.write("          May <br>");
document.write(" Mo Tu We Th Fr Sa Su <br>");
let sum = 0;                                //счетчик для дней
for (let i=1; i<=6; i++) {
	for (let j=1; j<=7; j++) {
		if (i==1 && j<7 || i==6 && j>2)      // пробелы (дни другого месяца)
			document.write("   ");
		else {
			sum++;
			if (sum < 10) document.write(" ");
			document.write(" " + sum);
		}
	}
	document.write("<br>");
}
document.write('</pre>');

