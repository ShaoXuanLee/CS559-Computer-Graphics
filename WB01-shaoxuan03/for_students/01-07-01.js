//this code got inspired by the example demonstrated by professor during last week coding session

const text = document.getElementById("ex3-span");

// Prepare an array of colors, each represented by its RGB values.
const colors = [
    [255, 0, 0],   // red
    [255, 255, 0], // yellow
    [0, 255, 0],   // green
];

// Set the speed of color changes and define variables to keep track of color and time.

const maxColorIndex = 2 * (colors.length - 1);
// the reason of this colors.length - 1 is because 3 colors - 1 * 2 = 4, which is the travelled distance from red to yellow to green to yellow to red
let colorIndexHolder = 0;
let lastTime = undefined;

// Define a function to update the text color based on time.
function updateTextColor(currentTime) {
    // Initialize 'lastTime' if it's not set.
    if (lastTime === undefined) {
        lastTime = currentTime;
    }

    // Calculate the time difference between the current and last update.
    const timeDelta = (currentTime - lastTime) * 0.001;
    
    // Update the color index using a double-range technique.
    colorIndexHolder = (colorIndexHolder + timeDelta) % maxColorIndex;

    colorIndex = Math.min(colorIndexHolder, maxColorIndex - colorIndexHolder);

    // Use linear interpolation to determine the current color.
    const color = interpolateColor(colors[Math.floor(colorIndex)], colors[Math.floor(colorIndex) + 1], colorIndex - Math.floor(colorIndex));

    // Set the background color of the text element.
    text.style.backgroundColor = getColorString(color);


    // Update the 'lastTime' for the next iteration.
    lastTime = currentTime;
    // Request the next animation frame to continue the color update loop.
    window.requestAnimationFrame(updateTextColor);
}

// Start the color update loop by requesting the first animation frame.
window.requestAnimationFrame(updateTextColor);

// Interpolate between two colors based on a given parameter 't'.
function interpolateColor(color1, color2, t) {
    return color1.map((value, index) => (value + (color2[index] - value) * t));
}

// Convert an array of RGB color values to a string representation.
function getColorString(color) {
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}