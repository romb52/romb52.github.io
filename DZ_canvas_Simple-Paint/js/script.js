const colorItems = document.querySelectorAll('.btn-color');
let rotated = false;                        //костыль для ромба
const figureWidth = 70;        //кастомные размеры фигур
const figureHeight = 70;
let newFigureWidth = figureWidth;            //изменякмы размеры фигур, по умолчанию кастомные
let newFigureHeight = figureHeight;


//разрисовываем палитру цветов
const defaultColor = document.getElementById('selectedColor').style.backgroundColor = "#000";               //при загрузке по умолчанию выбраный цвет - черный
colorItems.forEach(element => {                                                           
    element.style.backgroundColor = element.value;                 //каждую кнопку раскрашиваем в соответствии с ее value                            
    element.addEventListener('click', (e) => {
        document.getElementById('selectedColor').style.backgroundColor = e.target.value;                //при клике на кнопки палитры меняем выбранный цвет
    })
});

function getDC(id) {                                          //функция проверки canvas
    let fig = document.getElementById(id);
    if (fig == null) {
        alert("Figure element not found");
        return false;
    }
    if (typeof fig.getContext == "function") {
        return fig.getContext('2d');
    } else {
        alert("This browser does not support canvas");
        return false;
    }
}
 
/* блок выбора фигуры*/
function rectangle(color = '#fff') {                 //рисуем прямоугольник
    let dc = getDC("rect");
    if (dc == false) return;
    let canvas = document.getElementById("rect");
    dc.clearRect(0, 0, canvas.width, canvas.height);
    dc.strokeStyle = color;
    dc.lineWidth = 3;
    dc.rect(dc.lineWidth, dc.lineWidth, (canvas.width - 2 * dc.lineWidth), (canvas.height - 2 * dc.lineWidth));
    dc.stroke();
}
rectangle();

function circle(color = '#A6A6A6') {                      //рисуем круг
    let dc = getDC("circle");
    if (dc == false) return;
    let canvas = document.getElementById("circle");
    dc.clearRect(0, 0, canvas.width, canvas.height);
    dc.strokeStyle = color;
    dc.lineWidth = 3;
    dc.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - dc.lineWidth, 0, 2 * Math.PI);
    dc.stroke();
}
circle();

function romb(color = '#A6A6A6') {                        //рисуем ромб
    let dc = getDC("romb");
    if (dc == false) return;
    let canvas = document.getElementById("circle");
    dc.clearRect(0, 0, canvas.width, canvas.height);
    if (!rotated) {
        dc.translate(35, 0);
        dc.rotate((45 * Math.PI) / 180);
        rotated = true;
    }
    dc.strokeStyle = color;
    dc.lineWidth = 3;
    dc.beginPath();
    dc.rect(dc.lineWidth, dc.lineWidth, (canvas.width - 2 * dc.lineWidth) / Math.sqrt(2), (canvas.height - 2 * dc.lineWidth) / Math.sqrt(2));
    dc.stroke();
}
romb();

function triangle(color = '#A6A6A6') {                //рисуем треугольник
    let dc = getDC("triangle");
    if (dc == false) return;
    let canvas = document.getElementById("triangle");
    dc.clearRect(0, 0, canvas.width, canvas.height);
    dc.strokeStyle = color;
    dc.lineWidth = 3;
    let x1 = dc.lineWidth;
    let y1 = dc.lineWidth;
    let x2 = dc.lineWidth;
    let y2 = canvas.height - dc.lineWidth * 2;
    let x3 = canvas.width - dc.lineWidth * 2;
    let y3 = canvas.height - dc.lineWidth * 2;
    dc.beginPath();
    dc.moveTo(x1, y1);
    dc.lineTo(x2, y2);
    dc.lineTo(x3, y3);
    dc.closePath();
    dc.stroke();
}
triangle();

/*при клике на фигуру делаем ее checked и выделяем цветом обводки */
const figureItems = document.getElementById('selectBlock').getElementsByTagName('input');

for (let item of figureItems) {
    //console.log(item.name,item.checked);
    item.addEventListener("click", (e) => {
        e.target.checked = true;
        const status = e.target.getAttribute("data-atr");
        // console.log(status);
        if (status === 'rectangle') {
            rectangle('#fff');
            circle('#A6A6A6');
            romb('#A6A6A6');
            triangle('#A6A6A6');
        }
        if (status === 'circle') {
            rectangle('#A6A6A6');
            circle('#fff');
            romb('#A6A6A6');
            triangle('#A6A6A6');
        }
        if (status === 'romb') {
            rectangle('#A6A6A6');
            circle('#A6A6A6');
            romb('#fff');
            triangle('#A6A6A6');
        }
        if (status === 'triangle') {
            rectangle('#A6A6A6');
            circle('#A6A6A6');
            romb('#A6A6A6');
            triangle('#fff');
        }
    });
};

let canvasDrawWindow = document.getElementById('drawWindow');
const canvasWidth = document.getElementsByClassName('draw-window')[0].offsetWidth; //вычисляем размеры блока под рисование
const canvasHeight = document.getElementsByClassName('draw-window')[0].offsetHeight;
// console.log(canvasWidth, canvasHeight);
canvasDrawWindow.width = canvasWidth; //задаем полученные размеры как ширину и высоту canvas
canvasDrawWindow.height = canvasHeight;

/*обработка нажатия мыши на холсте*/
canvasDrawWindow.addEventListener('mousedown', (e) => {
    let startPointX = e.clientX - canvasDrawWindow.getBoundingClientRect().left; //координаты клика на полотне
    let startPointY = e.clientY - canvasDrawWindow.getBoundingClientRect().top;
    console.log(startPointX, startPointY);
    let isDragging = true;
    newFigureWidth = figureWidth;              //каждый раз задаем на старте начальные размеры фигур, на случай клика без движения мыши (на холс нарисуются фигурки стандартного размера)
    newFigureHeight = figureHeight;
    canvasDrawWindow.addEventListener('mousemove', handleMouseMove);         //обработка mousemove и mouseup (обзываем чтоб можно было эти события снять)
    canvasDrawWindow.addEventListener('mouseup', handleMouseUp);

    function handleMouseUp(e) {                                               //отжал кнопку
        isDragging = false;
        canvasDrawWindow.removeEventListener('mousemove', handleMouseMove);       //снимаем сразу события 
        canvasDrawWindow.removeEventListener('mouseup', handleMouseUp);

        for (let item of figureItems) {
            if (item.checked == true) {
                let dc = getDC("drawWindow");
                let color = document.getElementById('selectedColor').style.backgroundColor;            //задаем цвет фигуры
                if (dc == false) return;
                const atr = item.getAttribute("data-atr");
                console.log(item.getAttribute("data-atr"));
                if (atr === 'rectangle') {                                          //если прямоугольник
                    dc.beginPath();
                    dc.fillStyle = color;
                    dc.rect(startPointX, startPointY, newFigureWidth, newFigureHeight);
                    dc.fill();
                    console.log(startPointX, startPointY, newFigureWidth, newFigureHeight, color);
                }
                if (atr === 'circle') {                                              //если круг
                    dc.beginPath();
                    dc.fillStyle = color;

                    // startPointX + newFigureWidth / 2, startPointY + newFigureHeight / 2 - координати центра круга (середина вектора)
                    //(Math.sqrt(Math.pow(newFigureWidth, 2) + Math.pow(newFigureHeight, 2))) / 2 - теорема Пиффагора, вычисляем радиус - половина вектора по координатам
                    if (newFigureWidth === figureWidth && newFigureHeight === figureHeight) {
                        dc.arc(startPointX, startPointY, figureWidth / 2, 0, 2 * Math.PI);
                    } else //eсли по клику
                        dc.arc(startPointX + newFigureWidth / 2, startPointY + newFigureHeight / 2, (Math.sqrt(Math.pow(newFigureWidth, 2) + Math.pow(newFigureHeight, 2))) / 2, 0, 2 * Math.PI);
                    dc.fill();
                    console.log(startPointX + newFigureWidth / 2, startPointY + newFigureHeight / 2, newFigureWidth / 2, color);

                }
                if (atr === 'romb') {                                             //если ромб
                    let x1 = startPointX;
                    let y1 = startPointY + newFigureHeight / 2;
                    let x2 = startPointX + newFigureWidth / 2;
                    let y2 = startPointY;
                    let x3 = startPointX + newFigureWidth;
                    let y3 = startPointY + newFigureHeight / 2;
                    let x4 = startPointX + newFigureWidth / 2;
                    let y4 = startPointY + newFigureHeight;
                    dc.beginPath();
                    dc.moveTo(x1, y1);
                    dc.lineTo(x2, y2);
                    dc.lineTo(x3, y3);
                    dc.lineTo(x4, y4);
                    dc.closePath();
                    dc.fillStyle = color;
                    dc.fill();
                }
                if (atr === 'triangle') {                          //если треугольник
                    dc.fillStyle = color;
                    dc.lineWidth = 3;
                    let x1 = startPointX;
                    let y1 = startPointY;
                    let x2 = startPointX + newFigureWidth;
                    let y2 = startPointY + newFigureHeight;
                    let x3 = startPointX ;
                    let y3 = startPointY + newFigureHeight;
                    dc.beginPath();
                    dc.moveTo(x1, y1);
                    dc.lineTo(x2, y2);
                    dc.lineTo(x3, y3);
                    dc.closePath();
                    dc.fill();
                }
            }
        }
    }

    function handleMouseMove(e) {                                                              //обрабатываем движение курсора при надатии мыши
        let deltaX = e.clientX - canvasDrawWindow.getBoundingClientRect().left - startPointX;     
        let deltaY = e.clientY - canvasDrawWindow.getBoundingClientRect().top - startPointY;
        newFigureWidth = deltaX;
        newFigureHeight = deltaY;
        // console.log(deltaX, deltaY);        
    }
});



