// JavaScript file to be filled in by the student for Box 4-2
// we'll give you something to get started...

// you should start by getting the canvas, then draw whatever you want!
// Be sure to use the Canvas drawing API, not SVG!

// Get the canvas element
var canvas = document.getElementById('canvas1');
var context = canvas.getContext('2d');

// Draw a background rectangle
context.fillStyle = 'skyblue';
context.fillRect(0, 0, canvas.width, 500);

context.fillStyle = 'green';
context.fillRect(0, 450, canvas.width, 450);
// Draw a tree
drawTree(400, 500, 80, 300, 'green');

// Draw a house
drawHouse(100, 460, 200, 200, 'red');

// Draw the sun
drawSun(100, 100, 60, 'yellow');

// Function to draw a tree
function drawTree(x, y, trunkWidth, trunkHeight, foliageColor) {
    // Draw trunk
    context.fillStyle = 'brown';
    context.fillRect(x - trunkWidth / 2, y - trunkHeight, trunkWidth, trunkHeight);

    // Draw foliage
    context.beginPath();
    context.arc(x, y - trunkHeight, trunkWidth * 1.5, 0, Math.PI * 2);
    context.fillStyle = foliageColor;
    context.globalAlpha = 0.7; // Set transparency
    context.fill();
    context.closePath();
}

// Function to draw a house
function drawHouse(x, y, width, height, roofColor) {
    // Draw house body
    context.fillStyle = 'white';
    context.fillRect(x, y - height, width, height);

    // Draw roof
    context.beginPath();
    context.moveTo(x, y - height);
    context.lineTo(x + width / 2, y - height - 60);
    context.lineTo(x + width, y - height);
    context.closePath();
    context.fillStyle = roofColor;
    context.fill();

    // Draw door
    context.fillStyle = 'brown';
    context.fillRect(x + width / 4, y - height / 2, width / 2, height / 2);
}

// Function to draw the sun
function drawSun(x, y, radius, color) {
    // Draw sun
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = color;
    context.globalAlpha = 0.5; // Set transparency
    context.fill();
    context.closePath();

    // Draw sunrays
    context.strokeStyle = 'yellow';
    context.lineWidth = 2;
    context.globalAlpha = 0.5;
    for (var i = 0; i < 16; i++) {
        context.beginPath();
        context.moveTo(x, y);
        var endX = x + (radius + 20) * Math.cos(i * Math.PI / 8); // Extend the rays by adding 20 pixels to the radius
        var endY = y + (radius + 20) * Math.sin(i * Math.PI / 8); // Extend the rays by adding 20 pixels to the radius
        context.lineTo(endX, endY);
        context.stroke();
        context.closePath();
    }

    // Draw two eyes (circles)
    context.beginPath();
    context.arc(80, 80, 7, 0, 2 * Math.PI);
    context.fillStyle = 'black';
    context.fill();

    context.beginPath();
    context.arc(120, 80, 7, 0, 2 * Math.PI);
    context.fillStyle = 'black';
    context.fill();

    // Draw a smile (arc)
    context.beginPath();
    context.arc(100, 100, 30, 0, Math.PI, false);
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();
}