/**
The Age of Aquariums
Radhika Patel

This exercise helps explore arrays and for loops.
*/

"use strict";

let school=[];
let schoolSize=4;

/**
Description of setup
*/
function setup() {
  createCanvas(600,600);

  for (let i = 0; i < schoolSize; i++) {
    let fish= createFish(random(0,width), random(0,height));
    school.push(fish);
  }
}

function createFish(x,y){
  let fish={
    x:x,
    y:y,
    size:50,
    vx:0,
    vy:0,
    speed:2
  };
  return fish;
}
/**
Description of draw()
*/
function draw() {
  background(0);

  for (let i = 0; i < school.length; i++) {
    moveFish(school[i]);
    displayFish(school[i]);
  }
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

function mousePressed(){
  let fish= createFish(mouseX,mouseY);
  school.push(fish);
}
