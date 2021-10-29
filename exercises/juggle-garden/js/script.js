/**
Juggle-simulation
Radhika Patel

This is the juglging exercise made with classes.
*/

"use strict";
//starts off the game with the title
let state = `title`;

//store gravity's force
let gravityForce = 0.0025;

//store paddle
let paddle;

//amount of time the game lasts in seconds
let time = 10;

//var for the good balls
let balls = [];
let numBalls = 10;

//var for the bad balls
let badBalls = [];
let numBadBalls = 3;

//creates a new paddle and resets the game state
function setup() {
  createCanvas(windowWidth, windowHeight);
  paddle = new Paddle(300, 20);
  reset();
}

//calls functions corresponding to the state the player is in
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
    reset();
  }
  else if (state === `lose`) {
    lose();
    reset();
  }
}

//Creates the game elements (balls and paddle) and displays them
function simulation() {
  //calls the paddles functions to move and display it
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
    //counts the time that has passed and verifies if the player kept a ball alive
    //if a ball is alive the player wins, else they lose
    if (round(millis() / 1000) === time && ball.active===true) {
      state = `win`;
    }
     else if (round(millis() / 1000) === time && ball.active===false) {
      state = `lose`;
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
    //verifies if a bad ball touched the paddle, if it did the player loses
    if (badBall.touchedPaddle === true) {
      state = `lose`;
    }
  }
}

//creates and displays the title
function title() {
  push();
  textSize(45);
  fill(0, 96, 255);
  textAlign(CENTER, CENTER);
  text(`Welcome`, width / 2, height / 2);
  pop();
}

//creates and displays the losing screen
function lose() {
  push();
  textSize(45);
  fill(0, 96, 255);
  textAlign(CENTER, CENTER);
  text(`YOU LOST:(Click to try again`, width / 2, height / 2);
  pop();
}

//creates and displays the winning screen
function win() {
  push();
  textSize(45);
  fill(0, 96, 255);
  textAlign(CENTER, CENTER);
  text(`YOU WON!! Click to play again:)`, width / 2, height / 2);
  pop();
}

//starts and restarts the game when the mouse button is clicked
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  } else if (state === `lose`) {
    state = `title`;
  }
}

//reset the values of the game variables once a new game is started
function reset() {
  balls = [];
  badBalls = [];
  for (let i = 0; i < numBalls; i++) {
    let x = random(0, width);
    let y = random(-400, -100);
    let ball = new Ball(x, y);
    balls.push(ball);
  }

  for (let i = 0; i < numBadBalls; i++) {
    let x = random(0, width);
    let y = random(-400, -100);
    let badBall = new Badball(x, y);
    badBalls.push(badBall);
  }
}
