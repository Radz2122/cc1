/**
Project 2
Radhika Patel

Creates the second level of the game by changing the possible card patterns and mking them more similar.
*/


class SecondLvl extends FirstLvl {

  // Acts as the setup() of the state, called when the
  // state is created. Creates a circle object and sets its
  // velocity.
  constructor() {
    // We should always call the superclass constructor
    // even if it doesn't do anything right now. It might
    // later!
    super();

  }

  // draw()
  // Called every frame in the main script. Handles what the title
  // state needs to do each frame. It moves and displays the circle
  // and checks if it has reached the right hand side.
  draw() {
    // Always call the super() version of the method if there is one
    // just in case it does something important.
    super.draw();
    push();
    stroke(0,158,159);
    pop();
  }
  //change the color of the back of the card for the second level
  cardBack(card){
    push();
    fill(0,158,159);
    rectMode(CENTER);
    rect(card.x, card.y, card.width, card.height);
    pop();
  }

  // display()
  // Displays the circle as an ellipse on the canvas
  display() {

  }

  // checkEnding()
  // Checks if the circle has moved past the right hand side
  // of the canvas and changes to the Ending state if it has.
  checkEnding() {


      // currentState = new Ending();

  }

  // NO keyPressed() needed down here, it is handled by the State version
}
