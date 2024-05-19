// put some code here
const text = document.getElementById("ex3-span");
let lasttime;
let sec = 0;

function fade(timestamp){
    if (lasttime === undefined){
        lasttime = timestamp;
    }

    const delta = (timestamp - lasttime) / 1000;
    //bounce from red to white then to red
    //red to white take one sec, red to red = 2 sec
    sec = (sec + delta) % 2;
    const offset = Math.min(sec, 2 - sec);

    //now do linear interpolation
    //white is 255, 255, 255
    //red is 255,0,0
    //starting from white 
    // r is always 255, g and b are changing from 255 to 0 and back to 255 
    const r = 255;
    const g = 255 + (0 - 255) * offset;
    const b = 255 + (0 - 255) * offset;
    text.style.backgroundColor = `rgb(${r},${g},${b})`;

    lasttime = timestamp;
    window.requestAnimationFrame(fade);
}
window.requestAnimationFrame(fade);