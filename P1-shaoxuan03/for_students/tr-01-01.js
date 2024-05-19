/*jshint esversion: 6 */
// @ts-ignore

// these two things are the main UI code for the train
// students learned about them in last week's workbook

import { draggablePoints } from "../libs/CS559/dragPoints.js";
import { RunCanvas } from "../libs/CS559/runCanvas.js";

// this is a utility that adds a checkbox to the page 
// useful for turning features on and off
import { makeCheckbox } from "../libs/CS559/inputHelpers.js";

/**
 * Have the array of control points for the track be a
 * "global" (to the module) variable
 *
 * Note: the control points are stored as Arrays of 2 numbers, rather than
 * as "objects" with an x,y. Because we require a Cardinal Spline (interpolating)
 * the track is defined by a list of points.
 *
 * things are set up with an initial track
 */
/** @type Array<number[]> */
let thePoints = [
  [150, 150],
  [150, 450],
  [450, 450],
  [450, 150],
];
let smokes = [];

/**
 * Draw function - this is the meat of the operation
 *
 * It's the main thing that needs to be changed
 *
 * @param {HTMLCanvasElement} canvas
 * @param {number} param
 */
function draw(canvas, param) {
  let context = canvas.getContext("2d");
  // clear the screen
  context.clearRect(0, 0, canvas.width, canvas.height);

  // draw the control points
  thePoints.forEach(function(pt) {
    context.beginPath();
    context.arc(pt[0], pt[1], 5, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  });

  // now, the student should add code to draw the track and train
  const simple = (document.getElementById("check-simple-track")).checked;
  const arcLength = (document.getElementById("check-arc-length")).checked;
  // num of points
  const numOfPoints = thePoints.length;
  

  //two helper function that prevents the points from running out/ ie make sure the points is circular
    function next(i) {
      return (Number(i) + 1) % numOfPoints;
    }

    function prev(i) {
      return (Number(i) - 1 + numOfPoints) % numOfPoints;
    }
    
    //function to look for derivative
    // formula is found in bezier curve section
    // 1/2* (pnext - pprev)
    function cardinal(i, j) {
      return 0.5 * (thePoints[next(i)][j] - thePoints[prev(i)][j]);
    }

    // Compute the derivatives for the cardinal spline
    let theDerivatives = [];
    thePoints.forEach((_, i) => theDerivatives.push([cardinal(i, 0), cardinal(i, 1)]));

    //this function is used to determine the control point , i is the index of point while j is the coordinate
    //using a var sign to determine whether we do addition or subtraction to the points 
    //1/3 is the relationship between points and derrivative
    function controlpts(i, j, sign) {
      return thePoints[i][j] + sign * 1 / 3 * theDerivatives[i][j];
    }

    // Compute the control points for the Bezier curves
    let ctrlpts = [];
    //storing 6 points, the one with sign = 0 is p0 and p1
    thePoints.forEach((_, i) => ctrlpts.push([controlpts(i, 0, 1), controlpts(i, 1, 1), controlpts(next(i), 0, -1), controlpts(next(i), 1, -1), 
      controlpts(next(i), 0, 0), controlpts(next(i), 1, 0)]));

    //this is the hermite function to calculate the points on curve
    function position(u, i, j) {
    const u2 = u * u; //u^2
    const u3 = u2 * u; // u^3
      return thePoints[i][j] + theDerivatives[i][j] * u + (-3 * thePoints[i][j] - 2 * theDerivatives[i][j] + 3 * thePoints[next(i)][j] - 
      theDerivatives[next(i)][j]) * u2 + (2 * thePoints[i][j] + theDerivatives[i][j] - 2 * thePoints[next(i)][j] + theDerivatives[next(i)][j]) * u3;
    }

    //calculate the velocity of the points by differentiating it 
    //basically differentiate the hermite form to reach the formula below
    function velocity(u, i , j) {
      const u2 = u * u;
      return theDerivatives[i][j] + 2 * (-3 * thePoints[i][j] - 2 * theDerivatives[i][j] + 3 * thePoints[next(i)][j] - theDerivatives[next(i)][j]) * u 
      + 3 * (2 * thePoints[i][j] + theDerivatives[i][j] - 2 * thePoints[next(i)][j] + theDerivatives[next(i)][j]) * u2;
    }

    //start doing arc length parameterization
    function get_distance(p1, p2){
      return Math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2);
    }

    let pts = []; //this hold the points that have equal distance
    let distances = [];
    let velocities = [];
    let tempDist = 0;
    let totalDist = 0;
    let seg = 0;
    const increment = 0.0001;
    const numOfSeg = numOfPoints / increment; //num of seg need to create = num of points / increment value

    //normalize the vector to desired size
    // this is later used to draw the double tracks
    function resize(p, l) {
      let norm = Math.sqrt(p[0] * p[0] + p[1] * p[1]);
      if (norm == 0) return [0, 0];
      return [p[0] / norm * l, p[1] / norm * l];
    }

    //compute the distance table
    for (let i = 0; i < numOfSeg; i++) {
      //find where the car is
      seg = Math.floor(increment * i);
      //find the points on the arc 
      pts[i] = [position(increment * i - seg, seg, 0), position(increment * i - seg, seg, 1)];
      distances[i] = [increment * i, totalDist];
      // with the points, find the distance
      if (i > 0) tempDist = get_distance(pts[i], pts[i - 1]);
      // sum the distances up
      totalDist += tempDist;
      // normalize the velocity for double tracks
      velocities[i] = resize([velocity(increment * i - seg, seg, 0), velocity(increment * i - seg, seg, 1)], 5);
    }

    // same logic in WB05, cut the segments small and add them all up to find the approx arc length
    //given a point x, find the corresponding arc length
    function arclen(x) {
      seg = 0;
      //this while loop looks for the closest to the current distance
      while (x > distances[seg][1] && seg < numOfSeg - 1) {
        seg++;
      }
      return distances[seg][0];
    }

    let u = 0;
    // Draw the simple track
    context.beginPath();
    if(simple){
      context.moveTo(ctrlpts[numOfPoints - 1][4], ctrlpts[numOfPoints - 1][5]);
      ctrlpts.forEach(ci => context.bezierCurveTo(ci[0], ci[1], ci[2], ci[3], ci[4], ci[5]));
      context.closePath();
    }else{
      //draw the parallel track
      //this part of code is from example
      context.moveTo(pts[numOfSeg - 1][0] + velocities[numOfSeg - 1][1], pts[numOfSeg - 1][1] - velocities[numOfSeg - 1][0]);
      pts.forEach((si, i) => context.lineTo(si[0] + velocities[i][1], si[1] - velocities[i][0]));
      context.moveTo(pts[numOfSeg - 1][0] - velocities[numOfSeg - 1][1], pts[numOfSeg - 1][1] + velocities[numOfSeg - 1][0]);
      pts.forEach((si, i) => context.lineTo(si[0] - velocities[i][1], si[1] + velocities[i][0]));

      //draw the rail ties
      for (let i = 0; i <= totalDist - 20; i += 20) {
        u = arclen(i);
        seg = Math.floor(u);
        context.save();
        context.translate(position(u - seg, seg, 0), position(u - seg, seg, 1));
        context.rotate(0.5 * Math.PI + Math.atan2(velocity(u - seg, seg, 1), velocity(u - seg, seg, 0)));
        context.fillRect(-10, -2.5, 20, 5); // CS559 Sample Code
        context.restore();
      }
    }
    context.stroke();
    
  
    // Draw the train
    const h = 40;
    const w = 25;
    //draw the number of car based on number of segment
    for (let i = 0; i < numOfPoints; i++) {
      if (arcLength) {
        u = arclen((totalDist * param / numOfPoints - i * h * 3 + totalDist) % totalDist);
      }
      else {
        u = (param - i * h / 100 + numOfPoints) % numOfPoints;
      }
      //calculate the position and velocity using the segment found
      seg = Math.floor(u);
      let x = position(u - seg, seg, 0);
      let y = position(u - seg, seg, 1);
      let dx = velocity(u - seg, seg, 0);
      let dy = velocity(u - seg, seg, 1);
      // Draw the car
      context.save();
      context.fillStyle = "red";
      context.translate(x, y);
      context.rotate(Math.atan2(dy, dx));
      context.fillRect(-h, -w, 2 * h, 2 * w);
      context.strokeRect(-h, -w, 2 * h, 2 * w);
      context.restore();
    }
}
//for some reason i cant add smokes because the html will just crash whenever i tried to do that. When i tried to do if(i=0) inside the for loop the whole html will crash
/**
 * Initialization code - sets up the UI and start the train
 */
let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas1"));
let context = canvas.getContext("2d");

// we need the slider for the draw function, but we need the draw function
// to create the slider - so create a variable and we'll change it later
let slider; // = undefined;

// note: we wrap the draw call so we can pass the right arguments
function wrapDraw() {
    // do modular arithmetic since the end of the track should be the beginning
    draw(canvas, Number(slider.value) % thePoints.length);
}
// create a UI
let runcanvas = new RunCanvas(canvas, wrapDraw);
// now we can connect the draw function correctly
slider = runcanvas.range;

// note: if you add these features, uncomment the lines for the checkboxes
// in your code, you can test if the checkbox is checked by something like:
// document.getElementById("check-simple-track").checked
// in your drawing code
// WARNING: makeCheckbox adds a "check-" to the id of the checkboxes
//
// lines to uncomment to make checkboxes
makeCheckbox("simple-track");
makeCheckbox("arc-length").checked=true;
//makeCheckbox("bspline");
(document.getElementById("check-simple-track")).onchange = wrapDraw;
(document.getElementById("check-arc-length")).onchange = wrapDraw;

// helper function - set the slider to have max = # of control points
function setNumPoints() {
    runcanvas.setupSlider(0, thePoints.length, 0.05);
}

setNumPoints();
runcanvas.setValue(0);

// add the point dragging UI
draggablePoints(canvas, thePoints, wrapDraw, 10, setNumPoints);

