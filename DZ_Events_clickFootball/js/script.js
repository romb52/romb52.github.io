// Створіть HTML-сторінку з футбольним полем, яке займає всю
// ширину та висоту екрану, і м’ячем розміром 100 на 100 пікселів.
// Зробіть так, щоб клікнувши мишкою по полю, м’яч плавно
// переміщався на місце кліка. Враховуйте, щоб центр м’яча зупинявся
// саме там, де було здійснено клік мишкою. Також передбачте, аби
// м’яч не вилітав за межі поля.


document.addEventListener('click', function (e) {
  let Xcoord; //координаты левого верхнего угла мяча 
  let Ycoord;
  if (e.clientY < ball.clientHeight / 2) { // условие не пересечь верхнюю границу поля
    Ycoord = 0;
  } else if (e.clientY > (footballField.clientHeight - ball.clientHeight / 2)) { // условие не пересечь нижнюю границу поля
    Ycoord = footballField.clientHeight - ball.clientHeight;
  } else Ycoord = e.clientY - ball.clientHeight / 2; // иначе координаты клика по У со смещением на середину мяча

  if (e.clientX < ball.clientWidth / 2) { //левая граница поля
    Xcoord = 0;
  } else if (e.clientX > (footballField.clientWidth - ball.clientWidth / 2)) { //правая граница поля
    Xcoord = footballField.clientWidth - ball.clientWidth;
  } else Xcoord = e.clientX - ball.clientWidth / 2;


  ball.style.setProperty('top', Ycoord + 'px'); //передвигаем мячь
  ball.style.setProperty('left', Xcoord + 'px');
 
});