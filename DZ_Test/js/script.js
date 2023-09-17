let listItems = document.getElementById('list');
let nextButton = document.getElementById('next');
let AllPages = document.getElementsByClassName('block');
// console.log(AllPages);
let listItemsElements = listItems.getElementsByTagName('li');
//  console.log(listItemsElements.length);
for (i = 0; i < listItemsElements.length; i++) {
  // console.log(listItemsElements[i]);
  listItemsElements[i].addEventListener('click', (e) => {
    for (i = 0; i < listItemsElements.length; i++) {
      listItemsElements[i].classList.remove('active');
    }
    e.target.classList.add('active');

    updatePage(e.target);


    // console.log(e.target.innerText);

    // console.log(e.target);
  })
}


nextButton.onclick = function (e) {
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

function updatePage(pageNumber) {
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
let resultBlock = document.getElementById('result');
let resultText = document.getElementById('resultText');
let correctAnswerCouter = 0;


function showResult(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  let text = "";
  Array.from(form).map((item) => {
    const answer = item[0];
    const value = item[1];
    console.log(answer, value);
    if (answer === 'answer-1' && value === '102'){
      
      correctAnswerCouter ++;      
    } 
    resultBlock.classList.add('resultActive');
    resultText.textContent = `${correctAnswerCouter} correct answers`;

  });

}