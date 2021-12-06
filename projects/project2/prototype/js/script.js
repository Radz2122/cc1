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
let cols = 4;

let patternChoice;
let possiblePatterns=["pattern1","pattern2","pattern3","pattern4","pattern5","pattern6","pattern1","pattern2","pattern3","pattern4","pattern5","pattern6"];
 let flippedCards=[];
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
    //the swithc detects which pattern to display but its a lot of repitition
    //POSSIBLY find an alternative?
    switch(card.nb){
      case "pattern1":
        //call the function that produces pattern 1
        //TEST
        card.pattern1();
        break;
      case "pattern2":
        //call the function that produces pattern 2
        // new Firstdesign()
        card.pattern2();
        break;
      case "pattern3":
        //call the function that produces pattern 3
        break;
      case "pattern4":
        //call the function that produces pattern 4
        break;
      case "pattern5":
        //call the function that produces pattern 5
        break;
      case "pattern6":
        //call the function that produces pattern 6
        break;
    }
  }
  // for (let i = 0; i < copyCards.length; i++) {
  //   let copiedCard= copyCards[i];
  //   //PROBLEM:since the array is the exact same the x positions of the cards in the copy have to be changed or we cant see them...
  //   //SOLUTION: make another display funciton but with an offset on the X position
  //   copiedCard.displayCopy();
  //   // console.log(copiedCard.nb);
  //     switch(copiedCard.nb){
  //       case "pattern1":
  //         //call the function that produces pattern 1
  //         //TEST
  //         copiedCard.pattern1Copy();
  //         break;
  //       case "pattern2":
  //         //call the function that produces pattern 2
  //         break;
  //       case "pattern3":
  //         //call the function that produces pattern 3
  //         break;
  //       case "pattern4":
  //         //call the function that produces pattern 4
  //         break;
  //       case "pattern5":
  //         //call the function that produces pattern 5
  //         break;
  //       case "pattern6":
  //         //call the function that produces pattern 6
  //         break;
  //     }
  // }

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
      //copy the array
      //PROBLEM:since the array is the exact same the x positions of the cards in the copy have to be changed or we cant see them...
      // arrayCopy(cards,0,copyCards,0,cards.length);

    }
  }
    console.log(cards);
    // console.log(possiblePatterns);
}

//inspired by github code
function mousePressed(){
  for (let i = 0 ;i < cards.length; i++) {
    let card= cards[i];
    if (card.isUnderMouse(mouseX, mouseY)) {
      console.log("yes");
      if (flippedCards.length < 2 && !card.isFaceUp) {
        card.setIsFaceUp(true);
        flippedCards.push(card);
        console.log(flippedCards);
        if (flippedCards[0].nb === flippedCards[1].nb) {
            console.log("its a match");
          }
        setTimeout(resetArray,2000);
      }
    }
  }
}
function resetArray(){
  flippedCards.splice(0,2);
}
