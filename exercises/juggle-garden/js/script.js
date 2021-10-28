/**
Juggle-simulation
Radhika Patel

This is the juglging exercise.
*/

"use strict";
//starts off the game with the title
let state = `title`;
let gravityForce = 0.0025;

let paddle;

//var for the good balls
let balls = [];
let numBalls = 10;

//var for the bad balls
let badBalls = [];
let numBadBalls = 3;

function setup() {
  createCanvas(windowWidth,windowHeight);

  paddle = new Paddle(300,20);

  for (let i = 0; i < numBalls; i++) {
    let x = random(0,width);
    let y = random(-400,-100);
    let ball = new Ball(x,y);
    balls.push(ball);
  }

  for (let i = 0; i < numBadBalls; i++) {
    let x = random(0,width);
    let y = random(-400,-100);
    let badBall = new Badball(x,y);
    badBalls.push(badBall);
  }
  reset();
}

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
    reset();
  }

}

//Creates the game elements (balls and paddle) and displays them
function simulation(){
  //calsl the paddles functions to move and display it
  paddle.move();
  paddle.display();

//generates the good balls and calls its functions for its interactivity
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if (ball.active) {
      ball.gravity(gravityForce);
      ball.move();
      ball.bounce(paddle);
      ball.display();
    }
  }

//generates the bad balls and calls its functions for its interactivity
  for (let i = 0; i < badBalls.length; i++) {
    let badBall = badBalls[i];
    if (badBall.active) {
      badBall.gravity(gravityForce);
      badBall.move();
      badBall.bounce(paddle);
      badBall.display();
    }
    //verifies if a bad ball touched the paddle
    if(badBall.touchedPaddle===true){
      state = `lose`;
    }
  }


}
function title(){
  push();
  textSize(45);
  fill(0, 96, 255);
  textAlign(CENTER, CENTER);
  text(`Welcome`, width / 2, height / 2);
  pop();
}
function lose() {
  push();
  textSize(45);
  fill(0, 96, 255);
  textAlign(CENTER, CENTER);
  text(`YOU LOST:( TRY AGAIN`, width / 2, height / 2);
  pop();
}

  function mousePressed() {
    if (state === `title`) {
      state = `simulation`;
    }
    else if(state===`lose`){
      state = `title`;
    }
  }

  function reset(){
    balls=[];
    badBalls=[];
    for (let i = 0; i < numBalls; i++) {
      let x = random(0,width);
      let y = random(-400,-100);
      let ball = new Ball(x,y);
      balls.push(ball);
    }

    for (let i = 0; i < numBadBalls; i++) {
      let x = random(0,width);
      let y = random(-400,-100);
      let badBall = new Badball(x,y);
      badBalls.push(badBall);
    }
  }
