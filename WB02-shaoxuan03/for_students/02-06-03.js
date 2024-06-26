// @ts-check
export {};

/**
 * a display list made of rectangles
 * each "object" will store x1,y1,w,h, color,
 * and whether or not it is clicked
 * we'll take advantage that unset properties are undefined
 */
    // the canvas version of the code is much more similar to the SVG
// first we make a list of all the rectangles
let rects = [];
for(let c=0; c<4; c++) {
    for(let r=0; r<3; r++) {
        rects.push({"x":30+c*50,"y":20+r*20,"w":30,"h":10,color:"#888",clicked:false});
    }
}
let rb = {"x":0,"y":35,"w":20,"h":20,"color":"black","clicked":false};
rects.push(rb);

/**
 * Take a list of rectangles and draw them.
 * The rectangles draw their own color, unless they have been
 * "clicked"
 * @param {*} context
 * @param {Array[object]} rectList
 */
function drawRectList(context,rectList) {
    rectList.forEach(function(rect){
        context.save();
        if (rect.clicked) {
            context.fillStyle = "#FCC";
            context.strokeStyle = "#F00";
            context.fillRect(rect.x,rect.y,rect.w,rect.h);
            context.strokeRect(rect.x,rect.y,rect.w,rect.h);
        } else {
            context.fillStyle = rect.color;
            context.fillRect(rect.x,rect.y,rect.w,rect.h);
        }
        context.restore();
    });
}

// the animation loop calls the drawing function with the list of
// rectangles
function canvasAnimate(timestamp) {
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("boxcanvas"));
    let context = canvas.getContext('2d');
    // clear the canvas
    context.clearRect(0,0,canvas.width,canvas.height);
    // update the moving rectangle's position
    rb.x = (timestamp/10 % 260) - 10;
    // draw the rectagnles
    drawRectList(context,rects);
    // loop
    window.requestAnimationFrame(canvasAnimate);
}
window.requestAnimationFrame(canvasAnimate);

/**
 * This function performs the "click" on a list of rectangles.
 * Given the x,y of the mouse, it looks to see which rectangles
 * cover the mouse position. If a rectangle covers the mouse position,
 * it's "clicked" member is toggled.
 * Note: if multiple rectangles cover the mouse position, all of them
 * get toggled.
 *
 * @param {number} x
 * @param {number} y
 * @param {Array[object]} rectList
 */
function clickRectList(x,y,rectList) {
    rectList.forEach(function(rect) {
        // see if xy is inside of rect
        if ((x >= rect.x) && (y>=rect.y) && (x <= rect.x+rect.w) && (y <= rect.y + rect.h)) {
            rect.clicked = ! rect.clicked;
        }
    });
}

// now handle the clicks on the Canvas
document.getElementById("boxcanvas").onclick = function(event) {
    let x = event.clientX;
    let y = event.clientY;
    // unfortunately, X,Y is relative to the overall window -
    // we need the X,Y inside the canvas!
    // we know that event.target is a HTMLCanvasElement, so tell typescript
    let box = /** @type {HTMLCanvasElement} */ (event.target).getBoundingClientRect();
    x -= box.left;
    y -= box.top;
    // now we can see if we clicked on a rectangle
    clickRectList(x, y, rects);
};



