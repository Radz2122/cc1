/**
Exercise 3: Love-actually
Radhika Patel

This exercise explores if-statements, loops,functions,parameters and states
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

let circle2 = {
  x: undefined,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 1
};

let state = `title`; // Can be: title, simulation, love, sadness
let nbReleased=0;

function setup() {
  createCanvas(500,500);
  setupCircles();
}

function setupCircles() {
  // Position circles separated from one another
  user.x = width / 3;
  circle2.x = 2 * width / 3;

  // Start circles moving in a random direction
  user.vx = random(-user.speed,user.speed);
  user.vy = random(-user.speed,user.speed);
  circle2.vx = random(-circle2.speed,circle2.speed);
  circle2.vy = random(-circle2.speed,circle2.speed);
}

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
  else if (state ===`infiniteTime`){
    infiniteTime();
  }
}

function title() {
  push();
  textSize(64);
  fill(200,100,100);
  textAlign(CENTER,CENTER);
  text(`LOVE?`,width/2,height/2);
  pop();
}

function simulation() {
  move();
  checkOffscreen();
  checkOverlap();
  display();
  verifyEasterEgg();
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
  fill(150,150,255);
  textAlign(CENTER,CENTER);
  text(`:(`,width/2,height/2);
  pop();
}

function move() {

  //make the other circle move away form the user
  let dx= circle2.x-user.x;
  let dy=circle2.y-user.y;

  if(dx<0){
    circle2.vx=-circle2.speed;
  }
  else if(dx>0){
    circle2.vx=circle2.speed;
  }
  if(dy<0){
    circle2.vy=-circle2.speed;
  }
  else if(dy>0){
    circle2.vy=circle2.speed;
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

  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;
}
function infiniteTime(){
  push();
  textSize(64);
  fill(150,150,255);
  textAlign(CENTER,CENTER);
  text(`infinite`,width/2,height/2);
  pop();
}
function checkOffscreen() {
  // Check if the circle has gone offscreen
  if (isOffscreen(circle2) && nbReleased<3) {
    state = `sadness`;
  }
  else if (isOffscreen(circle2) && nbReleased>=3){
    state=`infiniteTime`;
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
  let d = dist(user.x,user.y,circle2.x,circle2.y);
  if (d < user.size/2 + circle2.size/2) {
    state = `love`;
  }
}

function display() {
  // Display the circles
  fill(255,192,203);
  ellipse(user.x,user.y,user.size);
  fill(255);
  ellipse(circle2.x,circle2.y,circle2.size);
}

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

function verifyEasterEgg(){
  if(nbReleased===3){
    state=`infiniteTime`;
  }
}
