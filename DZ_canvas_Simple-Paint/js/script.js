const colorItems = document.querySelectorAll('.btn-color');
let rotated = false;
const figureWidth = 70;
const figureHeight = 70;

//разрисовываем палитру цветов
const defaultColor = document.getElementById('selectedColor').style.backgroundColor = "#000";
colorItems.forEach(element => {
    element.style.backgroundColor = element.value;
    element.addEventListener('click', (e) => {
        document.getElementById('selectedColor').style.backgroundColor = e.target.value;
    })
});

function getDC(id) {
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

function rectangle(color = '#fff') {
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

function circle(color = '#A6A6A6') {
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

function romb(color = '#A6A6A6') {
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

function triangle(color = '#A6A6A6') {
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


const figureItems = document.getElementById('selectBlock').getElementsByTagName('input');
// console.log(figureItems);
// figureItems.forEach((item) => {
//     console.log(item);
// });
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
const canvasWidth = document.getElementsByClassName('draw-window')[0].offsetWidth;
const canvasHeight = document.getElementsByClassName('draw-window')[0].offsetHeight;
// console.log(canvasWidth, canvasHeight);
canvasDrawWindow.width = canvasWidth;
canvasDrawWindow.height = canvasHeight;

// if (getDC("drawWindow")==false)return;
canvasDrawWindow.addEventListener('click', (e) => {
    let startPointX = e.clientX - canvasDrawWindow.getBoundingClientRect().left;;
    let startPointY = e.clientY - canvasDrawWindow.getBoundingClientRect().top;
    console.log(e.clientX, e.clientY);
    console.log(canvasDrawWindow.width, canvasDrawWindow.height);
    for (let item of figureItems) {
        if (item.checked == true) {
            let dc = getDC("drawWindow");
            let color = document.getElementById('selectedColor').style.backgroundColor;
            if (dc == false) return;
            const atr = item.getAttribute("data-atr");
            console.log(item.getAttribute("data-atr"));
            if (atr === 'rectangle') {
                dc.beginPath();
                dc.fillStyle = color;
                dc.rect(startPointX, startPointY, figureWidth, figureHeight);
                dc.fill();
                console.log(startPointX, startPointY, color);

            }
            if (atr === 'circle') {
                dc.beginPath();
                dc.fillStyle = color;
                dc.arc(startPointX, startPointY, figureWidth / 2, 0, 2 * Math.PI);
                dc.fill();
                console.log(startPointX, startPointY, color);
            }
            if (atr === 'romb') {
                let x1 = startPointX;
                let y1 = startPointY;
                let x2 = startPointX + figureWidth / 2;
                let y2 = startPointY - figureWidth / 2;
                let x3 = startPointX + figureWidth ;
                let y3 = startPointY;
                let x4 = startPointX + figureWidth / 2;
                let y4 = startPointY + figureWidth / 2;
                dc.beginPath();
                dc.moveTo(x1, y1);
                dc.lineTo(x2, y2);
                dc.lineTo(x3, y3);
                dc.lineTo(x4, y4);
                dc.closePath();
                dc.fillStyle = color;
                dc.fill();
            }
            if (atr === 'triangle') {
                dc.fillStyle = color;
                dc.lineWidth = 3;
                let x1 = startPointX;
                let y1 = startPointY;
                let x2 = startPointX;
                let y2 = startPointY - figureWidth;
                let x3 = startPointX + figureWidth;
                let y3 = startPointY;
                dc.beginPath();
                dc.moveTo(x1, y1);
                dc.lineTo(x2, y2);
                dc.lineTo(x3, y3);
                dc.closePath();
                dc.fill();
            }
        }
    };
});

canvasDrawWindow.addEventListener('mousedown', (e) => {
    let startPointX = e.clientX ;
    let startPointY = e.clientY ;
    console.log(e.clientX, e.clientY);
    console.log(canvasDrawWindow.width, canvasDrawWindow.height);
    let isDragging = true;
    canvasDrawWindow.addEventListener('mousemove', (e) => {
        if (isDragging) {
            let deltaX = e.clientX - startPointX; 
            let deltaY = e.clientY - startPointY; 
        let newFigureWidth = figureWidth + 
            console.log(deltaX, deltaY);
        }
    });
 
});


