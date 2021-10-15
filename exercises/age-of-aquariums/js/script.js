/**
The Age of Aquariums
Radhika Patel

This exercise helps explore arrays and for loops.
*/

"use strict";

let school=[];
let bolts=[];
let schoolSize=6;
let boltSize=3;
let score=0;

//start off the game with the title
let state = `title`;

let player={
  image: undefined,
  x:0,
  y:0,
  sizeX:50,
  sizeY:40,
  vx:0,
  vy:0,
  speed:2,
  ax: 0,
  ay: 0,
  acceleration: 0.1,
  deceleration: 0,
  maxSpeed: 8
};

function preload(){
  // IMAGE SOURCE -->  https://pokemon-encyclopedia.fandom.com/wiki/Voltorb
  player.image = loadImage("assets/images/voltorb.png");
}

/**
Description of setup
*/
function setup() {
  createCanvas(600,600);
  player.y = random(0, height);
  player.x = random(5,100);
  for (let i = 0; i < schoolSize; i++) {
    let fish= createFish(random(0,width), random(0,height),random(0,5));
    school.push(fish);
  }
  for (let i = 0; i < boltSize; i++) {
    let bolt= createBolt(random(0,width), random(0,height));
    bolts.push(bolt);
  }

}

function createFish(x,y,speed){
  let fish={
    x:x,
    y:y,
    size:40,
    vx:0,
    vy:0,
    speed:speed
  };
  return fish;
}

function createBolt(x,y){
  let bolt={
    x:x,
    y:y,
    size:25,
    touched:false
  };
  return bolt;
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

//sets the title at the start
function title() {
  push();
  textSize(64);
  fill(200,100,100);
  textAlign(CENTER,CENTER);
  text(`Left click to start`,width/2,height/2);
  pop();
}

function simulation(){
  displayElements();
  movePlayer();
  checkWin();
  checkLose();
}
function checkWin(){
  if(score===3){
    state=`win`;
  }
}
function checkLose(){
  // console.log("youl lose");
}

function displayElements(){
    imageMode(CENTER);
    image(player.image, player.x, player.y, player.sizeX, player.sizeY);
    for (let i = 0; i < school.length; i++) {
      moveFish(school[i]);
      displayFish(school[i]);
      checkParticles(school[i]);
    }

    for (let i = 0; i < bolts.length; i++) {
      displayBolt(bolts[i]);
      checkBolts(bolts[i]);
    }
}

function win() {
  push();
  textSize(64);
  fill(255,150,150);
  textAlign(CENTER,CENTER);
  text(`YOU WON!`,width/2,height/2);
  pop();
}

function lose(){
  push();
  textSize(64);
  fill(255,150,150);
  textAlign(CENTER,CENTER);
  text(`YOU LOST:( TRY AGAIN`,width/2,height/2);
  pop();
}
function movePlayer(){

    //user commands
    //user can use ARROWS or WASD on keyboard
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

    //set the users position and limit the speed
    player.vx += player.ax;
    player.vy += player.ay;
    player.vx = constrain(player.vx, -player.maxSpeed, player.maxSpeed);
    player.vy = constrain(player.vy, -player.maxSpeed, player.maxSpeed);
    player.x += player.vx;
    player.y += player.vy;
}

function moveFish(fish){
  let change= random(0,1);
  if (change<0.05) {
    fish.vx= random(-fish.speed, fish.speed);
    fish.vy= random(-fish.speed, fish.speed);
  }

  //move the fish
  fish.x+=fish.vx;
  fish.y+=fish.vy;

  //constrain the fish to the canvas
  fish.x=constrain(fish.x,0,width);
  fish.y=constrain(fish.y,0,height);
}

//displays the provided fish on the canvas
function displayFish(fish){
  push();
  fill(200,100,100);
  noStroke();
  ellipse(fish.x,fish.y,fish.size);
  pop();
}
function displayBolt(bolt){
  if(!bolt.touched){
    push();
    fill(250,200,0)
    noStroke();
    ellipse(bolt.x,bolt.y,bolt.size);
    pop();
  }

}

function checkBolts(bolt){
  if(!bolt.touched){
  //stop the program loop if the player touches a spark
    let d = dist(player.x, player.y, bolt.x, bolt.y);

    if (d< player.sizeX/2+bolt.size/2) {
    bolt.touched=true;
    score+=1;
    console.log(score);
    }
  }
}

function checkParticles(fish){
  //stop the program loop if the player touches a spark
    let d = dist(player.x, player.y, fish.x, fish.y);

    if (d< player.sizeX/2+fish.size/2) {
      state = `lose`;
    }
}
//functtion that stops the users mouvement if they release their key
function keyReleased() {
  player.vx = player.deceleration;
  player.vy = player.deceleration;
}

//checks if the player clicked during the title screen to start
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}
