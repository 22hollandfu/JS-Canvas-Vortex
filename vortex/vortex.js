const canvas = document.querySelector("#board");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0,0, width, height);
ctx.translate(width / 2, height / 2);
let numLines = 80, numAngles = 1;
let r = [], t = [], colorIteration = 0;
for(let  i = 0; i < numLines; i++) {
    r[i] = Math.min(width, height) / 2 / numLines * i;
    t[i] = 0;
}
let vortexAnimation = setInterval(rotate, 10);
incOrDec = 1, incAmount = 0.001;

function rotate() {
    ctx.fillStyle = "rgb(0, 0, 0, 0.05)";
    ctx.fillRect(-width / 2, -height / 2 , width, height);
    colorIteration += 0.3;
    numAngles += incOrDec * incAmount;
    if(numAngles > 6 ){
        incOrDec = -1;
        incAmount += 0.0001;
    }
    if(numAngles < 1){
        incOrDec = 1;
        incAmount += 0.0001;
    }
    // console.log(numAngles);
    for(let i = 0; i < numLines; i++) {
        ctx.strokeStyle = hueToColor(colorIteration + 180 / numLines * (numLines - i));
        ctx.beginPath();
        t[i] +=  (numLines - i) /  10 * Math.PI / 180;
        // console.log(i + ": " + t[i] / Math.PI);
        ctx.moveTo(r[i] * Math.cos(t[i]), r[i] * Math.sin(t[i]));
        for(let j = 1; j < numAngles; j++)
            ctx.lineTo(r[i] * Math.cos(t[i] + 2  * j / numAngles * Math.PI), r[i] * Math.sin(t[i] + 2  * j / numAngles * Math.PI));
        ctx.lineTo(r[i] * Math.cos(t[i]), r[i] * Math.sin(t[i]));
        ctx.stroke();
    }
}

function hueToColor(degrees) {
    let deg = degrees % 360;
    var degToCase = Math.floor(deg / 60);
    switch(degToCase) {
        case 0:
            return "rgb(255, " + (4.25 * (deg - degToCase * 60)).toString() + " , 0)";
        case 1:
            return "rgb(" + (255 - 4.25 * (deg - degToCase * 60)).toString() + " , 255, 0)";
        case 2:
            return "rgb(0, 255, " + (4.25 * (deg - degToCase * 60)).toString() + ")";
        case 3:
            return "rgb(0, " + (255 - 4.25 * (deg - degToCase * 60)).toString() + " , 255)";
        case 4:
            return "rgb(" + (4.25 * (deg - degToCase * 60)).toString() + " , 0, 255)";
        case 5:
            return "rgb(255, 0, " + (255 - 4.25 * (deg - degToCase * 60)).toString() + ")";
    }
}
