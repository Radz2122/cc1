/**
Project 2
Radhika Patel

Creates the second level of the game by changing the possible card patterns and making them more similar.
*/

class SecondLvl extends FirstLvl {
  constructor() {
    super();
  }
  /**
  Generates a background in game with the sound file, displays the grid of cards, applies the patterns/designs to the cards
  and checks the amount of points gathered by the player to switch to the next level if they have enough
  */
  draw() {
    // Always call the super() version of the method if there is one
    // just in case it does something important.
    super.draw();
    push();
    stroke(0,158,159);
    pop();
  }

  /**
    duplicates the first pattern/design that will end up on 2 random cards

    -This pattern creates a bunch of squares that rotate and create an effect
    thanks to the blendmode
  **/
  pattern2(card) {
    noStroke();
    if (card.isFaceUp === true) {
      //create the base rectangle of the card
      push();
        fill(132,205,202);
        rectMode(CENTER);
        rect(card.x, card.y, card.width, card.height);
        //create a second rectangle in the center of the card
        blendMode(BLEND);
        fill(242,130,133);
        rect(card.x, card.y, card.width / 2, card.height / 2);
        pop();

        push();
        // Set difference blend mode
        blendMode(BLEND);

        // get center of card
        const x = card.x;
        const y = card.y;

        // Fraction of screen dim
        const dim = min(card.width / 2, card.height / 2);
        const size = dim * 0.5;

        //create first rotating square
        push();
        blendMode(BLEND);
        rectMode(CENTER);
        translate(x, y);
        rotate(frameCount * 0.02);
        rect(card.width / 6, card.height / 6, size / 2, size / 2);
        pop();
        //create second rotating square
        push();
        blendMode(BLEND);
        rectMode(CENTER);
        translate(x, y);
        rotate(-frameCount * 0.02);
        rect(card.width / 6, card.height / 6, size / 2, size / 2);
        pop();
        //create third rotating square
        push();
        blendMode(BLEND);
        rectMode(CENTER);
        translate(x, y);
        rotate(-frameCount * 0.015);
        rect(card.width / 6, card.height / 6, size, size);
        pop();

        //create fourth rotating square
        push();
        blendMode(BLEND);
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
    duplicates the third pattern/design that will end up on 2 random cards
    -This design is inspired by:https://glitch.com/edit/#!/p5-example-xor?path=sketch.js%3A17%3A0
    It creates 3 shapes overlapping with a unique blend mode to give it a visual effect
    The ellipse os also animated.
  **/
  pattern4(card) {
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
        rotate(-frameCount * 0.025);
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
    duplicates the sixth pattern/design that will end up on 2 random cards
    -In this design i wanted to explore the possibilities with the different blendmodes
    It creates a spinning flower that changes colors
  **/
  pattern5(card) {
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
          rotate(-frameCount * 0.015);
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
    Verifies the amount of points earned by the player to switch stages
  **/
    checkEnding() {
      if (this.points >=6) {
        currentState = new SecondTransitionTitle();
      }
    }

}
