

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

    // this.checkEnding();
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
