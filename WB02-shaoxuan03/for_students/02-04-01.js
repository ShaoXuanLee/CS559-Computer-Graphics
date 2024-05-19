// JavaScript file to be filled in by the student for Box 4-1
// we'll give you something to get started...

// you should start by getting the canvas

// then draw the 4 shapes

// @ts-check

export {};


/** @type {HTMLCanvasElement} */
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
let context = canvas.getContext('2d');

//circle
context.beginPath();
context.arc(100, 50, 25 , 0, Math.PI*2);
context.closePath();

context.fillStyle = '#F8E';
context.fill();
context.lineWidth = 5;
context.strokeStyle = '#846';
context.stroke();


//triangle
context.beginPath();
context.moveTo(80, 150);
context.lineTo(100, 120);
context.lineTo(120, 150);
context.closePath();

context.fillStyle = 'sandybrown';
context.fill();
context.lineWidth = 5;
context.strokeStyle = 'darkgoldenrod';
context.stroke();

//oval
context.beginPath();
context.arc(200, 50, 25 , Math.PI/2, 3*Math.PI/2);
context.lineTo(250, 25);
context.arc(250, 50, 25 , -Math.PI/2, Math.PI/2);
context.closePath();

context.fillStyle = 'lightpink';
context.fill();
context.lineWidth = 5;
context.strokeStyle = 'darkred';
context.stroke();

//double hill
context.beginPath();
context.moveTo(175, 150);
context.lineTo(175, 120);
context.lineTo(200, 100);
context.lineTo(225, 120);
context.lineTo(250, 100);
context.lineTo(275, 120);
context.lineTo(275, 150);
context.closePath();

context.fillStyle = 'gray';
context.fill();
context.lineWidth = 5;
context.strokeStyle = 'black';
context.stroke();