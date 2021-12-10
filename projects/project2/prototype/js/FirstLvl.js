/**
Project 2
Radhika Patel

Creates the first level of the game by generating a card grid, shuffling the cards and
adding a design/pattern on each card (each generated by their own function). It also verifies if the pairs made by the player are valid
*/

class FirstLvl extends State {
  constructor() {
    super();

    //array that contains the set of cards
    this.cards = [];
    //the time given before the fllipped cards turn back after a player misses a match
    this.delay = 2000;
    //dictates if the player can turn another cards
    //they can only turn a card after the other 2 they selected turn back when they are mismatched
    //or if the 2 cards selected are a match
    this.canTurnCard = true;
    // amount rows and columns in the card grid
    this.rows = 3;
    this.cols = 4;
    //contains the pattern/design a card will receive when the grid is created
    this.patternChoice;
    //the list of possible patterns/designs on the cards X2 to pair them
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

    //will contain the currently flipped cards
    this.flippedCards = [];

    //contains the name of the pattern that was selected to compare them easily
    this.patternName = [];
    //points gotten by the player
    this.points = 0;
    //text on top of card grid
    this.text = "Make pairs by clicking on the cards!";
    //create the canvas
    createCanvas(windowWidth, windowHeight);
    //creates the grid of cards
    this.createCardGrid();
  }
  /**
  Generates a background in game with the sound file, displays the grid of cards, applies the patterns/designs to the cards
  and checks the amount of points gathered by the player to switch to the next level if they have enough
  */
  draw() {
    //call the super class
    super.draw();
    //background color
    background(126,195,175);
    // background deisgn inspired by: https://pippinbarr.github.io/cc/1/topics/sound/reintroducing-p5-sound.html#getpeaks
    //was done with the sound file
    push();
    strokeWeight(45);
    stroke(240,131,134,100);
    // Run through every peak in the array
    for (let i = 0; i < peaks.length; i++) {
      // Get the current peak data
      let peak = peaks[i];
      // Map the data to a y position. The peak data is between -1 and 1
      // but we want to display it on the canvas, so we map to a number
      // between 0 and height
      let y = map(peak, -1, 1, 0, height);
      // Draw a line from the center of the canvas to the mapped peak value
      line(i, height / 2, i, y);
    }
    pop();
    //display text
    push();
    fill(1,156,161);
    // Text settings
    textSize(35);
    textAlign(CENTER, CENTER);
    text(this.text, width / 2, height /12);
    pop();
    //display the grid of cards
    this.displayCardGrid();
    //verify the amount of points gotten by the player
    this.checkEnding();

    //assign a pattern/design to each card generated from the grid
    for (let i = 0; i < this.cards.length; i++) {
      let card = this.cards[i];
      //the switch detects which pattern to display
      switch (card.patternNum) {
        case "pattern1":
          //call the function that produces pattern 1
          this.pattern1(card);
          break;
        case "pattern2":
        //call the function that produces pattern 2
          this.pattern2(card);
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

//function of the back of the card thats called if it isnt clicked on
  cardBack(card){
    push();
    fill(0,158,159);
    rectMode(CENTER);
    rect(card.x, card.y, card.width, card.height);
    pop();
  }

  /**
    creates the first pattern/design that will end up on 2 random cards

    -This pattern creates a bunch of squares that rotate and create an effect
    thanks to the blendmode
  **/
  pattern1(card) {
    noStroke();
    if (card.isFaceUp === true) {
      //create the base rectangle of the card
      push();
        fill(132,205,202);
        rectMode(CENTER);
        rect(card.x, card.y, card.width, card.height);
        //create a second rectangle in the center of the card
        blendMode(DIFFERENCE);
        fill(242,130,133);
        rect(card.x, card.y, card.width / 2, card.height / 2);
        pop();

        push();
        // Set difference blend mode
        blendMode(DIFFERENCE);

        // get center of card
        const x = card.x;
        const y = card.y;

        // Fraction of screen dim
        const dim = min(card.width / 2, card.height / 2);
        const size = dim * 0.5;

        //create first rotating square
        push();
        blendMode(DIFFERENCE);
        rectMode(CENTER);
        translate(x, y);
        rotate(frameCount * 0.02);
        rect(card.width / 6, card.height / 6, size / 2, size / 2);
        pop();
        //create second rotating square
        push();
        blendMode(DIFFERENCE);
        rectMode(CENTER);
        translate(x, y);
        rotate(-frameCount * 0.02);
        rect(card.width / 6, card.height / 6, size / 2, size / 2);
        pop();
        //create third rotating square
        push();
        blendMode(DIFFERENCE);
        rectMode(CENTER);
        translate(x, y);
        rotate(-frameCount * 0.015);
        rect(card.width / 6, card.height / 6, size, size);
        pop();

        //create fourth rotating square
        push();
        blendMode(DIFFERENCE);
        rectMode(CENTER);
        translate(x, y);
        rotate(frameCount * 0.015);
        rect(card.width / 6, card.height / 6, size, size);
        pop();
      pop();
    } else {
      //if the card isnt flipped set it back to its default state (a solid color)
        this.cardBack(card);
    }
  }

  /**
    creates the second pattern/design that will end up on 2 random cards
    -This design is inspired by: https://editor.p5js.org/pippinbarr/sketches/B09AFYsGQ
    It creates a firework-like shape with like rotating around the same axis
  **/
  pattern2(card) {
    if (card.isFaceUp === true) {
      push();
      //create the base rectangle of the card
      fill(132,205,202);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);

      //lines projecting from the center in a circle?
      let lines = 50;

      // Translate to the centre of the card for rotation purposes
      translate(card.x, card.y);
      // Loop through all the lines we need to draw
      for (let i = 0; i < lines; i++) {
        // Rotate by one increment based on the number of lines there are
        rotate(TWO_PI / lines);

        // Calculate the length of the line randomly
        let length = random(2, card.width / 2);
        //stroke weight
        strokeWeight(1.5);
        // Draw the line
        stroke(242,130,133);
        line(0, 0, length, 3);
      }
      pop();
      //is called whern the card goes back to its default state
    } else {
      this.cardBack(card);
    }
  }

  /**
    creates the third pattern/design that will end up on 2 random cards
    -This design is inspired by:https://glitch.com/edit/#!/p5-example-xor?path=sketch.js%3A17%3A0
    It creates 3 shapes overlapping with a unique blend mode to give it a visual effect
    The ellipse os also animated.
  **/

  pattern3(card) {
    if (card.isFaceUp === true) {
      push();
        //create base rectangle for the card
        fill(132,205,202);
        rectMode(CENTER);
        rect(card.x, card.y, card.width, card.height);

        // Set difference blend mode
        blendMode(DIFFERENCE);
        //remove stroke
        noStroke();

        // Center of card
        const x = card.x;
        const y = card.y;

        // Fraction of screen dim
        const dim = min(card.width, card.height);
        const size = dim * 0.5;

        //creates rectangle on card
        fill(0,156,159);
        rectMode(CENTER);
        rect(x, y, size, size);

        // Creates a circle that rotates aorund the shapes
        push();
        translate(x, y);
        rotate(frameCount * 0.025);
        fill(132,205,202);
        ellipse(card.width / 5, card.height / 5, size / 2, size / 2);
        pop();

        // Creates a triangle
        translate(-size / 4, -size / 4);
        triangle(
          x,
          y - size / 2,
          x + size / 2,
          y + size / 2,
          x - size / 2,
          y + size / 2
        );

      pop();
    } else {
      //is called whern the card goes back to its default state
      this.cardBack(card);
    }
  }

  /**
    creates the fourth pattern/design that will end up on 2 random cards
    - In this design, I wanted to use an image
      image source= https://www.pinterest.ca/pin/553520610445431813/
  **/

  pattern4(card) {
    if (card.isFaceUp === true) {
      push();
      fill(34, 56, 34);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      pop();
      push();
      imageMode(CENTER);
      image(img, card.x, card.y, card.width, card.height);
      pop();
    } else {
      //is called whern the card goes back to its default state
      this.cardBack(card);
    }
  }

  /**
    creates the fifth pattern/design that will end up on 2 random cards
    -In this design, i wanted to use text
    Code inspired by: https://happycoding.io/examples/p5js/input/grouchy-face
  **/
  pattern5(card) {
    if (card.isFaceUp === true) {
      push();
        //create the base rectangle for the card
        fill(132,205,202);
        rectMode(CENTER);
        rect(card.x, card.y, card.width, card.height);
        //create the text
        push();
        textSize(60);
        textAlign(CENTER, CENTER);
        //apply random translation to card to make it shake
        text("😠", card.x + random(-1, 1), card.y + random(-1, 1));
        pop();
      pop();
    } else {
      //is called whern the card goes back to its default state
      this.cardBack(card);
    }
  }

  /**
    creates the sixth pattern/design that will end up on 2 random cards
    -In this design i wanted to explore the possibilities with the different blendmodes
    It creates a spinning flower that changes colors
  **/
  pattern6(card) {
    //contains the different blendmodes
    let blendModes = [];
    if (card.isFaceUp === true) {
      push();
      //create the base rectangle for the card
      fill(132,205,202);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      //create a second rectangle in the card
      fill(242,130,133);
      rect(card.x, card.y, card.width / 2, card.height / 2);
      pop();

      // create a flower in the middle of the card
      push();
        translate(card.x, card.y);
        noStroke();
        //insert possible blendmodes in an array
        blendModes = [DIFFERENCE, MULTIPLY, BLEND];
        //select a random blendmode
        let randomBlendMode =
          blendModes[Math.floor(Math.random() * blendModes.length)];
          //apply random blendmode
        blendMode(randomBlendMode);
        //create flower petals
        for (let i = 0; i < 10; i++) {
          rotate(frameCount * 0.015);
          fill(1,156,161);
          ellipse(card.width / 8, card.height / 8, 10, 50);
          //rotate petals
          rotate(PI / 8);
        }
      pop();
    } else {
      //is called whern the card goes back to its default state
      this.cardBack(card);
    }
  }
/**
  object containing the cards propreties, returns a card
**/
  createCard(x, y, patternNum) {
    let card = {
      x: x,
      y: y,
      patternNum: patternNum,// the name/number of a pattern/design
      width: 150,
      height: 200,
      isFaceUp: false,
    };
    return card;
  }

  /**
    displays the cards in a grid
   code inspired by Pippin's grid: https://editor.p5js.org/pippinbarr/sketches/Xq3qsbQWA
  **/
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
        let card = this.createCard(
          c * 280 + windowWidth / 3.5,
          r * 280 + windowHeight / 4,
          //assign a pattern/design to a card
          this.possiblePatterns[patternChoice]
        );
        //insert card into the cards array
        this.cards.push(card);
        //remove the patterns form the choices avaible in its array
        this.possiblePatterns.splice(patternChoice, 1);
      }
    }
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

  /**
    inspired by github code :https://github.com/miriamtocino/p5-js-memory-game/blob/master/game.js
    This was inpired by the github code I found, the logic that is... because I changed most of it to fit my code:)
    Quick rundown of what it does:
    -Loops through every card in the cards array
    -Verifies if any card is under the mouse, if it was clicked
    -If a card was clicked, its added to the flippedCards array, it is set face up, and the pattern/design name is registered in a seperate array
    -Once thats all done, it chekcs if the pattern names MATCH. If they do, the player can turn their next card,
    the card and the pattern names are removed form their respective arrays and the player gains a point
    -If it DOES NOT MATCH, the player cannot turn another card until the selected cards are flipped back to their default look,
    and once again the card and the pattern names are removed from their respective arrays.
  **/
  mousePressed() {
    //loop through the cards
    for (let i = 0; i < this.cards.length; i++) {
      let card = this.cards[i];
      //chekc if player clicked on a card
      if (this.isUnderMouse(card, mouseX, mouseY)) {
        //verifies if the card clicked can be turned
        if (
          this.flippedCards.length < 2 &&
          !card.isFaceUp &&
          this.canTurnCard
        ) {
          //flip the card
          this.setIsFaceUp(card, true);
          //add it to the array of flipped cards
          this.flippedCards.push(card);
          //add its pattern to a seperate array
          this.patternName.push(card.patternNum);
          //verifies if the cards clicked match
          if (
            this.flippedCards.length >= 2 &&
            this.patternName[0] === this.patternName[1]
          ) {
            //if they match:
            //the player can turn their next cards
            this.canTurnCard = true;
            //the cards and the pattern name are removed from their arrays
            this.flippedCards.splice(0, 2);
            this.patternName.splice(0, 2);
            //the player gets a point
            this.points++;
          }
          //verifies if the cards clicked match
          else if (
            this.flippedCards.length >= 2 &&
            this.patternName[0] !== this.patternName[1]
          ) {
            //if they DON'T match:
            //the player cannot turn another card until the current ones are flipped back
            this.canTurnCard = false;
            //loop through the objects in flippedCards array
            const keys = Object.values(this.flippedCards);
            for (const key of keys) {
              //call the rest funciton after a delay so the player has the time to look at the card design
              setTimeout(() => {
                this.resetChoiceFailed(key);
              }, this.delay);
              //the cards and the pattern name are removed from their arrays
              this.flippedCards.splice(key, 1);
              this.patternName.splice(key, 1);
            }
          }
        }
      }
    }
  }

/**
  calls the function to flip the card bakc to its default state in its Object
  also allows the player to turn another card
**/
  resetChoiceFailed(obj) {
    this.canTurnCard = true;
    if (obj.isFaceUp === true) {
      this.setIsFaceUp(obj, false);
    }
  }

  /**
    inspired by the github code used for the mouseClick: https://github.com/miriamtocino/p5-js-memory-game/blob/master/game.js
    flips the card depending on the argument passed
  **/
  setIsFaceUp(card, isFaceUp) {
    card.isFaceUp = isFaceUp;
  }

/**
  Verifies if a card is under the mouse, so if the player clicked on it
**/
  isUnderMouse(card, x, y) {
    if (dist(card.x, card.y, x, y) < card.width / 2) {
      return true;
    } else {
      return false;
    }
  }
/**
  Verifies the amount of points earned by the player to switch stages
**/
  checkEnding() {
    //CHANGE!!!!!!!!
    if (this.points >0) {
      currentState = new TransitionTitle();
    }
  }
}
