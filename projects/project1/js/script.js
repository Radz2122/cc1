/**
Project 1
Radhika Patel

This is my first project, you play as a plague doctor collecting health packs... Beware of the green germs..
*/

"use strict";

//starts off the game with the title
let state = `title`;
//array to store blueprints
let bpGrp = [];

//array to store obstacle 1
let obGrp=[];
//array to store obstacle 2
let ob2Grp=[];

//checks if the player picked up a bp to start the first obstacle
let firstBpPickedUp=false;

//stores the players current score
let score=0;

//dialog
let dialogString='hmm... I think I had more of these';

//the possible positions in the Y axis for the exit
let exitPosY=[50,950];

//object representing dialog box
//Base source code taken from -->  https://editor.p5js.org/pippinbarr/sketches/ceXeaUZO7
let dialogBox = {
  // Position on screen (will set in setup())
  x: undefined,
  y: undefined,
  // Current string to display (starts empty)
  string: ``,
  // Whether it's currently visible on the canvas
  visible: false,
  // Dimensions
  width: 300,
  height: 200,
  // Padding
  padding: 20,
  // How long the dialog box should display before auto-closing
  duration: 2000
};

//object that represents the exit
let exit={
  image:undefined,
  x:undefined,
  y:undefined,
  sizeX:130,
  sizeY:60
}
//object that represents the player
let player = {
  image: undefined,
  x: undefined,
  y: undefined,
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
Loads images
*/
function preload() {
  // SOURCE------- https://www.artstation.com/artwork/WKDDxX
  player.image = loadImage("assets/images/plague.gif");

  //SOURCE--------- me:)
  exit.image= loadImage("assets/images/exit.png");




}

/**
Description of setup
*/
function setup(){
createCanvas(windowWidth, windowHeight);
textFont('Times');
//spawning the player on the right-center of the screen
player.x=width-150;
player.y=height/2;
//the game elements are generated
for (let i = 0; i < 3; i++) {
  let bp = createBp(random(0, width),random(0, height));
  bpGrp.push(bp);
  }
for (var i = 0; i <1; i++) {
  let ob=createObstacle(0,random(0,height),random(500,700));
  obGrp.push(ob);
  }
  // to start off the circle animation
  generateCircles();
  // Position the dialog box with its centre in the centre of the canvas
  dialogBox.x = width/2;
  dialogBox.y = height/2;

  //position exit img at a random position taken from the array
  const randomPosY = Math.floor(Math.random() * exitPosY.length);
  console.log(randomPosY, randomPosY[random]);
  exit.x=width/2;
  exit.y=height-exitPosY[randomPosY];
}


/**
Description of draw()
*/
function draw() {
background(16, 19, 2);
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
  textSize(84);
  textStyle(BOLD);
  fill(0);
  textAlign(CENTER, CENTER);
  text(`Welcome`, width / 2, height / 2);
  textSize(64);
  text(`Left click to start`, width / 2, height / 2+150);
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
  displayObstacle2();
  // Display the dialog box
  displayDialog();
  //display exit img
  displayExit();
  // verifyScoreAddObstacle(); TO DOOOO ADD A REC
}

/**
Generates the cricles at the beginning and once they go out of the screen
*/
function generateCircles(){
  //loops to generate the circles one after the other
  for (let i = 0; i<4; i++) {
    //giving the circle a ranodm x and using the var for the circles that follow behind
    let randomX=random(0,width);
    let ob2=createObstacle2(randomX,height);
    ob2Grp.push(ob2);
    //second circles that will follow behind the main ones (like a train of circles)
      for (let u = 0; u <1; u++) {
        //height for second circle of the train of circles
        let height2=height-50;
        let ob2After=createObstacle2(randomX,height2);
        ob2Grp.push(ob2After);
        //third circles that will follow behind the main ones (like a train of circles)
          for (let o = 0; o <1; o++) {
            //height for third circle of the train of circles
            let height3=height2-50;
            let ob3After=createObstacle2(randomX,height3);
            ob2Grp.push(ob3After);
          }
      }
  }
}

/**
displays the exit img
*/
function displayExit(){
  push();
  imageMode(CENTER);
  image(exit.image, exit.x, exit.y, exit.sizeX, exit.sizeY);
  //verify if the player tried to exit
  checkPlayerExit();
  pop();
}

/**
verifies if the player tried to exit
*/
function checkPlayerExit(){
  let d = dist(player.x, player.y, exit.x, exit.y);
  if (d < player.size / 2 + exit.sizeX/2) {
    if(score<3){
    // We display the dialog box if the player tries to exit but only if it isn't already visible
      if (!dialogBox.visible) {
      // Set it to visible to it displays
      dialogBox.visible = true;
      // Set the string in the dialog box to the current string
      dialogBox.string = dialogString;
      // Set a timer to hide the dialog box by calling the hideDialog()
      // function after the number of milliseconds specified by
      // the dialog box's duration property
      setTimeout(hideDialog, dialogBox.duration);
      }
    }
    else if(score===3){
      //the player wins is they get all the blueprints and exit
      state = `win`;
    }
  }
}

function hideDialog(){
  dialogBox.visible = false;
}
/**
displays a dialog box
*/
function displayDialog(){
  if(dialogBox.visible){
    push();
    rectMode(CENTER);
    stroke(255,0,0);
    strokeWeight(5);
    rect(dialogBox.x, dialogBox.y, dialogBox.width, dialogBox.height);
    rectMode(CENTER);
    text(dialogBox.string, dialogBox.x, dialogBox.y, dialogBox.width - dialogBox.padding, dialogBox.height - dialogBox.padding);
    pop();
  }
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
stores info on the second obstacle and stores it
*/
function createObstacle2(x,y){
  let obstacle2={
    x:x,
    y:y,
    sizeX:30,
    sizeY:30,
    speed:8
  };
  return obstacle2;
}

/**
displays the second obstacle, the circles
*/
function displayObstacle2(){
  for (let i = 0; i < ob2Grp.length; i++) {
    createObstacle2Shape(ob2Grp[i]);
    moveObstacle2(ob2Grp[i]);
    checkObstacle2(ob2Grp[i]);
  }
}

/**
creates the second obstacle, the circles
*/
function createObstacle2Shape(obstacle2){
  push();
  fill(64, 76, 9);
  ellipseMode(CENTER);
  ellipse(obstacle2.x,obstacle2.y,obstacle2.sizeX, obstacle2.sizeY);
  pop();
}

/**
moves the second obstacle, the circles
*/
function moveObstacle2(obstacle2){
    obstacle2.y=obstacle2.y-obstacle2.speed;
    if(obstacle2.y<-height){
      ob2Grp.splice(0,ob2Grp.length);
      generateCircles();
    }
}

/**
verifies if the player touched an obstacle and ends the game if they did
*/
function checkObstacle2(obstacle2){
  let d = dist(player.x, player.y, obstacle2.x, obstacle2.y);
  if (d < player.size / 2 + obstacle2.sizeX/2) {
    state = `lose`;
  }
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

/**
creates the first obstacle, the rectangle
*/
function createObstacle1Shape(obstacle){
  push();
  fill(64, 76, 9);
  rect(obstacle.x,obstacle.y,obstacle.sizeX, obstacle.sizeY);
  if(score===1){
    firstBpPickedUp=true;
  }
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
  let d = dist(player.x, player.y, obstacle.x, obstacle.y);
  if (d < player.size / 2 + obstacle.sizeX/2) {
    state = `lose`;
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
    noStroke();
    rectMode(CENTER);
    fill(100);
    rect(bp.x, bp.y, bp.sizeX,bp.sizeY);
    fill(100,0,0);
    rect(bp.x, bp.y, bp.sizeX/2,bp.sizeY/4);
    fill(100,0,0);
    rect(bp.x, bp.y, bp.sizeX/4,bp.sizeY/1.5);
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
  textSize(84);
  textStyle(BOLD);
  fill(0);
  textAlign(CENTER, CENTER);
  text(`You got infected...`, width / 2, height / 2);
  pop();
}

/**
displays winning text
*/
function win() {
  push();
  textSize(85);
  textStyle(BOLD);
  fill(0);
  textAlign(CENTER, CENTER);
  text(`Now you can go "treat" you patient...`, width / 2, height / 2);
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
