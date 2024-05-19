// @ts-check
/* jshint -W069, esversion:6 */

let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
let context = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);
context.strokeStyle = "green";
context.lineWidth = 5;
let pen = false;
/**
 * Get the mouse position
 * @param {MouseEvent} event The event
 * @returns {number[]} The mouse coordinates
 */
let mouse = function (event) {
    let target = /** @type {HTMLCanvasElement} */ (event.target);
    let box = target.getBoundingClientRect();
    let x = event.clientX - box.left;
    let y = event.clientY - box.top;
    return [x, y];
}
/**
 * When mouse is pressed
 * @param {MouseEvent} event The event 
 */
canvas.onmousedown = function (event) {
    let [x, y] = mouse(event);
    context.moveTo(x, y);
    pen = true;
}
/**
 * When mouse is dragged
 * @param {MouseEvent} event The event 
 */
canvas.onmousemove = function (event) {
    if (pen) {
        let [x, y] = mouse(event);
        context.lineTo(x, y);
        context.stroke();
    }
}
/**
 * When mouse is up
 */
canvas.onmouseup = function () {
    pen = false;
}