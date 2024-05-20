/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import {GrRoad, GrSimpleHouse1, GrSimpleHouse2, GrSimpleHouse3, GrSimpleLightHouse} from "./house.js";
import {
    GrSimpleSwing,
    GrColoredRoundabout,
    GrSimpleRoundabout,
    GrAdvancedSwing,
    GrCarousel,
    GrHelicopter
  } from "./playground.js";
import {GrSimpleSnow, GrSimpleTree1, GrSun} from "./natural.js";
import { GrSimpleCurve } from "./transportation.js";
import {main} from "../examples/main.js";

/**m
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */

// make the world
let world = new GrWorld({
    width: 800,
    height: 600,
    groundplanesize: 40, // make the ground plane big enough for a world of stuff
    lightBrightness:1,ambient:1,
});

// start by putting in houses

let buildingcount;
for(buildingcount = -1; buildingcount < 2; buildingcount ++){
    world.add(new GrSimpleHouse1({z:buildingcount*7 + 2,x:-22, size:2.3, rotate:1}));
    world.add(new GrSimpleHouse1({z:buildingcount*7 + 2,x:-30, size:2.3, rotate:1}));
}
for(buildingcount = -1; buildingcount < 2; buildingcount ++){
    world.add(new GrSimpleHouse2({z:buildingcount*7 - 2,x:22, size:2.3, rotate:2}));
    world.add(new GrSimpleHouse2({z:buildingcount*7 - 2,x:30, size:2.3, rotate:2}));
}

for(buildingcount = -1; buildingcount < 2; buildingcount ++){
    world.add(new GrSimpleHouse3({x:buildingcount*7 - 2,z: -23, size:2.6, rotate:0}));
    world.add(new GrSimpleHouse3({x:buildingcount*7 - 2,z: -31, size:2.6, rotate:0}));
}

world.add(new GrRoad());


let roundabout = new GrSimpleRoundabout({ x: -5, z: 28});
world.add(roundabout);

let roundabout_2 = new GrColoredRoundabout({ x: 5, z: 28});
world.add(roundabout_2);

let swing_2 = new GrSimpleSwing({ x: 3, z: 20});
world.add(swing_2);

//add another swing
let swing = new GrAdvancedSwing({x: 8, z: 20});
world.add(swing);

//add another carousel
let carousel = new GrCarousel({ x: -5, z: 20 });
world.add(carousel);
world.add(new GrHelicopter());

world.add(new GrSimpleSnow());

let treecnt;
for(treecnt = -1; treecnt < 1; treecnt++){
    world.add(new GrSimpleTree1({x: treecnt*7 + 3, z: -10, height: 3}));
    world.add(new GrSimpleTree1({x: treecnt*7 + 3, z: 11, height: 3}));
}
for(treecnt = -1; treecnt < 3; treecnt++){
    world.add(new GrSimpleTree1({z: treecnt*7 - 3, x: -10, height: 3}));
    world.add(new GrSimpleTree1({z: treecnt*7 - 3, x: 10, height: 3}));
}
world.add(new GrSimpleCurve());
world.add(new GrSimpleLightHouse({x:-20,z: -20, size:0.02, rotate:0}));
world.add(new GrSimpleLightHouse({x:20,z: -20, size:0.02, rotate:0}));
world.add(new GrSun({size: 2, x: -20, z:-20}));
// put stuff into the world
// this calls the example code (that puts a lot of objects into the world)
// you can look at it for reference, but do not use it in your assignment
// main(world);

// // while making your objects, be sure to identify some of them as "highlighted"

///////////////////////////////////////////////////////////////
// because I did not store the objects I want to highlight in variables, I need to look them up by name
// This code is included since it might be useful if you want to highlight your objects here
function highlight(obName) {
    const toHighlight = world.objects.find(ob => ob.name === obName);
    if (toHighlight) {
        toHighlight.highlighted = true;
    } else {
        throw `no object named ${obName} for highlighting!`;
    }
}
// of course, the student should highlight their own objects, not these
highlight("SimpleHouse1-1");
highlight("SimpleHouse2-1");
highlight("SimpleHouse3-1");
highlight("Lighthouse-1");
highlight("SimpleTree1-1");
highlight("Snow");
highlight("trainsystem");
highlight("Helicopter-0");



///////////////////////////////////////////////////////////////
// build and run the UI
// only after all the objects exist can we build the UI
// @ts-ignore       // we're sticking a new thing into the world
world.ui = new WorldUI(world);
// now make it go!
world.go();
