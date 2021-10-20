/**
Project 1
Radhika Patel

This is my first project, a spy simulation game
*/

"use strict";

//starts off the game with the title
let state = `title`;

//array to store blueprints
let bpGrp = [];

//array to store obstacle
let obGrp=[];

//checks if the player picked up a bp to start the first obstacle
let firstBpPickedUp=false;

let score=0;

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

  // // SOURCE------- https://www.seekpng.com/idown/u2w7r5u2w7y3t4o0_this-free-icons-png-design-of-simple-blueprints/
  // bpImg= loadImage("assets/images/blueprint.png");

}

/**
Description of setup
*/
function setup(){
createCanvas(windowWidth, windowHeight);

//the game elements are generated
for (let i = 0; i < 3; i++) {
  let bp = createBp(random(0, width),random(0, height));
  bpGrp.push(bp);
  }
for (var i = 0; i <1; i++) {
  let ob=createObstacle(0,random(0,height),random(200,500));
  obGrp.push(ob);
}

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
  image(player.image, player.x, player.y, player.size, player.size);
  displayBp();
  movePlayer();
  displayObstacle1();
  // verifyScoreAddObstacle(); TO DOOOO ADD A REC
}
/**
stores info on a blueprint and returns it
*/
function createBp(x, y) {
  let bp = {
    x: x,
    y: y,
    sizeX:60,
    sizeY:40,
    touched:false
  };
  return bp;
}

/**
stores info on an obstacle and returns it
*/
function createObstacle(x,y,sizeY){
  let obstacle={
    x:x,
    y:y,
    sizeX:60,
    sizeY:sizeY,
    speed:5
  };
  return obstacle;
}


/**
displays the first obstacle, the rectangle
*/
function displayObstacle1(){
  for (let i = 0; i < obGrp.length; i++) {
    createObstacle1Shape(obGrp[i]);
    checkObstacle(obGrp[i]);
    if(firstBpPickedUp){
      moveObstacle(obGrp[i]);
    }
  }
}
function createObstacle1Shape(obstacle){
  push();
  fill(0, 96, 255);
  rect(obstacle.x,obstacle.y,obstacle.sizeX, obstacle.sizeY);
  firstBpPickedUp=true;
  pop();
}

/**
moves the first obstacle, the rectangle in a loop and respawns it at a random spot when its out of the screen
*/
function moveObstacle(obstacle){
  obstacle.x=obstacle.x+obstacle.speed;
  if(obstacle.x>width){
    obstacle.x=0;
    obstacle.y=random(0,height);
    obstacle.sizeY=random(85,500);
  }
}
function checkObstacle(obstacle){
  if (!obstacle.touched) {
    let d = dist(player.x, player.y, obstacle.x, obstacle.y);

    if (d < player.size / 2 + obstacle.sizeX/2) {
      state = `lose`;
    }
  }
}
/**
 displays the blueprints and calls the creation function
  */
function displayBp(){
  //the loop goes through the bp array to create and check on them if they havent been collected yet
    for (let i = 0; i < bpGrp.length; i++) {
      createBpShape(bpGrp[i]);
      checkBp(bpGrp[i]);
    }
}

/**
creates the bp and makes themn disappear once collected
*/
function createBpShape(bp){
  if (!bp.touched) {
    push();
    fill(0, 96, 255);
    noStroke();
    rect(bp.x, bp.y, bp.sizeX,bp.sizeY);
    pop();
  }
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
checks if the player touched a bp
*/
function checkBp(bp) {
  if (!bp.touched) {
    let d = dist(player.x, player.y, bp.x, bp.y);

    if (d < player.size / 2 + bp.sizeY/2 ) {
      bp.touched = true;
      score+=1;
      console.log(score);
    }
  }
}

/**
displays losing text
*/
function lose() {
  push();
  textSize(45);
  fill(0, 96, 255);
  textAlign(CENTER, CENTER);
  text(`YOU LOST:( TRY AGAIN`, width / 2, height / 2);
  pop();
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
