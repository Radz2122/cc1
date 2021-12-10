/**
Project 2
Radhika Patel

Main Script
Handles the main functions and a few assets
**/

// A variable to store the currently active state object (starts empty)
let currentState;
//stores the dog img
let img;
//stores the background music
let backMusic;
//stores array of peaks
let peaks;

// loads an img and a sound
  function preload(){
    //image source= https://www.pinterest.ca/pin/553520610445431813/
    img=loadImage('assets/images/dog.jpg');

    // sound source: https://www.youtube.com/watch?v=EUepTfZbEiQ
    backMusic = loadSound(`assets/sounds/gameOver.mp3`);
  }


// start program in the title state, get audio peaks
function setup() {

  //new state for program, title
  currentState = new Title();

  //sound
  userStartAudio();
  peaks = backMusic.getPeaks(windowWidth);
  //PLAY MUSIC!!!!!!!!!!!!!!
 // backMusic.play();
// backMusic.loop();
// backMusic.setVolume(0.4);
}

//calls the draw method of the current state
function draw() {
  currentState.draw();
}

// Call the mousePressed method of the current state
function mousePressed(){
  currentState.mousePressed();
}
