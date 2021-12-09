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

    this.cards = [];
    this.delay = 2000;
    this.canTurnCard = true;
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

  /**
  Description of draw()
  */
  draw() {
    super.draw();
    background(0);

    // background inspired by: https://pippinbarr.github.io/cc/1/topics/sound/reintroducing-p5-sound.html#getpeaks
    push();
    stroke(20, 20, 60, 100);
    // Run through every peak in the array
    for (let i = 0; i < peaks.length; i++) {
      // Get the current peak data
      let peak = peaks[i];
      // Map the data to a y position. The peak data is between -1 and 1
      // but we want to display it on the canvas, so we map to a number
      // between 0 and height
      let y = map(peak, -1, 1, 0, height);
      // Draw a line from the center of the canvas to the mapped peak value
      // with an x set to "i" because we're going through an array the
      // width of the canvas...
      // translate(card.x, card.y);
      line(i, height / 2, i, y);
    }
    pop();
    this.displayCardGrid();
    this.checkEnding();
    for (let i = 0; i < this.cards.length; i++) {
      let card = this.cards[i];
      // card.display();
      //the swithc detects which pattern to display
      switch (card.nb) {
        case "pattern1":
          this.pattern1(card);
          //call the function that produces pattern 1
          break;
        case "pattern2":
          this.pattern2(card);
          //call the function that produces pattern 2
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

//the back of the card thats called if it isnt clicked on
  cardBack(card){
    push();
    fill(80, 50, 44);
    rectMode(CENTER);
    rect(card.x, card.y, card.width, card.height);
    pop();
  }
  //REMOVE ALL ELESE FORM PATTERNS AND PUT INTO ONE FUCNTION
  pattern1(card) {
    noStroke();
    if (card.isFaceUp === true) {
      push();
      fill(34, 56, 34);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      blendMode(DIFFERENCE);
      fill(0, 56, 34);
      rect(card.x, card.y, card.width / 2, card.height / 2);
      pop();
      push();
      blendMode(BLEND);
      // Set foreground as white
      fill(255);

      // Set x-or / difference blend mode
      blendMode(DIFFERENCE);

      // Center of card
      const x = card.x;
      const y = card.y;

      // Fraction of screen dim
      const dim = min(card.width / 2, card.height / 2);
      const size = dim * 0.5;

      push();
      blendMode(DIFFERENCE);
      rectMode(CENTER);
      translate(x, y);
      rotate(frameCount * 0.02);

      rect(card.width / 6, card.height / 6, size / 2, size / 2);
      pop();
      push();
      blendMode(DIFFERENCE);
      rectMode(CENTER);
      translate(x, y);
      rotate(-frameCount * 0.02);
      // ellipse(,, size / 2, size / 2);
      rect(card.width / 6, card.height / 6, size / 2, size / 2);
      pop();
      push();
      blendMode(DIFFERENCE);
      rectMode(CENTER);
      translate(x, y);
      rotate(-frameCount * 0.015);
      // ellipse(,, size / 2, size / 2);
      rect(card.width / 6, card.height / 6, size, size);
      pop();
      push();
      blendMode(DIFFERENCE);
      rectMode(CENTER);
      translate(x, y);
      rotate(frameCount * 0.015);
      // ellipse(,, size / 2, size / 2);
      rect(card.width / 6, card.height / 6, size, size);
      pop();

      pop();
    } else {
      this.cardBack(card);
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
      this.cardBack(card);
    }
  }

  //inspired by https://glitch.com/edit/#!/p5-example-xor?path=sketch.js%3A17%3A0
  pattern3(card) {
    if (card.isFaceUp === true) {
      push();
      fill(34, 56, 34);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);

      blendMode(BLEND);
      // Set foreground as white
      fill(255);

      // Set x-or / difference blend mode
      blendMode(DIFFERENCE);

      noStroke();
      // Center of card
      const x = card.x;
      const y = card.y;

      // Fraction of screen dim
      const dim = min(card.width, card.height);
      const size = dim * 0.5;

      rectMode(CENTER);
      rect(x, y, size, size);

      // Create a circle slightly offset down and right
      push();
      translate(x, y);
      rotate(frameCount * 0.025);
      ellipse(card.width / 5, card.height / 5, size / 2, size / 2);
      pop();

      // Create a triangle slightly offset up and left
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
      this.cardBack(card);
    }
  }
  //just a random cute artwork of a dog:)
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
      this.cardBack(card);
    }
  }
  pattern5(card) {
    //SOURCE: https://happycoding.io/examples/p5js/input/grouchy-face

    if (card.isFaceUp === true) {
      push();
      fill(34, 56, 34);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      push();
      textSize(60);
      textAlign(CENTER, CENTER);
      text("😠", card.x + random(-1, 1), card.y + random(-1, 1));
      pop();
      pop();
    } else {
      this.cardBack(card);
    }
  }
  //i tested a few things to create this effect
  pattern6(card) {
    let blendModes = [];
    if (card.isFaceUp === true) {
      push();
      fill(34, 56, 34);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      fill(0, 56, 34);
      rect(card.x, card.y, card.width / 2, card.height / 2);
      pop();
      push();
      translate(card.x, card.y);
      noStroke();
      blendModes = [DIFFERENCE, MULTIPLY, BLEND];
      let randomBlendMode =
        blendModes[Math.floor(Math.random() * blendModes.length)];
      blendMode(randomBlendMode);
      for (let i = 0; i < 10; i++) {
        // translate(x, y);
        rotate(frameCount * 0.015);
        fill(250, 34, 34);
        ellipse(card.width / 8, card.height / 8, 10, 50);
        rotate(PI / 8);
      }
      pop();
    } else {
      this.cardBack(card);
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

  //inspired by github code :https://github.com/miriamtocino/p5-js-memory-game/blob/master/game.js
  mousePressed() {
    for (let i = 0; i < this.cards.length; i++) {
      let card = this.cards[i];
      if (this.isUnderMouse(card, mouseX, mouseY)) {
        // console.log(card.isFaceUp);
        if (
          this.flippedCards.length < 2 &&
          !card.isFaceUp &&
          this.canTurnCard
        ) {
          this.setIsFaceUp(card, true);
          // console.log(card.isFaceUp);
          this.flippedCards.push(card);
          this.nbValues.push(card.nb);

          if (
            this.flippedCards.length >= 2 &&
            this.nbValues[0] === this.nbValues[1]
          ) {
            console.log("its a match");
            this.canTurnCard = true;
            this.flippedCards.splice(0, 2);
            this.nbValues.splice(0, 2);
            this.points++;
            // console.log(this.points);
          } else if (
            this.flippedCards.length >= 2 &&
            this.nbValues[0] !== this.nbValues[1]
          ) {
            this.canTurnCard = false;
            const keys = Object.values(this.flippedCards);
            for (const key of keys) {
              console.log(key.isFaceUp);
              setTimeout(() => {
                this.resetChoiceFailed(key);
              }, this.delay);

              this.flippedCards.splice(key, 1);
              this.nbValues.splice(key, 1);
            }
          }
        }
      }
    }
  }

  resetChoiceFailed(obj) {
    this.canTurnCard = true;
    // console.log("failedmatch");
    if (obj.isFaceUp === true) {
      this.setIsFaceUp(obj, false);
    }
  }

  //TAKEN FORMM GITHUB: https://github.com/miriamtocino/p5-js-memory-game/blob/master/game.js
  setIsFaceUp(card, isFaceUp) {
    card.isFaceUp = isFaceUp;
  }

  isUnderMouse(card, x, y) {
    // return x >= this.x && x <= this.x + this.width  &&
    // y >= this.y && y <= this.y + this.height
    if (dist(card.x, card.y, x, y) < card.width / 2) {
      return true;
    } else {
      return false;
    }
  }

  checkEnding() {
    if (this.points > 3) {
      currentState = new SecondLvl();
    }
  }
}
