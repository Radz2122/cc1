/**
The Age of Aquariums
Radhika Patel

This exercise helps explore arrays and for loops.
*/

"use strict";

//array to store particles
let school = [];

//array to store thunder bolts
let bolts = [];

//limits the amount of particles
let schoolSize = 6;

//limits the amount of thunder bolts
let boltSize = 3;

//counts the players score
let score = 0;

//starts off the game with the title
let state = `title`;

//object that stores the players info
let player = {
  image: undefined,
  x: 0,
  y: 0,
  sizeX: 50,
  sizeY: 40,
  vx: 0,
  vy: 0,
  speed: 2,
  ax: 0,
  ay: 0,
  acceleration: 0.1,
  deceleration: 0,
  maxSpeed: 8,
};

/**
Loads the players image (voltorb)
*/
function preload() {
  // IMAGE SOURCE -->  https://pokemon-encyclopedia.fandom.com/wiki/Voltorb
  player.image = loadImage("assets/images/voltorb.png");
}

/**
Sets up the background and the elements of the game (player, thunder bolts and particles)
*/
function setup() {
  createCanvas(600, 600);
  // the player spawns at a random spot
  player.y = random(0, height);
  player.x = random(5, 100);

  //the game elements are generated
  for (let i = 0; i < schoolSize; i++) {
    let fish = createFish(random(0, width), random(0, height), random(0, 3));
    school.push(fish);
  }
  for (let i = 0; i < boltSize; i++) {
    let bolt = createBolt(random(0, width), random(0, height));
    bolts.push(bolt);
  }
}

/**
stores info on a particle and returns it
*/
function createFish(x, y, speed) {
  let fish = {
    x: x,
    y: y,
    size: 40,
    vx: 0,
    vy: 0,
    speed: speed,
  };
  return fish;
}

/**
stores info on a bolt and returns it
*/
function createBolt(x, y) {
  let bolt = {
    x: x,
    y: y,
    size: 25,
    touched: false,
  };
  return bolt;
}

/**
Changes the stage of the game depending on the state
*/
function draw() {
  background(0);

  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `win`) {
    win();
  } else if (state === `lose`) {
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
  displayElements();
  movePlayer();
  checkWin();
  checkLose();
}

/**
verifies if the player collected all bolts
*/
function checkWin() {
  if (score === 3) {
    state = `win`;
  }
}

/**
displays player image and verifies the location of the particles and the bolts
*/
function displayElements() {
  imageMode(CENTER);
  //display players image
  image(player.image, player.x, player.y, player.sizeX, player.sizeY);

  //the loops go through the game elements respective arrays to move them, display them
  //and calculate their distance from the player
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

/**
displays winning text
*/
function win() {
  push();
  textSize(64);
  fill(250, 200, 0);
  textAlign(CENTER, CENTER);
  text(`YOU WON!`, width / 2, height / 2);
  pop();
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
allows player to move around
*/
function movePlayer() {
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

/**
Moves the particles randomly
*/
function moveFish(fish) {
  let change = random(0, 1);
  if (change < 0.05) {
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
  }

  //move the fish
  fish.x += fish.vx;
  fish.y += fish.vy;

  //constrain the fish to the canvas
  fish.x = constrain(fish.x, 0, width);
  fish.y = constrain(fish.y, 0, height);
}

/**
displays the provided particle on the canvas
*/
function displayFish(fish) {
  push();
  fill(0, 96, 255);
  noStroke();
  ellipse(fish.x, fish.y, fish.size);
  pop();
}

/**
displays the provided bolt on the canvas
*/
function displayBolt(bolt) {
  if (!bolt.touched) {
    push();
    fill(250, 200, 0);
    noStroke();
    ellipse(bolt.x, bolt.y, bolt.size);
    pop();
  }
}

/**
checks if the player touched a bolt and changes the score
*/
function checkBolts(bolt) {
  if (!bolt.touched) {
    let d = dist(player.x, player.y, bolt.x, bolt.y);

    if (d < player.sizeX / 2 + bolt.size / 2) {
      bolt.touched = true;
      //when the player collects a bolt their score goes up
      score += 1;
      console.log(score);
    }
  }
}

/**
checks if the player touched a particle and changes the state
*/
function checkParticles(fish) {
  let d = dist(player.x, player.y, fish.x, fish.y);

  if (d < player.sizeX / 2 + fish.size / 2) {
    state = `lose`;
  }
}

/**
 stops the users mouvement if they release their key
*/
function keyReleased() {
  player.vx = player.deceleration;
  player.vy = player.deceleration;
}

/**
checks if the player clicked during the title screen to start
*/
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}
