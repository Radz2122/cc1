/**
Dodge-em
Radhika Patel

This is the second exercise in which conditionals (such as if statements and booleans), loops and mouse functions are epxlored.
*/

"use strict";

let covid19={
  x: 0,
  y: 250,
  size: 100,
  vx:0,
  vy:0,
  speed: 5,
  fill:{
    r:255,
    g:0,
    b:0
  }
};

let user={
  x:0,
  y:0,
  size:100,
  vx:0,
  vy:0,
  ax:0,
  ay:0,
  acceleration:0.1,
  maxSpeed:8,
  fill:255
};

let numStatic=0;

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth,windowHeight);
  //spawn covid19 at a random height and set the velocityX to move it
  covid19.y=random(0,height);
  covid19.vx=covid19.speed;
}

/**
Description of draw()
*/
function draw() {
  background(0);
  //draw randoms stars in the background
  for (var i = 0; i < numStatic; i++) {
    let x=random(0,width);
    let y=random(0,height);
    stroke(255);
    point(x,y);
  }
  //set covid19 positions with its velocityX and velocityY
  covid19.x=covid19.x+covid19.vx;
  covid19.y=covid19.y+covid19.vy;

  //respawn covid19 if it gets off screen
  if(covid19.x>width){
    covid19.x=0;
    covid19.y=random(0,height);
  }

  //user commands
  // user.x=mouseX;
  // user.y=mouseY;
  // if(keyIsPressed===true){
    if(keyIsDown(RIGHT_ARROW)) {
      user.vx+=user.acceleration;
    }
    if(keyIsDown(LEFT_ARROW)) {
      user.vx-=user.acceleration;
    }
    if(keyIsDown(UP_ARROW)) {
      user.vy-=user.acceleration;
    }
    if(keyIsDown(DOWN_ARROW)) {
      user.vy+=user.acceleration;
    }

  user.vx=user.vx+user.ax;
  user.vy=user.vy+user.ay;
  user.vx=constrain(user.vx,-user.maxSpeed,user.maxSpeed);
  user.vy=constrain(user.vy,-user.maxSpeed,user.maxSpeed);
  //set the users position with velocityX+velocityY to be able to move it
  user.x=user.x+user.vx;
  user.y=user.y+user.vy;

  //stop the program loop if the user touches covid19
  let d= dist(user.x,user.y,covid19.x,covid19.y);
  if(d<user.size/2+covid19.size/2){
    noLoop();
  }

  //draw the circles for the user and covid19
  fill(covid19.fill.r,covid19.fill.g,covid19.fill.b);
  ellipse(covid19.x,covid19.y,covid19.size);

  fill(user.fill);
  ellipse(user.x,user.y,user.size);
}

function keyReleased(){
   user.vx=0;
   user.vy=0;
}
