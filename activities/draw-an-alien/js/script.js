/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";


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
  background('#222222');
  noStroke();

  fill(144,238,144);
  circle(400, 400, 500);
  translate(140, 45);
  scale(2.5);
  triangle(30, 75, 58, 20, 86, 75);
  translate(90,0);
  triangle(30, 75, 58, 20, 86, 75);

  fill(0,0,0);
  ellipse(56, 120, 45, 45);
  ellipse(-20, 120, 45, 45);
  fill(244,194,194);
strokeWeight(4);
stroke(51);
arc(5, 180, 50, 50, 0, PI + QUARTER_PI, CHORD);


}


/**
Description of draw()
*/
function draw() {

}
