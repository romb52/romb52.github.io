// Створіть HTML-сторінку зі списком статей.
// При прокручуванні сторінки вниз більш, ніж на 100 пікселів,
// внизу праворуч має з’явитися кнопка Вгору – для швидкого пе-
// реходу на початок сторінки.

const rowup = document.querySelector("a");

window.addEventListener('scroll', function(e) {
  console.log(window.scrollY + " " + document.documentElement.clientHeight);
if((window.scrollY >= 100) && (!rowup.classList.contains("active"))) {
 rowup.classList.add("active");


 console.log (rowup.classList.contains("active"))
} else if ((window.scrollY < 100) && rowup.classList.contains("active")){
  rowup.classList.remove("active");  
}  
});