/**
Project 2
Radhika Patel

This is my final project, a matchmaking memory game with a twist
*/

"use strict";

//starts off the game with the game FOR NOW
let state = `game`;
let cards = [];

// How many rows and columns in the grid?
let rows = 3;
let cols = 4;

let patternChoice;
let possiblePatterns=["pattern1","pattern2","pattern3","pattern4","pattern5","pattern6"];

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  createCardGrid();
}


/**
Description of draw()
*/
function draw() {
  background(0);
  if (state === `game`) {
    game();
  }
}

//displays the game assets
function game(){
  for (let i = 0; i < cards.length; i++) {
    let card= cards[i];
    card.display();
  }
}

//displays the cards in a grid
// code inspired by Pippin's grid: https://editor.p5js.org/pippinbarr/sketches/Xq3qsbQWA
function createCardGrid(){
  for (let c=0; c < cols; c++) {
    for (let r =0 ;r< rows ;r++) {
      //selectiing a possible pattern at random
      const patternChoice = Math.floor(Math.random() * possiblePatterns.length);
      console.log(patternChoice);
      //creating cards and pushing them into their array
      // the multiplied value is the distance between the cards
      //the addded value is the position of the entire card grid
      let card = new Card(c * 280 + windowWidth/3.5, r * 280 + windowHeight/4,patternChoice);
      cards.push(card);
      possiblePatterns.splice(patternChoice,1);
      console.log(possiblePatterns);

    }
  }
}
