$(document).ready(function () {
	let btnToggleDarkLight = $('#dark-theme');
	let iconToggleMoonSun = $('#icon');
	let isDarkTheme = false;

	let menu_item = $('.menu-item');

	let counter = 0; //cчетчик добавленного товара на кнопке корзины
	let cartItemsArr = [];

	menu_item.each(function () {
		$(this).click(function () {                    //на кажлый элемент меню навешиваем слушатель клика, при нажатии элемент становится активным, а все остальные элементы меню нет
			menu_item.removeClass('active-menu');
			$(this).addClass('active-menu');
		});
	});

	$(window).on('load', function () {
		isDarkTheme = localStorage.getItem("isDark"); // при загрузке проверяем предыдущие настройки темы
		if (isDarkTheme === "true") {
			$('body').toggleClass('dark-mode');
		}
		let cartLocStorItemsArray = JSON.parse(localStorage.getItem("cart"));
		if (cartLocStorItemsArray) {
			for (let i = 0; i < cartLocStorItemsArray.length; i++) {
				addItemToCart(cartLocStorItemsArray[i].img, cartLocStorItemsArray[i].name, cartLocStorItemsArray[i].cost, cartLocStorItemsArray[i].quantity)
				counter++;
			}
			updateCartTotal();
			updateCartButton();
		}
	});

	btnToggleDarkLight.click(function (e) {
		e.preventDefault();
		$('body').toggleClass('dark-mode');                   //на клик кнопки светлой-темной темы добавляем или убираем класс .dark-mode
		if ($('body').hasClass('dark-mode')) {
			isDarkTheme = true;
			localStorage.setItem("isDark", isDarkTheme);                       // запоминаем выбор темы в  localStorage
			iconToggleMoonSun.removeClass('fa-moon').addClass('fa-sun');
			iconToggleMoonSun.next().text('Light theme');
		} else {
			isDarkTheme = false;
			localStorage.setItem("isDark", isDarkTheme);
			iconToggleMoonSun.removeClass('fa-sun').addClass('fa-moon');
			iconToggleMoonSun.next().text('Dark theme');
		}
	});

	const modalContainer = $('#modal_container');
	const modalBackground = $('#modal_background');

	$('#openCartModal').on('click', () => {             //відкривається модальне вікно
		modalBackground.addClass('active');
		modalContainer.addClass('active');
	})

	function closeCartModal() {                           // зачиняється модальне вікно
		modalContainer.removeClass('active');
		modalBackground.removeClass('active');
	}

	$('#closeCartModal').on('click', () => {
		closeCartModal();
	});

	$('#continueShopping').on('click', () => {
		closeCartModal();
	});

	modalBackground.click(function (e) {                         // якщо клікнули на бекграунд  модальне вікно зникає, якщо є
		if (modalContainer.hasClass('active') && e.target.id === 'modal_background') {
			closeCartModal();
		}
	});

	////////////////////////////////////добавление выбраного товара в корзину и прочие радости////////////////////////////////////////////

	$('.addToCart').on('click', function (event) {                            // обработка клика на выбранный товар 
		event.preventDefault();
		let button = $(this);
		let shopItem = button.closest('.store-item');

		let imageSrc = shopItem.find('.store-image').attr('src');
		let title = shopItem.find('.store-description h3').text();
		let price = shopItem.find('.item-price').text();

		button.text('In cart').css('pointer-events', 'none');                               //после клика делаем кнопку не кликабельной и изменяем надпись "в корзине"
		addItemToCart(imageSrc, title, price);
		updateCartTotal();
		counter++;
		updateCartButton();
	});

	function updateCartButton() {
		$('.btn-cart-items').text(counter);
	}

	function addItemToCart(imageSrc, title, price, quantity = 1) {                      //добавляем выбранный товар в корзину 
		let cartListItem = $('<li></li>').addClass('cart-list-item');                    //создаем лишечку, которая будет содержать добавленный товар (картинка, название, цена)   

		let cartProduct = `
            <div class="cart-product">
                <div class="cart-product_body">
                    <a class="cart-product_picture" href="#Store">
                        <img src="${imageSrc}" alt="vol.1">
                    </a>
                    <div class="cart-product_main">
                        <a class="cart-product_title" href="#Store">${title}</a>
                    </div>
                    <div class="cart-product_remover"> <button class="border-not"><i class="fa-solid fa-trash"></i></button></div>
                </div>
                <div class="cart-product_footer">
                    <div class="cart-product_counter">
                        <button class="cart-counter-decrement border-not"><i class="fa-solid fa-minus"></i></button>
                        <input type="number" class="cart-counter-input" value="${quantity}">
                        <button class="cart-counter-increment border-not"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div class="cart-product-coast">
                        <p><span class="cart-item-price">${price}</span>₴</p>
                    </div>
                </div>
            </div>`;

		cartListItem.html(cartProduct);
		$('.cart-list').append(cartListItem);

		let cartItem = {                                            //создадим обьект cartItem, который будет содержать данные по каждому товару (для сохранения в localStorage)
			img: imageSrc,
			name: title,
			cost: price,
			quantity: quantity
		};
		cartItemsArr.push(cartItem);
		localStorage.setItem('cart', JSON.stringify(cartItemsArr));                            // сохраняем массив товаров в корзине в localStorage

		cartListItem.find('.cart-product_remover button').on('click', removeCartItem);
		cartListItem.find('.cart-counter-input').on('change', quantityChanged);
		cartListItem.find('.cart-counter-increment').on('click', quantityIncreased);
		cartListItem.find('.cart-counter-decrement').on('click', quantityDecreased);
		cartListItem.find('.cart-counter-decrement').on("mouseenter", colorLightDecreased).on("mouseleave", colorDarkDecreased).on('mouseup', colorDecreased);

		// cartListItem.find('.cart-counter-decrement').mouseenter(colorLightDecreased);
		// cartListItem.find('.cart-counter-decrement').mouseleave(colorDarkDecreased);
	}

	function removeCartItem(event) {                                                           //удалить товар из корзины
		let buttonClicked = $(this);
		buttonClicked.closest('.cart-list-item').remove();
		updateCartTotal();
		counter--;

		let storeDescr = $('.store-description');
		let removedItemTittle = buttonClicked.closest('.cart-list-item').find('.cart-product_title').text();

		for (let i = 0; i < cartItemsArr.length; i++) {                                            //удаляем объект из массива сохраненных в localStorage товаров
			if (cartItemsArr[i].name === removedItemTittle) {
				cartItemsArr.splice(i, 1);
			}
		}
		localStorage.setItem('cart', JSON.stringify(cartItemsArr));

		for (let i = 0; i < storeDescr.length; i++) {
			let itemTitle = storeDescr.eq(i).find('h3').text();
			if (itemTitle == removedItemTittle) {
				storeDescr.eq(i).find(".addToCart").text('Add to cart').css('pointer-events', 'auto');        //возвращаем кликабельность удаленному товару на основной странице
			}
		}
	}

	function quantityChanged() {                                                   //изменение количества товара
		let input = $(this);
		if (isNaN(input.val()) || input.val() <= 0) {
			input.val(1);
		}
		let ItemTittle = input.closest('.cart-list-item').find('.cart-product_title').text();
		updateQuantityOfCartItem(ItemTittle, input.val());
		localStorage.setItem('cart', JSON.stringify(cartItemsArr));
		updateCartTotal();
	}

	function quantityDecreased() {                                                             // уменьшаем количество товара на 1 при нажатии на минус
		let decr = $(this);
		let input = decr.closest('.cart-product_counter').find('.cart-counter-input');
		// console.log(input.val());
		if (input.val() >= 2) {
			input.val(input.val() - 1);
		}
		let ItemTittle = input.closest('.cart-list-item').find('.cart-product_title').text();
		updateQuantityOfCartItem(ItemTittle, input.val());
		localStorage.setItem('cart', JSON.stringify(cartItemsArr));
		updateCartTotal();
	}

	function quantityIncreased() {                                                               //увеличиваем количество товара на 1 при нажатии на плюс
		let incr = $(this);
		let input = incr.closest('.cart-product_counter').find('.cart-counter-input');
		input.val(parseInt(input.val()) + 1);
		let ItemTittle = input.closest('.cart-list-item').find('.cart-product_title').text();
		updateQuantityOfCartItem(ItemTittle, input.val());
		localStorage.setItem('cart', JSON.stringify(cartItemsArr));
		updateCartTotal();
	}

	function updateQuantityOfCartItem(itemName, newQuantity) {                      //изменяем колтчество товара объекта из массива сохраненных в localStorage товаров
		cartItemsArr.forEach((item) => {
			if (item.name === itemName) item.quantity = newQuantity;
		});
		//  console.log(cartItemsArr);
	}

	function colorLightDecreased() {                                                          //если инпут больше 1 - то подсвечиваем минус при наведении
		let decr = $(this).children();
		decr.css('color', '#60bf81');
		let input = decr.closest('.cart-product_counter').find('.cart-counter-input');
		if (input.val() >= 2) {
			decr.css('color', '#60bf81');
		} else {
			decr.css('color', '#3A5F56');
		}
	}
	function colorDarkDecreased() {                                //минус обратно темнеет, когда не в ховере
		let decr = $(this).children();
		decr.css('color', '#3A5F56');
	}
	function colorDecreased(){                                   //если в инпуте уже 1, то минус не подсвечиваем ()
		let decr = $(this).children();
		decr.css('color', '#60bf81');
		let input = decr.closest('.cart-product_counter').find('.cart-counter-input');
		if (input.val() >= 3) {
			decr.css('color', '#60bf81');
		} else {
			decr.css('color', '#3A5F56');
		}
	}

	function updateCartTotal() {                                        //посчет итоговой цены
		let cartItemContainer = $('.cart-list');
		let cartRows = cartItemContainer.find('.cart-list-item');
		let total = 0;

		for (let i = 0; i < cartRows.length; i++) {
			let cartRow = cartRows.eq(i);
			let priceElement = cartRow.find('.cart-item-price').text();
			let quantityElement = cartRow.find('.cart-counter-input');
			let price = parseInt(priceElement);
			let quantity = quantityElement.val();
			total += price * quantity;                               //посчет всех цен товаров в корзине с учетом их количества
		}
		$('.total-price').text('$' + total);
	}
});
