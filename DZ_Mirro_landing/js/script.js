let btnToggleDarkLight = document.getElementById('dark-theme');
let iconToggleMoonSun = document.getElementById('icon');
let isDarkTheme = false;

let menu_item = document.querySelectorAll('.menu-item');

let counter = 0;                 //cчетчик добавленного товара на кнопке корзини
let cartItemsArr = [];

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
	// console.log(JSON.parse(localStorage.getItem("cart")));
let cartLocStorItemsArray = JSON.parse(localStorage.getItem("cart"));
// addItemToCart(imageSrc, title, price)
if(cartLocStorItemsArray){for ( let i= 0 ;i < cartLocStorItemsArray.length; i ++ ){
	addItemToCart(cartLocStorItemsArray[i].img, cartLocStorItemsArray[i].name, cartLocStorItemsArray[i].cost, cartLocStorItemsArray[i].quantity)
	counter++; 
}
updateCartTotal();
updateCartButton();}


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



////////////////////////////////////добавление выбраного товара в корзину и прочие радости////////////////////////////////////////////



let addToCart = document.getElementsByClassName('addToCart')
for (let i = 0; i < addToCart.length; i++) {
	let button = addToCart[i]
	button.addEventListener('click', addToCartClicked)
}

function addToCartClicked(event) {                           // обработка клика на выбранный товар 
	event.preventDefault();
	let button = event.target;
	let shopItem = button.parentElement.parentElement.parentElement;

	// console.log(shopItem)
	let imageSrc = shopItem.getElementsByClassName('store-image')[0].src
	let title = shopItem.getElementsByClassName('store-description')[0].getElementsByTagName('h3')[0].innerText;
	let price = shopItem.getElementsByClassName('item-price')[0].innerText;

	button.innerText = 'In cart';                              //после клика делаем кнопку не кликабельной и изменяем надпись "в корзине"
	button.style.pointerEvents = "none";
	// document.getElementsByClassName('cart-item-price')[0].innerText  = '1'; 
	// console.log(document.getElementsByClassName('cart-item-price')[0])
	addItemToCart(imageSrc, title, price);
	updateCartTotal();
	counter++;
	updateCartButton();
}

function updateCartButton() {

	document.getElementsByClassName('btn-cart-items')[0].innerText = counter;
	// console.log(document.getElementsByClassName('cart-item-price')[0]);
}

function addItemToCart(imageSrc, title, price, quantity = 1) {                     //добавляем выбранный товар в корзину 
	let cartListItem = document.createElement('li');                //создаем лишечку, которая будет содержать добавленный товар (картинка, название, цена)   
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
			<input type="number" class="cart-counter-input" value="${quantity}">
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
	///////////////////////////
	let cartItem = {                                     //создадим обьект cartItem, который будет содержать данные по каждому товару (для сохранения в localStorage)
		img: imageSrc,
		name: title,
		cost: price,
		quantity: quantity
	}
	cartItemsArr.push(cartItem);
	console.log(cartItemsArr)


	localStorage.setItem('cart', JSON.stringify(cartItemsArr));        // сохраняем массив товаров в корзине в localStorage

	cartListItem.getElementsByClassName('cart-product_remover')[0].addEventListener('click', removeCartItem);
	cartListItem.getElementsByClassName('cart-counter-input')[0].addEventListener('change', quantityChanged);
	///////////////
	cartListItem.getElementsByClassName('cart-counter-increment')[0].addEventListener('click', quantityIncreased);
	cartListItem.getElementsByClassName('cart-counter-decrement')[0].addEventListener('click', quantityDecreased);


	cartListItem.getElementsByClassName('cart-counter-decrement')[0].addEventListener('mouseover', colorLightDecreased);
	cartListItem.getElementsByClassName('cart-counter-decrement')[0].addEventListener('mouseout', colorDarkDecreased);
}

function removeCartItem(event) {                       //удалить товар из корзины
	var buttonClicked = event.target
	buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
	updateCartTotal();
	counter--;
	updateCartButton();
	let storeDescr = document.getElementsByClassName('store-description');
	let removedItemTittle = buttonClicked.parentElement.parentElement.previousElementSibling.getElementsByTagName('a')[0].innerText;

	for (let i = 0; i < cartItemsArr.length; i++) {             //удаляем объект из массива сохраненных в localStorage товаров 
		if (cartItemsArr[i].name === removedItemTittle) { cartItemsArr.splice(i, 1) };
	}
	localStorage.setItem('cart', JSON.stringify(cartItemsArr));
	// console.log(cartItemsArr)
	// console.log(removedItemTittle); 
	for (let i = 0; i < storeDescr.length; i++) {
		let itemTitle = storeDescr[i].getElementsByTagName('h3')[0].innerText;
		if (itemTitle == removedItemTittle) {                                                   //возвращаем кликабельность удаленному товару на основной странице
			storeDescr[i].getElementsByClassName("addToCart")[0].innerText = 'Add to cart';
			storeDescr[i].getElementsByClassName("addToCart")[0].style.pointerEvents = "auto";
		}

		// console.log(itemTitle)
	}
}


function quantityChanged(event) {	              //изменение количества товара
	let input = event.target
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1
	}
	let ItemTittle = input.parentElement.parentElement.previousElementSibling.getElementsByClassName('cart-product_title')[0].innerText;
	for (let i = 0; i < cartItemsArr.length; i++) {             //изменяем колтчество товара объекта из массива сохраненных в localStorage товаров 
		if (cartItemsArr[i].name === ItemTittle) { cartItemsArr[i].quantity = input.value };
	}
	localStorage.setItem('cart', JSON.stringify(cartItemsArr));
	// console.log(ItemTittle);
	updateCartTotal();
}

function quantityDecreased(event) {                              // уменьшаем количество товара на 1 при нажатии на минус
	let decr = event.target;
	let input = decr.parentElement.nextElementSibling;
	if (input.value >= 2) {
		input.value = --input.value;
	}
	// console.log(input.value);
	let ItemTittle = input.parentElement.parentElement.previousElementSibling.getElementsByClassName('cart-product_title')[0].innerText;
	for (let i = 0; i < cartItemsArr.length; i++) {             //изменяем колтчество товара объекта из массива сохраненных в localStorage товаров 
		if (cartItemsArr[i].name === ItemTittle) { cartItemsArr[i].quantity = input.value };
	}
	// console.log(ItemTittle);
	localStorage.setItem('cart', JSON.stringify(cartItemsArr));
	updateCartTotal()
}

function quantityIncreased(event) {                       //увеличиваем количество товара на 1 при нажатии на плюс
	let incr = event.target;
	let input = incr.parentElement.previousElementSibling
	input.value = ++input.value;
	let ItemTittle = input.parentElement.parentElement.previousElementSibling.getElementsByClassName('cart-product_title')[0].innerText;
	for (let i = 0; i < cartItemsArr.length; i++) {             //изменяем колтчество товара объекта из массива сохраненных в localStorage товаров 
		if (cartItemsArr[i].name === ItemTittle) { cartItemsArr[i].quantity = input.value; };
	}
	localStorage.setItem('cart', JSON.stringify(cartItemsArr));
	// console.log(ItemTittle);
	updateCartTotal()
}

function colorLightDecreased(event) {                           //если инпут больше 1 - то подсвечиваем минус при наведении
	let decr = event.target;
	let input = decr.parentElement.nextElementSibling;
	if (input.value >= 2) {
		decr.style.color = "#60bf81";
	} else decr.style.color = "#3A5F56";
}

function colorDarkDecreased(event) {              //изменение цвета минуса при отводе мыши
	let decr = event.target;
	decr.style.color = "#3A5F56";
}


function updateCartTotal() {                                                    //посчет итоговой цены
	let cartItemContainer = document.getElementsByClassName('cart-list')[0]
	let cartRows = cartItemContainer.getElementsByClassName('cart-list-item')
	let total = 0
	for (let i = 0; i < cartRows.length; i++) {
		let cartRow = cartRows[i]
		let priceElement = cartRow.getElementsByClassName('cart-item-price')[0].innerText
		let quantityElement = cartRow.getElementsByClassName('cart-counter-input')[0]
		let price = parseInt(priceElement)
		let quantity = quantityElement.value
		// if (quantity >= 2){
		// 	quantityElement.nextElementSibling.childNodes[0].style.color = "#60bf81";
		// 	quantityElement.previousElementSibling.childNodes[0].style.color = "#60bf81";
		// }

		total = total + (price * quantity)              //посчет всех цен товаров в корзине с учетом их количества
	}
	// total = Math.round(total * 100) / 100
	document.getElementsByClassName('total-price')[0].innerText = '$' + total
}