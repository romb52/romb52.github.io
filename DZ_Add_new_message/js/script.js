

const rowup = document.querySelector("a");            //оставил плавный скрол с прошлого задания
const form = document.querySelector('form');

window.addEventListener('scroll', function (e) {
  console.log(window.scrollY + " " + document.documentElement.clientHeight);
  if ((window.scrollY >= 100) && (!rowup.classList.contains("active"))) {
    rowup.classList.add("active");


    console.log(rowup.classList.contains("active"))
  } else if ((window.scrollY < 100) && rowup.classList.contains("active")) {
    rowup.classList.remove("active");
  }
});


function addNewMessage(event) {                             // обработка нажатия submit 
  event.preventDefault();
  let name = "",                                      //создаем переменные для имени и текста
    messageText = "";
  for (let elem of form.elements) {                  //перебираем элементы формы
  
    // console.log(elem.type);
    if (elem.type === 'text') {                           //в текстовом инпуте берем имя 
      name = elem.value;
      if (name === "") { 
        elem.style.borderColor = "red";                                            //если поле пустое - добавляем красный бордюр и выводим предупреждающее сообщение в .errors
        elem.parentElement.nextElementSibling.textContent = 'Write your name';
       } else if (name != "") {
        elem.style.borderColor = "#BF8563";
        elem.parentElement.nextElementSibling.textContent = '';
        console.log(elem)
      }
    }
    else if (elem.type === 'textarea') {
      messageText = elem.value;
      if (messageText === "") { 
        elem.style.borderColor = "red";                                          //если поле пустое - добавляем красный бордюр и выводим предупреждающее сообщение в .errors
        elem.parentElement.nextElementSibling.textContent = 'Write a message';
      } else {
        elem.style.borderColor = "#BF8563";
        elem.parentElement.nextElementSibling.textContent = '';
        console.log(elem)
      }
      // console.log(elem); 
    }
  }
  let newArticleItem = document.createElement('li');          //создаем новую лишечку и добавляем в HTML код имя, введенный текст и время с датой
  let today = new Date();                                     //текущее время/дата
  let newArticleDiv = `
<div class="article">
<div class="title_message"><span id="name">${name}</span><span id="time_date">${today.toLocaleTimeString()}  ${today.toLocaleDateString()}</span>
</div>
<div class="content_message">
  <p>${messageText}</p>
</div>
</div>`

  newArticleItem.innerHTML = newArticleDiv;                     
  if (name != "" && messageText != "") {         //если нет аустый полей - сабмитим и очищаем поля формы
    document.getElementsByClassName('messageBox')[0].append(newArticleItem);
    form.reset();
  }
  //console.log(article);  

  //
}

