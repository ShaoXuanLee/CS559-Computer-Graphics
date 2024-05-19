/**
 * 04-05-01.js - a simple JavaScript file that gets loaded with
 * page 5 of Workbook 4 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020, February 2021
 *
 */

/**
 * If you want to read up on JavaScript classes, 
 * see the tutorial on the class website:
 * 
 * https://cs559.github.io/559Tutorials/javascript/oop-in-js-1/
 */
class Boid {
    /**
     * 
     * @param {number} x    - initial X position
     * @param {number} y    - initial Y position
     * @param {number} vx   - initial X velocity
     * @param {number} vy   - initial Y velocity
     */
    constructor(x, y, vx = 1, vy = 0) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.counter = 0;
        this.maxCounter = 30;
    }
    /**
     * Draw the Boid
     * @param {CanvasRenderingContext2D} context 
     */
    draw(context, time) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(Math.atan2(this.vy, this.vx));
        context.fillStyle = (this.counter == 0 ? "green" : "red"); //circle, for collision
        context.beginPath();
        context.arc(0, 0, 10, 0, 2 * Math.PI);
        context.fill();
        context.fillStyle = "blue"; //triangle inside the circle
        context.beginPath();
        context.moveTo(10, 0);
        context.lineTo(-5, -5);
        context.lineTo(-5, 5);
        context.closePath();
        context.fill();

        //legs
        for(let i = 0; i < 2; i++){
            context.rotate(Math.PI / 4 * (i - 0.5));
            context.save();
            context.rotate(Math.sin(time/100) * Math.PI/4);
            context.fillStyle = "orange";
            context.fillRect(2, 10, 3, 10);
            context.fillRect(2, -10, 3, -10);
            context.fillStyle = "orange";
            context.rotate(Math.PI/6);
            context.fillRect(-2, 10, 3, 10);
            context.rotate(Math.PI/6);
            context.fillRect(-2, -20, 3, 10);
            context.restore();
        }
        context.restore();
    }
    /**
     * Perform the "steering" behavior -
     * This function should update the velocity based on the other
     * members of the flock.
     * It is passed the entire flock (an array of Boids) - that includes
     * "this"!
     * Note: dealing with the boundaries does not need to be handled here
     * (in fact it can't be, since there is no awareness of the canvas)
     * *
     * And remember, (vx,vy) should always be a unit vector!
     * @param {Array<Boid>} flock 
     */
    steer(flock) {
        
		// Note - this sample behavior is just to help you understand
		// what a steering function might  do
		// all this one does is have things go in circles, rather than
		// straight lines
		// Something this simple would not count for the advanced points:
		// a "real" steering behavior must consider other boids,
		// or at least obstacles.
		
        // a simple steering behavior: 
        // create a rotation matrix that turns by a small amount
        // 2 degrees per time step
        if(Math.random() < 0.1){
            const angle = 2 * Math.PI / 180 * (Math.random() < 0.5 ?  1 : -1);
            const s = Math.sin(angle);
            const c = Math.cos(angle);

            let ovx = this.vx;
            let ovy = this.vy;

            this.vx =  ovx * c + ovy * s; //matrix mult with rotation of 2 deg
            this.vy = -ovx * s + ovy * c;
        }
		
    }
}


/** the actual main program
 * this used to be inside of a function definition that window.onload
 * was set to - however, now we use defer for loading
 */

 /** @type Array<Boid> */
let boids = [];

let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("flock"));
let context = canvas.getContext("2d");

let speedSlider = /** @type {HTMLInputElement} */ (document.getElementById("speed"));

function draw(time) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    obstacles.forEach(obs => {
        context.save();
        {
            context.beginPath();
            context.arc(obs.x, obs.y, obs.r, 0, Math.PI * 2, true);
            context.closePath();

            context.fillStyle = "brown";
            context.fill();
        }
        context.restore();
    });
    boids.forEach(boid => boid.draw(context, time));
}

/**
 * Create some initial boids
 * STUDENT: may want to replace this
 */
boids.push(new Boid(100, 100));
boids.push(new Boid(200, 200, -1, 0));
boids.push(new Boid(300, 300, 0, -1));
boids.push(new Boid(400, 400, 0, 1));
const obstacles = [
    {x: 125, y: 125, r: 30},
    {x: 475, y: 125, r: 30},
    {x: 125, y: 475, r: 30},
    {x: 475, y: 475, r: 30},
];

/**
 * Handle the buttons
 */
document.getElementById("add").onclick = function () {
    // Students Fill This In
    let angle = Math.random() * 2 * Math.PI;
    for(let i = 0; i < 10; i++){
        boids.push(new Boid(Math.random() * 600, Math.random() * 600, Math.cos(angle), Math.sin(angle)));
    }
};
document.getElementById("clear").onclick = function () {
    // Student Fill This In
    boids.length = 0;
};

let checkInside = function(x, y, obs) {
    // Check if (x, y) is inside a circle
    //10 is size of the boid
    return Math.sqrt((obs.x - x) * (obs.x - x) + (obs.y - y) * (obs.y - y)) < obs.r + 10;
}

let lastTime; // will be undefined by default
/**
 * The Actual Execution
 */
function loop(timestamp) {
    // time step - convert to 1/60th of a second frames
    // 1000ms / 60fps
    const delta = (lastTime ? timestamp-lastTime : 0) * 1000.0/60.0;

    // change directions
    boids.forEach(boid => boid.steer(boids));
    // move forward
    let speed = Number(speedSlider.value);
    boids.forEach(function (boid) {
        boid.x += boid.vx * speed;
        boid.y += boid.vy * speed;
    });
    
    // make sure that we stay on the screen
    boids.forEach(function (boid) {
        /**
         * Students should replace this with collision code
         */
        //boid.x = boid.x % canvas.width;
        //boid.y = boid.y % canvas.height;
        // if (boid.x < 0) boid.x += canvas.width;
        // if (boid.y < 0) boid.y += canvas.height;
        if(boid.x < 10) {
            boid.vx = - boid.vx;
            boid.x = 10;
            boid.counter = boid.maxCounter;
        }
        if(boid.y < 10) {
            boid.vy = - boid.vy;
            boid.y = 10;
            boid.counter = boid.maxCounter;
        }
        if(boid.x > canvas.width - 10) {
            boid.vx = - boid.vx;
            boid.x = canvas.width - 10;
            boid.counter = boid.maxCounter;
        }
        if(boid.y > canvas.width - 10) {
            boid.vy = - boid.vy;
            boid.y = canvas.width - 10;
            boid.counter = boid.maxCounter;
        }
        boid.counter = Math.max(boid.counter - 1, 0);

        //check if boids hit an obstacle
        obstacles.forEach(obs => {
            if (checkInside(boid.x, boid.y, obs)) {
                // Change to the direction opposite to the center of the obstacle if it is a circle
                let nvy = boid.y - obs.y;
                let nvx = boid.x - obs.x;
                let spd = Math.sqrt(nvx ** 2 + nvy ** 2);
                boid.vx = nvx / spd;
                boid.vy = nvy / spd;
                boid.counter = boid.maxCounter;
            }
        });

        //bounce off each other
        for(let b of boids){
            if(b.x != boid.x || b.y != boid.y){
                let distance = Math.sqrt((boid.x - b.x) ** 2 + (boid.y - b.y) ** 2);
                if (distance < 20){ // means colliding
                    let nvx = boid.x - b.x;
                    let nvy = boid.y - b.y;
                    let spd = Math.sqrt(nvx ** 2 + nvy ** 2);
                    boid.vx = nvx / spd;
                    boid.vy = nvy / spd;
                    boid.counter = boid.maxCounter;
                    break;
                }
            }
        }

    });
    // now we can draw
    draw(timestamp);
    // and loop
    window.requestAnimationFrame(loop);

}

// start the loop with the first iteration
window.requestAnimationFrame(loop);


