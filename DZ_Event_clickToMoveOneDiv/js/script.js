// Разместите на странице один блок. Напишите ин-
// струкции, которые обеспечат перемещение блока при
// нажатии левой клавиши мыши в точку, в которой на-
// ходится указатель мыши.


document.addEventListener('click', function(e){
  el.style.setProperty('top', e.clientY - (el.clientHeight/2) + 'px');
  el.style.setProperty('left', e.clientX - (el.clientWidth/2) + 'px');
});