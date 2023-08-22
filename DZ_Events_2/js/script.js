// Створіть HTML-сторінку з кнопкою Відкрити і модальним
// вікном. На модальному вікні має бути текст і кнопка Закрити.
// Спочатку модальне вікно не відображається. При натисканні
// на кнопку Відкрити з’являється модальне вікно, натомість на-
// тискаючи кнопку Закрити – зникає.

const modalBlock = document.getElementById('openModalBlock');

function openModal() {
	modalBlock.classList.add('active');
}

function closeModal() {
	modalBlock.classList.remove('active');
}