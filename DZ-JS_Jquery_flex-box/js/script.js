$(document).ready(function () {
    $("#slideLeft").on("click", function () {                        //прячем и разворачиваем по клику левый блок 
        if ($(this).hasClass("fa-solid fa-caret-right")) {           //если стрелка иконки направо - то разворачиваем блок
            $(".row-1").animate({ 'width': '300px' }, 200);             //плавная анимация
            // $(".row-1").width('100px');
            $(".row-1 i").show();                                     //показываем тянучку между блоками
            $(this).attr('class', 'fa-solid fa-caret-left');         //меняем стрелку налево
        } else if ($(this).hasClass("fa-solid fa-caret-left")) {            //если стрелка налево - сворачиваем блок
            $(".row-1").animate({ 'width': 0 }, 200);
            // $(".row-1").width(0);
            $(".row-1 i").hide();                                    //прячем тянучку между блоками
            $(this).attr('class', 'fa-solid fa-caret-right');          //меняем направление стрелки
        };

    })

    $('.grey-horizontal-row').on('mousedown', function (e) {              //т.к. тянучек две, то обращаемся к ним по общему классу 
        let startPositionY = e.clientY;                                   //стартовая позиция курсора при нажатии кнопки мыши
        let activeDragLine = $(this);                                     //определяемся, на что именно нажали (что тянуть будем)
        let startHeight = activeDragLine.prev().innerHeight();             //начальная высота соседнего блока, который и будем менять по высоте
        // console.log(startPositionY, startHeight);
        let isDragging = true;                                              //флаг тянем/отпускаем
        $(document).on('mousemove', function (e) {                         //тянем мышкой разделяющую полосу
            if (isDragging) {
                let deltaY = e.clientY - startPositionY;                  //разница начального и текущего положения курсора
                const newHeight = startHeight + deltaY;                   //по этой разнице меняем высоту верхнего блока
                // console.log(deltaY, newHeight);
                if (newHeight >= 0) {                                      // если высота блока больше 0 - то присваеваем ее блоку (по ТЗ min-height:100px в свойствах сss )
                    activeDragLine.prev().innerHeight(newHeight);               
                }
            }
        });
        $(document).on('mouseup', function (e) {                //кнопку мыши отпустили 
            isDragging = false;
            $(document).off('mousemove');                       //развешиваем события mousemove, mouseup
            $(document).off('mouseup');
        });
    });
});