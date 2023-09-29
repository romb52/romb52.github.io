const arrFrut = ['apple', 'pearch', 'orange', 'mango', 'lemon', 'cocumber', 'apple', 'pearch', 'orange', 'mango', 'lemon', 'cocumber', 'apple', 'pearch', 'orange', 'mango', 'lemon', 'cocumber'];
const arrColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];


arrFrut.forEach((item, i) => {
    const el = $('<div>');
    el.text(item);
    el.css('background-color', arrColors[Math.floor(Math.random() * arrColors.length)]);
    el.css('padding', '10px');
    el.attr('data-color', el.css('background-color'))
    $('#wrap').append(el);
})

arrColors.forEach((item, i) => {
    const el = $('<div>');
    el.text(item);
    el.css('background-color', arrColors[i]);
    el.css('padding', '10px');
    $('#labels').append(el);
    el.on('click', function () {
        const color = arrColors[i];
        $('#labels > div').each(function () {
            if ($(this).hasClass('shadow')) $(this).removeClass('shadow');
        });
        $(this).addClass('shadow');
        $('#wrap > div').each(function () {
            console.log($(this).attr('data-color'), color)
            if ($(this).attr('data-color') === color) {
                $(this).addClass('shadow');
            } else {
                $(this).removeClass('shadow');
            }
        })
    })
})