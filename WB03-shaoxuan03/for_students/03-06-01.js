export {};

// somewhere in your program you'll want a line
// that looks like:
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
let context = canvas.getContext("2d");

function drawQuadcopter(time){
    context.save();
    context.rotate(Math.PI/2);
    context.fillStyle = "black";
    context.fillRect(-25, -50, 50, 100);
    //arm 1
    context.save();
    context.translate(20, 45);
    context.rotate(-Math.PI/4);
    drawArm(time);
    context.restore();
    //arm 2
    context.save();
    context.translate(-20, 45);
    context.rotate(Math.PI/4);
    drawArm(time/4);
    context.restore();
    //arm 3
    context.save();
    context.translate(20, -45);
    context.rotate(-3 * Math.PI/4);
    drawArm(time/2);
    context.restore();
    //arm 4
    context.save();
    context.translate(-20, -45);
    context.rotate(3 * Math.PI/4);
    drawArm(time/2);
    context.restore();
    context.restore();
}

function drawArm(time){
    context.fillStyle = "red";
    context.fillRect(-5, 0, 10, 50);
    context.fillStyle = "blue";
    context.translate(0, 50);
    context.rotate(time)
    context.fillRect(-2.5, -25, 5, 50);

}
// and you will want to make an animation loop with something like:
/**
 * the animation loop gets a timestamp from requestAnimationFrame
 * 
 * @param {DOMHighResTimeStamp} timestamp 
 */
function loop(timestamp) {
    context.clearRect(0, 0, 600, 600);

    //this move in counter clockwise
    context.save();
    context.translate(300 + 250 * Math.sin(timestamp/1000), 300 + 250 * Math.cos(timestamp/1000));
    context.rotate(-timestamp/1000);
    context.scale(0.5, 0.5);
    drawQuadcopter(timestamp/100);
    context.restore();

    //this thing just fly around the canvas
    context.save();
    context.translate(100 + 250 * Math.sin(Math.random()*timestamp/1000),  100 + 250 * Math.sin(Math.random()*timestamp/1000));
    let dy = -250 * Math.sin(timestamp/1000)/1000;
    let dx = 250 * Math.cos(timestamp/1000)/1000;
    context.rotate(Math.atan2(dy,dx));
    context.scale(0.5, 0.5);
    drawQuadcopter(timestamp/100);
    context.restore();

    //this move in 8
    context.save();
    context.translate(300 + 250 * Math.sin(timestamp/1000),  300 + 250 * Math.sin(timestamp/1000));
    context.rotate(-timestamp/1000);
    context.scale(0.5, 0.5);
    drawQuadcopter(timestamp/100);
    context.restore();

    //this move in clockwise
    context.save();
    context.translate(300 + 250 * Math.cos(timestamp/1000), 300 + 250 * Math.sin(timestamp/1000));
    context.rotate(-timestamp/1000);
    context.scale(0.5, 0.5);
    drawQuadcopter(timestamp/100);
    context.restore();
    
    window.requestAnimationFrame(loop);
};

// and then you would start the loop with:
window.requestAnimationFrame(loop);