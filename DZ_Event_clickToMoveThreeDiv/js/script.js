// Разместите на странице 3 блока. Напишите инструк-
// ции, которые обеспечат перемещение в точку, в ко-
// торой находится указатель мыши: первого блока —
// при нажатии левой клавиши мыши, второго блока —
// при нажатии средней клавиши (или колеса), треть-
// его блока — при нажатии правой клавиши мыши.
// Контекстное меню при нажатии правой клавиши
// мыши появляться не должно.

// The MouseEvent.button is a read-only property that returns a number. Each number represents a button on the mouse:

// 0 - Main button
// 1 - Wheel button (middle button if present)
// 2 - Secondary button
// 3 - Fourth button (Back button)
// 4 - Fifth button (Forward button)

//при нажатии левой кнопки мыши
document.addEventListener('click', function(e){
	console.log(e.button);
	if(e.button == 0){
 	elLeft.style.setProperty('top', e.clientY - (elLeft.clientHeight/2) + 'px');
 	elLeft.style.setProperty('left', e.clientX - (elLeft.clientWidth/2) + 'px');
}
});

// при нажатии на колесо(средняя клавиша)
document.addEventListener('auxclick', function(e){
	console.log(e.button);
	if(e.button == 1){
 	elMiddle.style.setProperty('top', e.clientY - (elMiddle.clientHeight/2) + 'px');
  	elMiddle.style.setProperty('left', e.clientX - (elMiddle.clientWidth/2) + 'px');
}
});

// при нажатии правой клавиши 
document.addEventListener('contextmenu', function(e){
	console.log(e.button);
	if(e.button == 2){
	event.preventDefault();   //убираем появление конт.меню
  	elRight.style.setProperty('top', e.clientY - (elRight.clientHeight/2) + 'px');
  	elRight.style.setProperty('left', e.clientX - (elRight.clientWidth/2) + 'px');
}
});