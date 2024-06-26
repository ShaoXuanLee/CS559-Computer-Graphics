let span1 = document.getElementById("span1");
if (span1) {
    span1.innerHTML = "write our text in the JavaScript program!";
} else { // just to be safe
    console.log("Error - we didn't find span1");
}

let span2 = document.getElementById("span2");
if (span2) {
    // we can also change the styles of things
    span2.style["backgroundColor"] = "#CEE";   // CEE = light cyan
    span2.style["color"] = "#008";             // 008 = mid blue  
    // note that I chose to write style["color"] rather than style.color
    // this is a coding style thing.
    // JavaScript pros prefer the dot notation (in fact, jshint will give a warning)
    // but I did it this way since it emphasizes what's going on
} else { // just to be safe
    console.log("Error - we didn't find span2");
}

let button1 = document.getElementById("button1");
button1.onclick = function() {
    console.log("Button was clicked");
}
let button2 = document.getElementById("button2");
let count = 0;
button2.onclick = function() {
    count = count+1;
    // note that this is unsafe (I don't check that span3 is OK)
    // also note the template literal
    document.getElementById("span3").innerText = `Button was clicked ${count} times.`;
}