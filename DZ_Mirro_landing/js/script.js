let btnToggleDarkLight = document.getElementById('dark-theme');
let iconToggleMoonSun = document.getElementById('icon');
let isDarkTheme = false;

let menu_item = document.querySelectorAll('.menu-item');            

console.log(menu_item);
menu_item.forEach(item => item.addEventListener('click', event => {                      //на кажлый элемент меню навешиваем слушатель клика, при нажатии элемент становится активным, а все остальные элементы меню нет
	menu_item.forEach(element => element.classList.remove('active-menu'));
	item.classList.add('active-menu');
}))

window.onload = function(){
	// console.log(localStorage.getItem("isDark"))
	isDarkTheme = localStorage.getItem("isDark");             // при загрузке проверяем предыдущие настройки темы 
	if(isDarkTheme === "true") {
		document.body.classList.toggle('dark-mode');
	} else {console.log('light')}
}

btnToggleDarkLight.onclick = function (){
	document.body.classList.toggle('dark-mode');          //на клик кнопки светлой-темной темы добавляем или убираем класс .dark-mode
	// console.log('dark mode')
	if (document.body.classList.contains('dark-mode')){
	isDarkTheme = true;
	localStorage.setItem("isDark", isDarkTheme);       // запоминаем выбор темы в  localStorage
	iconToggleMoonSun.classList.remove('fa-moon');
	iconToggleMoonSun.classList.add('fa-sun');	
	// console.log(iconToggleMoonSun.nextElementSibling)
	iconToggleMoonSun.nextElementSibling.textContent = 'Light theme';
	} else {
		isDarkTheme = false;
		localStorage.setItem("isDark", isDarkTheme);
		iconToggleMoonSun.classList.remove('fa-sun');
		iconToggleMoonSun.classList.add('fa-moon');
		iconToggleMoonSun.nextElementSibling.textContent = 'Dark theme';	
	}

}