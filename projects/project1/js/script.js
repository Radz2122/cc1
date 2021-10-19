/**
Project 1
Radhika Patel

This is my first project, a spy simulation game
*/

"use strict";

//starts off the game with the title
let state = `title`;


let bpImg1;
let bpImg2;
let bpImg3;

//object that represents the player
let player = {
  image: undefined,
  x: 0,
  y: 0,
  size: 100,
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
  player.image = loadImage("assets/images/survivor-move_flashlight_0.png");

  // SOURCE------- https://www.seekpng.com/idown/u2w7r5u2w7y3t4o0_this-free-icons-png-design-of-simple-blueprints/
  bpImg1= loadImage("assets/images/blueprint.png");
  bpImg2= loadImage("assets/images/blueprint.png");
  bpImg3= loadImage("assets/images/blueprint.png");

}


/**
Description of setup
*/
function setup(){
createCanvas(windowWidth, windowHeight);
}


/**
Description of draw()
*/
function draw() {
background(0);

  if (state === `title`) {
    title();
  }
  else if (state === `simulation`) {
    simulation();
  }
  else if (state === `win`) {
    win();
  }
  else if (state === `lose`) {
    lose();
  }
}

/**
sets the title at the start
*/
function title() {
  push();
  textSize(64);
  fill(200, 100, 100);
  textAlign(CENTER, CENTER);
  text(`Left click to start`, width / 2, height / 2);
  pop();
}

/**
calls the funciton needed to play
*/
function simulation() {
  //display the player when the simulation starts
  imageMode(CENTER);
  image(player.image, player.x, player.y, player.size, player.size);
  image(bpImg1, 100,100, 50, 50);
  image(bpImg2, 400,400, 50, 50);
  image(bpImg3, 1000,1000, 50, 50);
  movePlayer();
}

/**
allows player to move around
*/
function movePlayer() {
  //player commands
  //player can use ARROWS or WASD on keyboard
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    player.vx += player.acceleration;
  }
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    player.vx -= player.acceleration;
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    player.vy -= player.acceleration;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    player.vy += player.acceleration;
  }

  //set the players position and limit the speed
  player.vx += player.ax;
  player.vy += player.ay;
  player.vx = constrain(player.vx, -player.maxSpeed, player.maxSpeed);
  player.vy = constrain(player.vy, -player.maxSpeed, player.maxSpeed);
  player.x += player.vx;
  player.y += player.vy;
}

/**
checks if the player clicked during the title screen to start
*/
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}
/**
 stops the users mouvement if they release their key
*/
function keyReleased() {
  player.vx = player.deceleration;
  player.vy = player.deceleration;
}
