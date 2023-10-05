const colorItems = document.querySelectorAll('.btn-color');
//разрисовываем палитру цветов
colorItems.forEach(element => {
    element.style.backgroundColor = element.value;
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

function rectangle() {
    let dc = getDC("rect");
    if (dc == false) return;
    let canvas = document.getElementById("rect");
    dc.clearRect(0, 0, canvas.width, canvas.height);
    dc.strokeStyle = '#fff';
    dc.lineWidth = 3;
    dc.rect(dc.lineWidth, dc.lineWidth, (canvas.width - 2 * dc.lineWidth), (canvas.height - 2 * dc.lineWidth));
    dc.stroke();
}
rectangle();

function circle() {
    let dc = getDC("circle");
    if (dc == false) return;
    let canvas = document.getElementById("circle");
    dc.clearRect(0, 0, canvas.width, canvas.height);
    dc.strokeStyle = '#A6A6A6';
    dc.lineWidth = 3;
    dc.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - dc.lineWidth, 0, 2 * Math.PI);
    dc.stroke();
}
circle();

function romb() {
    let dc = getDC("romb");
    if (dc == false) return;
    let canvas = document.getElementById("circle");
    dc.clearRect(0, 0, canvas.width, canvas.height);
    dc.translate(35, 0);                         //смещение 
    dc.rotate((45 * Math.PI) / 180);              //поворот на 180
    dc.strokeStyle = '#A6A6A6';
    dc.lineWidth = 3;
    dc.rect(dc.lineWidth, dc.lineWidth, (canvas.width - 2 * dc.lineWidth) / Math.sqrt(2), (canvas.height - 2 * dc.lineWidth) / Math.sqrt(2));
    dc.stroke();
}
romb();

function triangle() {
    let dc = getDC("triangle");
    if (dc == false) return;
    let canvas = document.getElementById("triangle");
    dc.clearRect(0, 0, canvas.width, canvas.height);
    dc.strokeStyle = '#A6A6A6';
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


