/**
Project 1
Radhika Patel

This is my first project, a spy simulation game
*/

"use strict";
//object that represents the player
let user = {
  image: undefined,
  x: 0,
  y: 0,
  size: 200,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  acceleration: 0.1,
  deceleration: 0,
  maxSpeed: 8
};

/**
Description of preload
*/
function preload() {
  // SOURCE------- https://opengameart.org/content/animated-top-down-survivor-player
  user.image = loadImage("assets/images/survivor-move_flashlight_0.png");
}


/**
Description of setup
*/
function setup() {
createCanvas(windowWidth, windowHeight);
}


/**
Description of draw()
*/
function draw() {
  background(255, 255, 255);
  imageMode(CENTER);
  image(user.image, user.x, user.y, user.size, user.size);
}
