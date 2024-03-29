// 1. Створіть HTML-сторінку з кнопкою Відкрити і модальним
// вікном. На модальному вікні має бути текст і кнопка Закрити.
// Спочатку модальне вікно не відображається. При натисканні
// на кнопку Відкрити з’являється модальне вікно, натомість на-
// тискаючи кнопку Закрити – зникає.
// 2. При кліке на бекграунд модальне окно зникає.

const modalBlock = document.getElementById('openModalBlock');
const openModalBlockWraper = document.getElementById('openModalBlockWraper');

function openModal() { //відкривається модальне вікно
  modalBlock.classList.add('active');
  openModalBlockWraper.classList.add('active');
}

function closeModal() { // зачиняється модальне вікно
  modalBlock.classList.remove('active');
  openModalBlockWraper.classList.remove('active');
}



openModalBlockWraper.onclick = closeModalByClickBg;

function closeModalByClickBg(e) { //      якщо клікнули на бекграунд  модальне вікно зникає, якщо є
   if (modalBlock.classList.contains('active') && e.target.id === 'openModalBlockWraper') {
    closeModal();
   }
}