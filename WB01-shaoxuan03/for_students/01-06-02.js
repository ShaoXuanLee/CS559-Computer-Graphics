// put some code here

    /* Slider 1 - measure the time between steps */
let lasttime;  // time
let value = 0;
/** @type{HTMLInputElement} */ let slr = (/** @type{HTMLInputElement} */ document.getElementById("slider1"));
const start = document.getElementById("start");
const stop = document.getElementById("stop");

let speed = 0 ;
start.onclick = function(){
    speed = 0.3;
}

stop.onclick = function(){
    speed = 0;
}

function advanceSLR(timestamp) {
    // only move if things are running
    if (! (lasttime === undefined)) {
        const delta = (timestamp - lasttime) * speed;
        value = (value + delta) % 100;
        slr.value = value.toString();
    }
    // note that we update the last iteration - even if we didn't update
    // the slider! that way if we restart the loop, we don't have a jump
    lasttime = timestamp;      // remember the last update
    window.requestAnimationFrame(advanceSLR);
}
window.requestAnimationFrame(advanceSLR);