let btnToggleDarkLight = document.getElementById('dark-theme');
let iconToggleMoonSun = document.getElementById('icon');
let isDarkTheme = false;

let menu_item = document.querySelectorAll('.menu-item');

// console.log(menu_item);
menu_item.forEach(item => item.addEventListener('click', event => { //на кажлый элемент меню навешиваем слушатель клика, при нажатии элемент становится активным, а все остальные элементы меню нет
	menu_item.forEach(element => element.classList.remove('active-menu'));
	item.classList.add('active-menu');
}))

window.onload = function () {
	// console.log(localStorage.getItem("isDark"))
	isDarkTheme = localStorage.getItem("isDark"); // при загрузке проверяем предыдущие настройки темы 
	if (isDarkTheme === "true") {
		document.body.classList.toggle('dark-mode');
	}
}

btnToggleDarkLight.onclick = function (e) {
	e.preventDefault();
	document.body.classList.toggle('dark-mode'); //на клик кнопки светлой-темной темы добавляем или убираем класс .dark-mode
	// console.log('dark mode')
	if (document.body.classList.contains('dark-mode')) {
		isDarkTheme = true;
		localStorage.setItem("isDark", isDarkTheme); // запоминаем выбор темы в  localStorage
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



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Shoping/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//открыть модальное окно 
const modalContainer = document.getElementById('modal_container');
const modalBackground = document.getElementById('modal_background');

function openCartModal() { //відкривається модальне вікно
	modalBackground.classList.add('active');
	modalContainer.classList.add('active');
}

function closeCartModal() { // зачиняється модальне вікно
	modalContainer.classList.remove('active');
	modalBackground.classList.remove('active');
}



modalBackground.onclick = closeModalByClickBg;

function closeModalByClickBg(e) { //      якщо клікнули на бекграунд  модальне вікно зникає, якщо є
	if (modalContainer.classList.contains('active') && e.target.id === 'modal_background') {
		closeCartModal();
	}
}



////////////////////////////////////////////////////////////////////////////////
let counter = 0;


let addToCart = document.getElementsByClassName('addToCart')
for (let i = 0; i < addToCart.length; i++) {
	let button = addToCart[i]
	button.addEventListener('click', addToCartClicked)
}

function addToCartClicked(event) {
	event.preventDefault();
	let button = event.target;
	let shopItem = button.parentElement.parentElement.parentElement;

	// console.log(shopItem)
	let imageSrc = shopItem.getElementsByClassName('store-image')[0].src
	let title = shopItem.getElementsByClassName('store-description')[0].getElementsByTagName('h3')[0].innerText;
	let price = shopItem.getElementsByClassName('item-price')[0].innerText;

	button.innerText = 'In cart';
	button.style.pointerEvents = "none";
	// document.getElementsByClassName('cart-item-price')[0].innerText  = '1'; 
	// console.log(document.getElementsByClassName('cart-item-price')[0])
	addItemToCart(imageSrc, title, price)
	updateCartTotal();
	counter++;
	updateCartButton();
}

function updateCartButton() {

	document.getElementsByClassName('btn-cart-items')[0].innerText = counter;
	// console.log(document.getElementsByClassName('cart-item-price')[0]);
}

function addItemToCart(imageSrc, title, price) {
	let cartListItem = document.createElement('li');
	cartListItem.classList.add('cart-list-item');

	let cartProduct = `
	<div class="cart-product">
	<div class="cart-product_body">
		<a class="cart-product_picture" href="#Store">
			<img src="${imageSrc}" alt="vol.1">
		</a>
		<div class="cart-product_main">
			<a class="cart-product_title" href="#Store">${title}</a>
		</div>
		<div class="cart-product_remover"> <button class="border-not"><i
					class="fa-solid fa-trash"></i></button></div>
	</div>
	<div class="cart-product_footer">
		<div class="cart-product_counter">
			<button class="cart-counter-decrement border-not"><i
					class="fa-solid fa-minus"></i></button>
			<input type="number" class="cart-counter-input" value="1">
			<button class="cart-counter-increment border-not"><i
					class="fa-solid fa-plus"></i></button>
		</div>
		<div class="cart-product-coast">
			<p><span class="cart-item-price">${price}</span>₴</p>
		</div>
	</div>
</div>`
	cartListItem.innerHTML = cartProduct
	document.getElementsByClassName('cart-list')[0].append(cartListItem)
	cartListItem.getElementsByClassName('cart-product_remover')[0].addEventListener('click', removeCartItem)
	cartListItem.getElementsByClassName('cart-counter-input')[0].addEventListener('change', quantityChanged)
}

function removeCartItem(event) {
	var buttonClicked = event.target
	buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
	updateCartTotal();
	counter--;
	updateCartButton();
	let storeDescr = document.getElementsByClassName('store-description');

	console.log(buttonClicked.parentElement.parentElement.previousElementSibling.getElementsByTagName('a')[0].innerText)
	for (let i = 0; i < storeDescr.length; i++) {
		let itemTitle = storeDescr[i].getElementsByTagName('h3')[0].innerText;
		if (itemTitle == buttonClicked.parentElement.parentElement.previousElementSibling.getElementsByTagName('a')[0].innerText) {
			storeDescr[i].getElementsByClassName("addToCart")[0].innerText = 'Add to cart';
			storeDescr[i].getElementsByClassName("addToCart")[0].style.pointerEvents = "auto";
		}

		console.log(itemTitle)
	}
 }


function quantityChanged(event) {
	var input = event.target
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1
	}
	updateCartTotal()
}

function updateCartTotal() {
	let cartItemContainer = document.getElementsByClassName('cart-list')[0]
	var cartRows = cartItemContainer.getElementsByClassName('cart-list-item')
	var total = 0
	for (var i = 0; i < cartRows.length; i++) {
		var cartRow = cartRows[i]
		var priceElement = cartRow.getElementsByClassName('cart-item-price')[0].innerText
		var quantityElement = cartRow.getElementsByClassName('cart-counter-input')[0]
		var price = parseInt(priceElement)
		var quantity = quantityElement.value
		total = total + (price * quantity)
	}
	// total = Math.round(total * 100) / 100
	document.getElementsByClassName('total-price')[0].innerText = '$' + total
}