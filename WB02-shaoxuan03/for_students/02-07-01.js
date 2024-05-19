/**
 * Starter file for 02-07-01.js - the only exercise of page 7 of Workbook 2
 */

// @ts-check

// Find the canvas and start!
export { };

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('box1canvas'));
const context = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));

//the way of handling the color got inspired by the answer given from the lecturer
const color =  [[`rgba(${15},${157},${88})`],   // green
                [`rgba(${250},${210},${50})`],  // yellow
                [`rgba(${219},${68},${55})`], //red
                [`rgba(${250},${125},${0})`]]//orange

const circle = [];
const radius = 20;
const mouse  = [0,0]; 

//this is to fix the coordinate of the mouse so that it is in the canvas
canvas.onmousemove = function(event){
    let box = /** @type {HTMLCanvasElement} */ (event.target).getBoundingClientRect();
    mouse[0] = event.clientX - box.left;
    mouse[1] = event.clientY - box.top;
}

//using euclidean distance to determine if the mouse is on or over the circle
function isMouseOver(circle){
    let Euclidean = (mouse[0] - circle[0])**2 + (mouse[1] - circle[1])**2;
    if(Euclidean <= radius**2){
        return 1;
    }
    else return 0;
}

//click = change colors
// set to 2 means after clicking the circle, it can only be red/orange
canvas.onclick = function(){
    let clickedCanvas = true;

    circle.forEach(function(circle){
        if(isMouseOver(circle) == 1){
            circle[2] = 2;
            clickedCanvas = false;
        }
    });

    if(clickedCanvas){
        circle.push([mouse[0], mouse[1], 0]);
    }
}

//this function is to fill the circle with correct color, using the boolean value from isMouseOver as a offset to adjust the color
function draw(circle){
    context.beginPath();
    context.arc(circle[0], circle[1], radius, 0, Math.PI * 2);
    context.closePath();

    context.fillStyle = color[circle[2] + isMouseOver(circle)];
    context.fill();
}

function animate(){
    context.clearRect(0,0,canvas.width,canvas.height);
    circle.forEach(function(circle){
        draw(circle);
    });
    window.requestAnimationFrame(animate);
}
window.requestAnimationFrame(animate);