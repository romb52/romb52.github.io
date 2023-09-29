//массивы с числами, большими и малыми буквами. //
const numDigitsArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
  lowerLettersArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  UpperLettersArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

$(document).ready(function () {                           //после полной загрузки  
  $('#charLong').focus(function () {                           //инпут с длинной строки в фокусе
    $(this).css('border', '1px solid #0070f6');               //добавляем синюю обводку
    $(this).change(function () {                              //если что-то меняется в инпуте - отслеживаем    (хотя можно просто выставить min & max и не морочиться так)
      // console.log($(this).val().length);
      if (parseInt($(this).val()) > 0) {                           //если число в инпуте больше нуля 
        this.style.width = ($(this).val().length + 2) + "em";    //меняем длину окошка инпута в зависимости от длины вводимого числа
        // console.log(boxWidthStr);
        $('#ResultString').val("").css('color', '#000');          //перекрашиваем буквы в черный и обнуляем строку с результатами 
      } else {
        // $('#charLong').css('border', '1px solid red');
        $('#ResultString').val('Should be more charecters then 0').css('color', 'red'); //аларм в красном цвете если 0 или отрицательное число
      }
    })
  })
  // $('#ResultString').val("").css('color', '#000');
  $("form").on("submit", function (event) {                 //отправка формы
    event.preventDefault();                                  //убираем обновление по дефолту
    $('#ResultString').val("").css('color', '#000');           //стираем предыдущее содержание инпута с результатом
    const form = new FormData(event.target);                   //обьект с данными data елементов формы
    let strLength = 0;
    let strRes = "";
    let checked = false;                                        //переменная для проверки выбран ли хоть один чекбокс 
    let tempArr = [];
    // console.log(form);
    Array.from(form).map((item) => {                           //перебираем елементы с полями name=item[0] & value=item[1]
      const field = item[0];
      const val = item[1];
      // console.log(field, val);
      if (field === 'charLong' && val <= 0) {                        //если задана длина строки меньше 1
        $('#charLong').css('border', '1px solid red');
        $('#ResultString').val('Should be more charecters then 0').css('color', 'red');
        return;
      } else if (field === 'numbers' || field === 'UpLetters' || field === 'LowLetters') {
        // $('#ResultString').val("").css('color', '#000');
        checked = true;                                                    
      }
      if (field === 'charLong' && val >= 0) {
        strLength = val;
      }
      if (field === 'numbers' && val === "on") {
        tempArr.push(numDigitsArr);                    //пушим выбраный массив во временный tempArr
      }
      if (field === 'UpLetters' && val === "on") {
        tempArr.push(UpperLettersArr);                     //пушим выбраный массив во временный tempArr
      }
      if (field === 'LowLetters' && val === "on") {
        tempArr.push(lowerLettersArr);                      //пушим выбраный массив во временный tempArr
      }
    });
    if (!checked) {                 //если не выбран не один чекбокс
      $('#ResultString').val('Choose which characters are allowed to occur in the string').css('color', 'red');
      return;
    };
    // console.log(tempArr);
    if (tempArr.length > 0) {                            //во временном массиве tempArr массивы символов из выбраных чекбоксов
      for (let i = 0; i < strLength; i++) {              //генерируем строку strRes, длина строки strLength из инпута charLong
        let randRow = getRandomInt(tempArr.length);        //рандомно выбираем один из массивов массива tempArr
        let randItem = tempArr[randRow][getRandomInt(tempArr[randRow].length)];  //в выбраном внутреннем массиве рандомно выбираем элемент
        strRes += randItem;                      //добавляем элемент массива в строку с результатом
      }
      //  console.log(strRes);
      $('#ResultString').val(strRes);            //отображаем результат в инпуте ResultString
    }
  });

  $('#copyToClipboard').on("click", async function () {           //результат генерации можно скопировать 
    try {
      await navigator.clipboard.writeText($('#ResultString').val());
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  })

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
});