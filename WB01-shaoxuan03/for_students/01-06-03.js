// put some code here

let slr = document.getElementById("slider");
let lasttime;
let value = 0;
let total_distance = 200;


function advanceSLR(timestamp) {
    // only move if things are running
    if (lasttime === undefined) {
        lasttime = timestamp;
    }
    const delta = (timestamp - lasttime) * 0.2;
    value = (value + delta) % 200;
    const position = Math.min(value, total_distance-value);
    slr.value = (0 + position).toString();
    

    // note that we update the last iteration - even if we didn't update
    // the slider! that way if we restart the loop, we don't have a jump
         // remember the last update
    window.requestAnimationFrame(advanceSLR);
    lasttime = timestamp; 
}
window.requestAnimationFrame(advanceSLR);