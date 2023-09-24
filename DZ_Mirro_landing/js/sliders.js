///////////////////////////////////////////////////////////////////////

const modalSliderContainer = document.getElementById('modalSlider_container');
const modalSliderBackground = document.getElementById('modalSlider_background');

function openSliderModal(event) { //відкривається модальне вікно
    event.preventDefault();
    modalSliderBackground.classList.add('active');
    modalSliderContainer.classList.add('active');
}

function closeSliderModal() { // зачиняється модальне вікно
    modalSliderContainer.classList.remove('active');
    modalSliderBackground.classList.remove('active');
}



modalSliderBackground.onclick = closeModalSliderByClickBg;

function closeModalSliderByClickBg(e) { //      якщо клікнули на бекграунд  модальне вікно зникає, якщо є
    if (modalSliderContainer.classList.contains('active') && e.target.id === 'modalSlider_background') {
        closeSliderModal();
    }
}

/////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    $('.modalSlider_content').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        focusOnSelect : true,
        prevArrow: '<button class="prev arrow"></button>',
        nextArrow: '<button class="next arrow"></button>',
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        customPaging: function(slick,index) {
            return '<a>' + (index + 1) + '</a>';
        },
        responsive: [
            {
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
            }]

    });
})