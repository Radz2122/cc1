/**
Project 2
Radhika Patel

This is my final project, a matchmaking memory game with a twist
*/

"use strict";

//starts off the game with the game FOR NOW
let state = `game`;
//array that contains the first set of cards
let cards = [];
//array that will contain the copy of the first array to make pairs
let copyCards=[];

// How many rows and columns in the grid?
let rows = 3;
let cols = 2;

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
  for (let i = 0; i < copyCards.length; i++) {
    let copiedCard= copyCards[i];
    copiedCard.display();
  }
}

//displays the cards in a grid
// code inspired by Pippin's grid: https://editor.p5js.org/pippinbarr/sketches/Xq3qsbQWA
function createCardGrid(){
  for (let c=0; c < cols; c++) {
    for (let r =0 ;r< rows ;r++) {
      //selectiing a possible pattern at random
      const patternChoice = Math.floor(Math.random() * possiblePatterns.length);
      //creating cards and pushing them into their array
      // the multiplied value is the distance between the cards
      //the addded value is the position of the entire card grid
      //had to play around with the numbers to find the correct ones....
      let card = new Card(c * 280 + windowWidth/3.5, r * 280 + windowHeight/4,possiblePatterns[patternChoice]);
      cards.push(card);
      possiblePatterns.splice(patternChoice,1);
      arrayCopy(cards,0,copyCards,0,cards.length);

    }
  }
    console.log(cards);
    console.log(copyCards);
}
