/**
Mona Lisa
Radhika Patel

Program to reproduce the Mona Lisa.
*/

/**
PLAN:
-Draw the bust
-Draw neck
-Draw head
-Draw face
-Draw hair **/
"use strict";

/**
Description of setup
*/
function setup() {
  createCanvas(400,600);
  background(144,209,152);
  noStroke();

  //Draw hair
  fill(50,10,10);
  ellipse(210,180,180,240);

  //draw Monas face
  fill(219,195,114);
  ellipse(200,150,110,150);

  //draw mouth
  noFill();
  stroke(0);
  arc(200,30,300,300, 5.5* PI/4 + TWO_PI +PI, 6.5* PI/4+ PI);
  // line(180,200,220,200);

}



/**
Description of draw()
*/
function draw() {

}
