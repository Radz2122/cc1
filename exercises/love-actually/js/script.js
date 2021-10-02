/**
Exercise 3: Love-actually
Radhika Patel

This exercise explores if-statements,functions,parameters and states
*/

let user = {
  x: undefined,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 1.2,
  acceleration:0.08,
  deceleration:0
};

let otherPerson = {
  x: undefined,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 1
};

//start off the simulation with the title
let state = `title`;

//the number of times the player stops
let nbReleased=0;

//setups canvas and circles
function setup() {
  createCanvas(500,500);
  setupCircles();
}

//places the circles and moves them in a random direction at the start
function setupCircles() {
  separateCircles();
  // Start circles moving in a random direction
  user.vx = random(-user.speed,user.speed);
  user.vy = random(-user.speed,user.speed);
  otherPerson.vx = random(-otherPerson.speed,otherPerson.speed);
  otherPerson.vy = random(-otherPerson.speed,otherPerson.speed);
}
function separateCircles(){
  // Position circles separated from one another
  user.x = width / 3;
  otherPerson.x = 2 * width / 3;
}

//sets different states
function draw() {
  background(0);

  if (state === `title`) {
    title();
  }
  else if (state === `simulation`) {
    simulation();
  }
  else if (state === `love`) {
    love();
  }
  else if (state === `sadness`) {
    sadness();
  }
  else if (state ===`infinite`){
    infinite();
  }
}

//sets the title at the start
function title() {
  push();
  textSize(64);
  fill(200,100,100);
  textAlign(CENTER,CENTER);
  text(`LOVE?`,width/2,height/2);
  pop();
}

//to check state changes and to control mouvements
function simulation() {
  move();
  checkOffscreen();
  checkOverlap();
  display();
  checkAlternateEnding();
}

function love() {
  push();
  textSize(64);
  fill(255,150,150);
  textAlign(CENTER,CENTER);
  text(`LOVE!`,width/2,height/2);
  pop();
}

function sadness() {
  push();
  textSize(64);
  fill(10,50,230);
  textAlign(CENTER,CENTER);
  text(`Try again`,width/2,height/2);
  pop();
}

function infinite(){
  push();
  textSize(45);
  fill(255,40,40);
  textAlign(CENTER,CENTER);
  text(`Infinitely Separated `,width/2,height/6);
  pop();
  separateCircles();
  display();
}

//handles mouvements in the program : user controls and otherPerson mouvements
function move() {

  //make the other circle move away form the user
  let dx= otherPerson.x-user.x;
  let dy=otherPerson.y-user.y;

  if(dx<0){
    otherPerson.vx=-otherPerson.speed;
  }
  else if(dx>0){
    otherPerson.vx=otherPerson.speed;
  }
  if(dy<0){
    otherPerson.vy=-otherPerson.speed;
  }
  else if(dy>0){
    otherPerson.vy=otherPerson.speed;
  }


  //user controls, they can move with the arrows or WASD
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
  // Move the circles
  user.x = user.x + user.vx;
  user.y = user.y + user.vy;

  otherPerson.x = otherPerson.x + otherPerson.vx;
  otherPerson.y = otherPerson.y + otherPerson.vy;
}

//the ending that comes on if the user stops 3 times
function checkAlternateEnding(){
  if(nbReleased===3){
    state=`infinite`;
  }
}

function checkOffscreen() {
  // Check if the circle has gone offscreen and the number of times the player stopped (to avoid bugs)
  if (isOffscreen(otherPerson) && nbReleased<3) {
    state = `sadness`;
  }
  else if (isOffscreen(otherPerson) && nbReleased>=3){
    state=`infinite`;
  }
}

function isOffscreen(circle) {
  if ((circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height)&& nbReleased<3) {
    return true;
  }
  else {
    return false;
  }
}

function checkOverlap() {
  // Check if the circles overlap
  let d = dist(user.x,user.y,otherPerson.x,otherPerson.y);
  if (d < user.size/2 + otherPerson.size/2) {
    state = `love`;
  }
}

function display() {
  // Display the circles
  fill(255,192,203);
  ellipse(user.x,user.y,user.size);
  fill(255);
  ellipse(otherPerson.x,otherPerson.y,otherPerson.size);
}

//checks if the player clicked during the title screen to start
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}

//function that stops the users mouvement if they release their key
function keyReleased() {
  nbReleased++;
  user.vx = user.deceleration;
  user.vy = user.deceleration;
}
