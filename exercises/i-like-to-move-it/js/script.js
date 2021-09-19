/**
Exercise 1 - I like to move it
Radhika Patel

This is the first exercise in which mouvement,mouse positioning, colors, shapes and the map()+ constrain() functions are explored.
*/

"use strict";

//object for background color
let bg={
  r:173,
  g:216,
  b:230
};
let rotationSpeed=2;
/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
  createCanvas(800,800);

}


/**
Description of draw()
*/
function draw() {
  background(bg.r,bg.g,bg.b);

  // fill();
  polygon(100, 100, 120, 10);

  line(30, 20, 85, 75);
}

//Function to create polygon,
//taken from P5 reference website: https://p5js.org/examples/form-regular-polygon.html
function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
