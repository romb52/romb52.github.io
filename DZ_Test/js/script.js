let listItems = document.getElementById('list');                                        //родитель ul li
let nextButton = document.getElementById('next');                                      // button Next
let submitButton = document.getElementById('submit-btn');                              // button type=submit Finish
let inputs = document.getElementsByClassName('form-check-input');                      // all inputs
// console.log(inputs);
let AllPages = document.getElementsByClassName('block');                               //коллекция блоков-страниц с вопросами
// console.log(AllPages);
let listItemsElements = listItems.getElementsByTagName('li');
//  console.log(listItemsElements.length);
for (i = 0; i < listItemsElements.length; i++) {                                        //перебор всех элементов li 
  // console.log(listItemsElements[i]);
  listItemsElements[i].addEventListener('click', (e) => {                                    //обработка клика по номеру пункта от 1 до 10
    for (i = 0; i < listItemsElements.length; i++) {
      listItemsElements[i].classList.remove('active');                                      
    }
    e.target.classList.add('active');
    updatePage(e.target);
    // console.log(e.target.innerText);
    // console.log(e.target);
  })
}


nextButton.onclick = function (e) {                                             //переключение на след пункт кнопкой next
  let currentList = document.getElementsByClassName('active')[0];
  let nextList = currentList.nextElementSibling;
  let lastList = currentList.parentElement.lastElementChild;
  // console.log(currentList.parentElement.lastElementChild);
  if (nextList) {
    nextList.classList.add('active');
    currentList.classList.remove('active');
  }
  updatePage(nextList);
}

function updatePage(pageNumber) {                                                  //отображаем соответствующий номеру страницы вопрос. Деактивируем кнопку Next на последнем пункте
  if (pageNumber.innerText == listItemsElements.length) {
    nextButton.disabled = true;
  } else nextButton.disabled = false;

  for (i = 0; i < AllPages.length; i++) {
    AllPages[i].classList.remove('active-block');
  }
  for (i = 0; i < AllPages.length; i++) {
    if (AllPages[i].dataset.page === pageNumber.innerText) {
      AllPages[i].classList.add('active-block')
    }
    // console.log(AllPages[i].dataset.page);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////
const answerArr = ['102', '107', '112', '115', '117', '122', '125', '130', '133', '139'];           //массив правильных ответов для і+1 вопроса




let resultBlock = document.getElementById('result');
let resultText = document.getElementById('resultText');
let correctAnswerCouter = 0;


function showResult(event) {                                        //обработка submit формы. 
  event.preventDefault();
  const form = new FormData(event.target);
  let text = "";
  Array.from(form).map((item) => {                              
    const answer = item[0];                         // атрибуты name
    const value = item[1];                           //         value input
    // console.log(form);
    for (let i = 0; i < answerArr.length; i++) {                              //при совпадении value нажатой радиокнопки с правильным ответом в массиве - добавляем + 1 правильный ответ
      if (answer === `answer-${i+1}` && value === answerArr[i]) {
        correctAnswerCouter++;
                                                                               //доработать, чтоб подсвечивались правильные и неправильные ответы
        // console.log(answer, value, correctAnswerCouter);
      }else {

      }
    }
    submitButton.disabled = true;                           //деактивируем кнопку submit
    // checkAllAnswers;
    resultBlock.classList.add('resultActive');                                    // показываем результаты теста
    resultText.textContent = `${correctAnswerCouter} correct answers`;
  });

}