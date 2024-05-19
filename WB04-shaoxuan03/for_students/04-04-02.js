/**
 * 04-04-02.js - a simple JavaScript file that gets loaded with
 * page 4 of Workbook 4 (CS559).
 *
 * written by Michael Gleicher, January 2019
 * modified January 2020
 *
 */

// @ts-check
/* jshint -W069, esversion:6 */

import * as utilities from "./04-04-utilities.js";

/**
 * TwoDots - a function for the student to write
 * Notice that it gets the two points and the context as arguments
 * This function should apply a transformation
 *
 * You must write this function using transform.
 * There should not be any rotate, translate or scale function calls.
 *
 * @param {CanvasRenderingContext2D} context
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 */
function twoDots(context, x1, y1, x2, y2) {
    let distance = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
    let a = Math.cos(Math.atan2((y2-y1),(x2-x1))) * distance/10;
    let b = Math.sin(Math.atan2((y2-y1),(x2-x1))) * distance/10;
    let c = -Math.sin(Math.atan2((y2-y1),(x2-x1))) * distance/10;
    let d = Math.cos(Math.atan2((y2-y1),(x2-x1))) * distance/10;
    let e = x1;
    let f = y1;
    // please leave this line - you should CHANGE the 6 lines above. Add additional math/logic code as needed.
    context.transform(a, b, c, d, e, f);
}


// setup and start the program
utilities.setup("canvas1", twoDots, "black");

