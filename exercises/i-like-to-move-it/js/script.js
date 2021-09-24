/**
Exercise 1 - I like to move it
Radhika Patel

This is the first exercise in which mouvement,mouse positioning, colors, shapes and the map()+ constrain() functions are explored.
*/

"use strict";

//object for background color
let bg = {
  r: 173,
  g: 216,
  b: 230,
};
//object for ellipse
let circle = {
  x: 800,
  y: 70,
  size: 30,
  color: 0,
  speed: -2,
};
//object for rectangle
let rectangle = {
  x: 0,
  y: 744,
  w: 800,
  h: 55,
  color: 0,
};
function preload() {}

/**
Creates a canvas and sets the stroke weight
*/
function setup() {
  createCanvas(800, 800);
  strokeWeight(2);
}

/**
Creates ellipses at random y positions that translate and draws 3 fans that rotate.
*/
function draw() {
  //setting background color
  background(bg.r, bg.g, bg.b);

  //mapping for the size and the color of the ellipse that changes from the mouse position
  circle.color = map(mouseX, 0, width, 0, 255);
  circle.size = map(mouseY, 0, height, 30, 200);
  fill(11, circle.color, 255);

  //generates ellipses
  for (let i = 0; i < 5; i++) {
    //add random y axis for glitch effect
    ellipse(circle.x, random(50, 55), circle.size);
  }

  //make the circle move from one side to another and limit it to pos. 60 in the x axis
  circle.x += circle.speed;
  circle.x = constrain(circle.x, 60, width);

  //Fans made from the polygon base (further down), they rotate
  push();
  fill(152, 251, 152);
  translate(width * 0.5, height * 0.6);
  rotate(frameCount / -120.0);
  polygon(0, 0, 160, 12);
  pop();

  push();
  fill(247, 161, 146);
  translate(width * 0.2, height * 0.4);
  rotate(frameCount / -100.0);
  polygon(0, 0, 140, 10);
  pop();

  push();
  fill(220, 191, 255);
  translate(width * 0.7, height * 0.35);
  rotate(frameCount / -80.0);
  polygon(0, 0, 120, 8);
  pop();

  //create rectangle at the bottom of the canvas and randomly change its color for glitch effect
  fill(220, 191, random(0, 190));
  rect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
}
//Function to create polygons,
//taken from P5 reference website: https://p5js.org/examples/form-regular-polygon.html
//Modification done to adapt to my concept
function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    //Modified line of code, replaced VERTEX by TRIANGLE to create the fans
    triangle(0, 0, sx + 5, sy + 5, sx + 15, sy + 15);
  }
  endShape(CLOSE);
}
