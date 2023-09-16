let listItems = document.getElementById('list');
let nextButton = document.getElementById('next');
// console.log(listItems);
let listItemsElements =  listItems.getElementsByTagName('li');
// console.log(listItems.lastChild);
for (i= 0; i< listItemsElements.length; i++){
  // console.log(listItemsElements[i]);
  listItemsElements[i].addEventListener('click', (e)=>{
    for (i= 0; i< listItemsElements.length; i++){
      listItemsElements[i].classList.remove('active');
    }
    e.target.classList.add('active');
    nextButton.disabled = false;
    console.log(e.target);
  })
}


nextButton.onclick = function(e){
  let currentList = document.getElementsByClassName('active')[0];
  let nextList = currentList.nextElementSibling;
  let lastList = currentList.parentElement.lastElementChild;
  console.log(currentList.parentElement.lastElementChild);
if(nextList)
  {nextList.classList.add('active');
  currentList.classList.remove('active');
  if (nextList == lastList) {
    nextButton.disabled = true;
  }
}
  //else if (!nextList){
  //   nextButton.disabled = true;
  //   console.log(nextButton.disabled);
  // }
}
