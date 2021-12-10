/**
Project 2
Radhika Patel

Creates the last level of the game by changing the possible card patterns and making them more similar.
*/

class ThirdLvl extends SecondLvl {
  constructor() {
    super();
  }
  /**
  Generates a background in game with the sound file, displays the grid of cards, applies the patterns/designs to the cards
  and checks the amount of points gathered by the player to switch to the end if they have enough
  */
  draw() {

    super.draw();
  }

  /**
    duplicates the third pattern/design that will end up on 2 random cards
    -This design is inspired by:https://glitch.com/edit/#!/p5-example-xor?path=sketch.js%3A17%3A0
    It creates 3 shapes overlapping with a unique blend mode to give it a visual effect
    The ellipse os also animated.
  **/
  pattern2(card) {
    noStroke();
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
        rect(x, y, size/2, size/2);

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
    duplicates the third pattern/design that will end up on 2 random cards
    -This design is inspired by:https://glitch.com/edit/#!/p5-example-xor?path=sketch.js%3A17%3A0
    It creates 3 shapes overlapping with a unique blend mode to give it a visual effect
    The ellipse os also animated.
  **/
  pattern5(card) {
    //contains the different blendmodes
    let blendModes = [];
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
        y - size / 4,
        x + size / 4,
        y + size / 4,
        x - size / 4,
        y + size / 4
      );

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
        currentState = new End();
      }
    }

}
