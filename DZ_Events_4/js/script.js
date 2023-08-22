// Створіть HTML-сторінку зі світлофором і кнопкою, яка пере-
// микає світлофор на наступний колір.

const modalBlock = document.querySelectorAll('.tarfficLight');
// console.log (modalBlock);
function changeLight() {
	for (i = 0; i < modalBlock.length; i++) {
		if (modalBlock[i].classList.contains('red') && modalBlock[i].classList.contains('grey') && modalBlock[i + 1].classList.contains('grey')) {
			modalBlock[i].classList.toggle('grey');
			modalBlock[i + 2].classList.toggle('grey');
			console.log('1');
			return;
		}
		if (modalBlock[i].classList.contains('orange') && modalBlock[i].classList.contains('grey')) {
			modalBlock[i].classList.toggle('grey');
			modalBlock[i - 1].classList.toggle('grey');
			console.log('2');
			return;
		}
		if (modalBlock[i].classList.contains('green') && modalBlock[i].classList.contains('grey')) {
			modalBlock[i].classList.toggle('grey');
			modalBlock[i - 1].classList.toggle('grey');
			console.log('3');
			return;
		}
	}
}