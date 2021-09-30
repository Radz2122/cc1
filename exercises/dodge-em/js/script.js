/**
Dodge-em
Radhika Patel

This is the second exercise in which conditionals (such as if statements and booleans), loops and mouse functions are epxlored.
*/
//TO DO AT END : COMMIT, ADDREADME FILE, COMMENTS, CHANGE NUMSTATIC*************************************
"use strict";
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
  maxSpeed: 8,
  fill: 255,
};

let numStatic = 1;

let shellImg = {
  image: undefined,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  speed: 5,
  sizeX: 100,
  sizeY: 80,
  growth: 2,
};
function preload() {
  // SOURCE------- https://mariokart.fandom.com/wiki/Green_Shell
  shellImg.image = loadImage("assets/images/greenShell.png");
  // SOURCE------- https://www.deviantart.com/joshuat1306/art/Super-Mario-Yoshi-Riding-Bike-2D-791387181
  user.image = loadImage("assets/images/yoshi.png");
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  //spawn shell at a random height and set the velocityX to move it
  shellImg.y = random(0, height);
  shellImg.vx = shellImg.speed;
}

/**
Description of draw()
*/
function draw() {
  background(255, 255, 255);
  imageMode(CENTER);
  image(shellImg.image, shellImg.x, shellImg.y, shellImg.sizeX, shellImg.sizeY);
  image(user.image, user.x, user.y, user.size, user.size);

  //draw randoms squares in the background to hide the player
  for (let i = 0; i < numStatic; i++) {
    let x = random(0, width);
    let y = random(0, height);
    fill(0);
    ellipse(x, y, 20, 20);
  }
  //set shell positions with its velocityX and velocityY
  shellImg.x += shellImg.vx;
  shellImg.y += shellImg.vy;
  //respawn shell if it gets off screen
  if (shellImg.x > width) {
    shellImg.x = 0;
    shellImg.y = random(0, height);
  }

  //user commands
  //user can use ARROWS or WASD on keyboard
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    user.vx += user.acceleration;
  }
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    user.vx -= user.acceleration;
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    user.vy -= user.acceleration;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    user.vy += user.acceleration;
  }

  //set the users position and limit the speed
  user.vx += user.ax;
  user.vy += user.ay;
  user.vx = constrain(user.vx, -user.maxSpeed, user.maxSpeed);
  user.vy = constrain(user.vy, -user.maxSpeed, user.maxSpeed);
  user.x += user.vx;
  user.y += user.vy;

  //stop the program loop if the user touches shell
  let dShell = dist(user.x, user.y, shellImg.x, shellImg.y);
  if (dShell < user.size / 2 + shellImg.sizeY / 2) {
    noLoop();
  }

  //make shell bigger the closer it gets to the user
  if (dShell < 300) {
    shellImg.sizeX += shellImg.growth;
    shellImg.sizeY += shellImg.growth;
  } else {
    while (shellImg.sizeX > 100 && shellImg.sizeY > 80) {
      shellImg.sizeX -= shellImg.growth;
      shellImg.sizeY -= shellImg.growth;
    }
  }
}

//functtion that stops the users mouvement if they release their key
function keyReleased() {
  user.vx = user.deceleration;
  user.vy = user.deceleration;
}
