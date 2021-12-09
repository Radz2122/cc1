/**
Project 2
Radhika Patel

This is my final project, a matchmaking memory game with a twist
*/

class FirstLvl extends State {
  constructor() {
    super();
    //starts off the game with the game FOR NOW
    // let state = `game`;
    //array that contains the first set of cards
    this.itsTime=false;
    this.cards = [];
 this.delayStartFC = null
    // How many rows and columns in the grid?
    this.rows = 3;
    this.cols = 4;

    this.patternChoice;
    this.possiblePatterns = [
      "pattern1",
      "pattern2",
      "pattern3",
      "pattern4",
      "pattern5",
      "pattern6",
      "pattern1",
      "pattern2",
      "pattern3",
      "pattern4",
      "pattern5",
      "pattern6",
    ];
    this.flippedCards = [];
    this.nbValues = [];
    this.points = 0;

    createCanvas(windowWidth, windowHeight);
    this.createCardGrid();
  }

  /**
  Description of setup
  */
  // function setup() {

  // }

  /**
  Description of draw()
  */
  draw() {
    super.draw();
    background(0);
    this.displayCardGrid();
if(this.delayStartFC && (frameCount - this.delayStartFC) > 30){
  this.itsTime=true;
  this.delayStartFC = null;
}
    for (let i = 0; i < this.cards.length; i++) {
      let card = this.cards[i];
      // card.display();
      //the swithc detects which pattern to display
      switch (card.nb) {
        case "pattern1":
          this.pattern1(card);
          //call the function that produces pattern 1
          //TEST
          // card.pattern1();
          // const randomCard = Math.floor(Math.random() * cards.length);
          // new Firstdesign(cards[randomCard].x,cards[randomCard].y,cards[randomCard].nb);
          // cards[randomCard].display();
          // cards.splice(randomCard,1);
          // console.log(cards[randomCard].nb);
          break;
        case "pattern2":
          this.pattern2(card);
          //call the function that produces pattern 2
          // new Firstdesign()
          // card.pattern2();
          break;
        case "pattern3":
          //call the function that produces pattern 3
          this.pattern3(card);
          break;
        case "pattern4":
          //call the function that produces pattern 4
          this.pattern4(card);
          break;
        case "pattern5":
          //call the function that produces pattern 5
          this.pattern5(card);
          break;
        case "pattern6":
          //call the function that produces pattern 6
          this.pattern6(card);
          break;
      }
    }
  }

  //displays the game assets
  game() {}
  pattern1(card) {
    if (card.isFaceUp === true) {
      push();
      fill(34, 56, 34);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      fill(0, 56, 34);
      rect(card.x, card.y, card.width / 2, card.height / 2);
      pop();
    } else {
      push();
      fill(34, 34, 34);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      pop();
    }
  }
  //inspired by  https://editor.p5js.org/pippinbarr/sketches/B09AFYsGQ
  pattern2(card) {
    if (card.isFaceUp === true) {
      push();
      fill(34, 56, 34);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);

      // How many lines projecting from the center in a circle?
      let lines = 50;

      // Translate to the centre for rotation purposes
      translate(card.x, card.y);
      // A light stroke
      stroke(200);
      // Loop through all the lines we need to draw
      for (let i = 0; i < lines; i++) {
        // Rotate by one increment based on the number of lines there are
        rotate(TWO_PI / lines);
        // Calculate the time parameter for this line based on the base
        // plus a number based on the line number in the loop

        // Calculate the length of the line based on the time parameter
        // so it waves
        let length = random(2, card.width / 2);
        // A slightly light stroke weight
        strokeWeight(0.75);
        // Draw the line!
        line(0, 0, length, 3);
        // Draw a point at the end of the line for a little visual flourish
        // point(length + 5, 0);
      }
      pop();
    } else {
      push();
      fill(50, 34, 34);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      pop();
    }
  }
  pattern3(card) {
    if (card.isFaceUp === true) {
      push();
      fill(34, 56, 34);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      fill(0, 56, 34);
      rect(card.x, card.y, card.width / 2, card.height / 2);
      pop();
    } else {
      push();
      fill(34, 50, 34);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      pop();
    }
  }
  pattern4(card) {
    if (card.isFaceUp === true) {
      push();
      fill(34, 56, 34);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      fill(0, 56, 34);
      rect(card.x, card.y, card.width / 2, card.height / 2);
      pop();
    } else {
      push();
      fill(34, 50, 44);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      pop();
    }
  }
  pattern5(card) {
    if (card.isFaceUp === true) {
      push();
      fill(34, 56, 34);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      fill(0, 56, 34);
      rect(card.x, card.y, card.width / 2, card.height / 2);
      pop();
    } else {
      push();
      fill(80, 50, 44);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      pop();
    }
  }
  pattern6(card) {
    if (card.isFaceUp === true) {
      push();
      fill(34, 56, 34);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      fill(0, 56, 34);
      rect(card.x, card.y, card.width / 2, card.height / 2);
      pop();
    } else {
      push();
      fill(100, 50, 44);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      pop();
    }
  }

  createCard(x, y, nb) {
    let card = {
      x: x,
      y: y,
      nb: nb,
      width: 150,
      height: 200,
      isFaceUp: false,
    };
    return card;
  }

  //displays the cards in a grid
  // code inspired by Pippin's grid: https://editor.p5js.org/pippinbarr/sketches/Xq3qsbQWA
  createCardGrid() {
    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++) {
        //selectiing a possible pattern at random
        const patternChoice = Math.floor(
          Math.random() * this.possiblePatterns.length
        );
        //creating cards and pushing them into their array
        // the multiplied value is the distance between the cards
        //the addded value is the position of the entire card grid
        //had to play around with the numbers to find the correct ones....
        let card = this.createCard(
          c * 280 + windowWidth / 3.5,
          r * 280 + windowHeight / 4,
          this.possiblePatterns[patternChoice]
        );
        this.cards.push(card);
        this.possiblePatterns.splice(patternChoice, 1);
        // console.log(this.cards);
        //copy the array
        //PROBLEM:since the array is the exact same the x positions of the cards in the copy have to be changed or we cant see them...
        // arrayCopy(cards,0,copyCards,0,cards.length);
      }
    }

    // console.log(this.possiblePatterns);
  }
  /**
  displays the grid of cards
  */
  displayCardGrid() {
    for (let i = 0; i < this.cards.length; i++) {
      this.drawCardGrid(this.cards[i]);
    }
  }

  /**
  draws the card grid
  */
  drawCardGrid(cardShape) {
    push();
    fill(255);
    rectMode(CENTER);
    rect(cardShape.x, cardShape.y, cardShape.width, cardShape.height);
    pop();
  }

  //inspired by github code
  mousePressed() {
    let numLoops=0;
    for (let i = 0; i < this.cards.length; i++) {
      let card = this.cards[i];
      if (this.isUnderMouse(card, mouseX, mouseY)) {
        // console.log(card.isFaceUp);
        if (this.flippedCards.length < 2 && !card.isFaceUp) {
          this.setIsFaceUp(card, true);
          // console.log(card.isFaceUp);
          this.flippedCards.push(card);
          this.nbValues.push(card.nb);

          if (
            this.flippedCards.length >= 2 &&
            this.nbValues[0] === this.nbValues[1]
          ) {
            console.log("its a match");
            this.flippedCards.splice(0, 2);
            this.nbValues.splice(0, 2);
            this.points++;
            // console.log(this.points);
          } else if (this.flippedCards.length >=2 && this.nbValues[0] !== this.nbValues[1]) {
          // console.log(this.flippedCards);

            // for (const prop in this.flippedCards) {
            //   // console.log(`obj.${prop} = ${this.flippedCards[prop]}`);
            //   console.log(typeof prop);
            //   console.log(prop);
            //
            //   this.flippedCards.splice(prop, 1);
            //   this.nbValues.splice(prop, 1);
            //
            //   this.resetChoiceFailed(this.flippedCards[prop]);
            // }
            const keys = Object.values(this.flippedCards)
              for (const key of keys) {
                console.log(key.isFaceUp);

                 this.resetChoiceFailed(key);

                this.flippedCards.splice(key, 1);
                  this.nbValues.splice(key, 1);

              }

          }
this.delayStartFC = frameCount;
        }
      }
    }
  }

  resetChoiceFailed(obj) {
    console.log("failedmatch");
    if(obj.isFaceUp===true){
      console.log("itsfacrup");
      if (this.itsTime===true) {
    this.setIsFaceUp(obj, false);
    console.log("intheloop");
   }


 }

    }
// // this.flippedCards.splice(obj,1);
    // this.nbValues.splice(obj,1);
    // console.log(this.flippedCards);
    // console.log("failedmatch");



  //TAKEN FORMM GITHUB
  setIsFaceUp(card, isFaceUp) {
    card.isFaceUp = isFaceUp;
  }
  //END TAKEN

  isUnderMouse(card, x, y) {
    // return x >= this.x && x <= this.x + this.width  &&
    // y >= this.y && y <= this.y + this.height
    if (dist(card.x, card.y, x, y) < card.width / 2) {
      return true;
    } else {
      return false;
    }
  }
}
