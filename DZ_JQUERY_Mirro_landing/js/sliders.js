///////////////////////////////////////////////////////////////////////

const modalSliderContainer = $('#modalSlider_container');
const modalSliderBackground = $('#modalSlider_background');
const imgCollection = $('.slider-image');
// console.log(imgCollection);


function openSliderModal(event) { //відкривається модальне вікно
    event.preventDefault();
    modalSliderBackground.addClass('active');
    modalSliderContainer.addClass('active');
    $('.modalSlider_content').slick('setPosition');                                           //всряхиваем, чтоб не тормозил с загрузкой картинок и расчетами слайдера
    $('.modalSlider_content').slick('slickFilter', `[data-img="${event.target.id}"]`);        //отфильтровываем по атрибуту 

}

function closeSliderModal() { // зачиняється модальне вікно
    modalSliderContainer.removeClass('active');
    modalSliderBackground.removeClass('active');
    $('.modalSlider_content').slick('slickUnfilter');                  //после закрытия окна со слайдами - разфильтровываем 
}

modalSliderBackground.on('click', (e) => {
    if (modalSliderContainer.hasClass('active') && e.target.id === 'modalSlider_background') {
        closeSliderModal();
    }
})

/////////////////////////////////////////////!!!!!!!!!! слайдер !!!!!!!!!!!!!!////////////////////////////////////

$(document).ready(function () {
    $('.modalSlider_content').slick({
        infinite: true,                    //по кругу
        slidesToShow: 4,                   //на странице слайдов
        slidesToScroll: 1,                  //перемотка по одному
        arrows: true,                        //показать стрелки       
        prevArrow: '<button class="prev arrow"></button>',       //стилизуем свои стрелки
        nextArrow: '<button class="next arrow"></button>',
        autoplay: true,                           //автозапуск
        autoplaySpeed: 3000,
        waitForAnimate: false,                  //не ждем окончания анимации при прокрутке
        dots: true,
        customPaging: function (slick, index) {
            return '<a>' + (index + 1) + '</a>';         //точки в числа - пагинацию
        },
        responsive: [{                                //адаптация под экраны
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                arrows: true,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: true,
            }
        },
        {
            breakpoint: 450,
            settings: {
                prevArrow: '<button class="prev arrow invisible"></button>',
                nextArrow: '<button class="next arrow invisible"></button>',
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
            }
        }
        ]
    });
})