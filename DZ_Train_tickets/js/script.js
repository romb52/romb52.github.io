let ticketsArr = [];
let count = 0;


//установка текущей даты, максимально и минимально возможной даты для установки

window.onload = function () {
  ticketsArr = JSON.parse(localStorage.getItem("myTickets"));
  if (ticketsArr) {
    for (let i = 0; i < ticketsArr.length; i++) {
      for (let elem of seats.elements) {
        if (ticketsArr[i].ticket_seat === elem.name) {
          elem.disabled = true;
          count++;
        }
      }
    }
  } else {
    ticketsArr = [];
  }
  document.getElementsByClassName('btn-cart-items')[0].innerText = count;
  for (let i = 0; i < ticketsArr.length; i++) {
    let ticketListItem = document.createElement('li');
    ticketListItem.innerHTML = `
    <div>${ticketsArr[i].ticket_direction}</div>
    <div>${ticketsArr[i].ticket_date}</div>
    <div>${ticketsArr[i].ticket_seat}</div>`
    document.getElementById('tickets_list').append(ticketListItem);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  let d = new Date();
  let day = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  let name_input = document.getElementById('date')
  if (month < 10) {
    name_input.value = `${year}-0${month}-${day}`;
    name_input.min = `${year}-0${month}-${day}`;
    name_input.max = `${year}-0${month + 1}-${day}`;
  } else {
    name_input.value = `${year}-${month}-${day}`;
    name_input.min = `${year}-${month}-${day}`;
    name_input.max = `${year}-${month + 1}-${day}`;
  }
  if (month < 9) {
    name_input.max = `${year}-0${month + 2}-${day}`;
  } else {
    name_input.max = `${year}-${month + 2}-${day}`;
  }
  // console.log(name_input.value)  
  // console.log(name_input.max)


});

////////////////////////////////////////////////////////////////////////////
// let totalBookingPrice = document.getElementById('totalPriceSpan').innerText;
let totalPrice = 0;
const oneTicketPrice = 550;
let count_ = 0;


const submitDirectionDate = (event) => {
  event.preventDefault();
  const selected_direction = directionDate.direction.value;
  const selected_date = directionDate.date.value;
  // console.log(selected_direction, selected_date);
  document.getElementsByClassName('seatsForm')[0].classList.add('active');
  for (let elem of seats.elements) {
    elem.addEventListener('click', () => {
      for (let elem of seats.elements) {
        if (elem.checked) count_++;
      }
      totalPrice = count_ * oneTicketPrice;
      // document.getElementsByClassName('btn-cart-items')[0].innerText = count;
      document.getElementById('totalPriceSpan').innerText = `${totalPrice}`;
      count_ = 0;
    })
  }
}


///////////////////////////////////////////////////////////////////////////
const modalBlock = document.getElementById('openModalBlock');
const openModalBlockWraper = document.getElementById('openModalBlockWraper');


function submitSeats(event) {
  event.preventDefault();
  const selected_direction = directionDate.direction.value;
  const selected_date = directionDate.date.value;

  // console.log(seats.elements);
  console.log(ticketsArr);
  for (let elem of seats.elements) {
    // console.log(elem, elem.checked, elem.disabled);
    if (elem.checked && !elem.disabled) {
      let ticketItem = {
        ticket_direction: selected_direction,
        ticket_date: selected_date,
        ticket_seat: elem.name
      }
      ticketsArr.push(ticketItem);
      let ticketListItem = document.createElement('li');
      ticketListItem.innerHTML = `
    <div>${ticketItem.ticket_direction}</div>
    <div>${ticketItem.ticket_date}</div>
    <div>${ticketItem.ticket_seat}</div>`
      document.getElementById('tickets_list').append(ticketListItem);
      elem.disabled = true;
    }
  }
  //console.log(ticketsArr);
  localStorage.setItem('myTickets', JSON.stringify(ticketsArr));
  openModal();
}

function openModal() {
  modalBlock.classList.add('active');
  openModalBlockWraper.classList.add('active');
}

function closeModal() { // зачиняється модальне вікно
  modalBlock.classList.remove('active');
  openModalBlockWraper.classList.remove('active');
  if (ticketsArr) {
    for (let i = 0; i < ticketsArr.length; i++) {
      for (let elem of seats.elements) {
        if (ticketsArr[i].ticket_seat === elem.name) {
          elem.disabled = true;
          count++;
        }
      }
    }
  } else {
    ticketsArr = [];
  }
  document.getElementsByClassName('btn-cart-items')[0].innerText = count;
  count = 0;
}