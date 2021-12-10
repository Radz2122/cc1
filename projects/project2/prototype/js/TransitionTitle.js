/**
Project 2
Radhika Patel

A state representing the transition screen of the program
Displays the text on the screen and switches the next level on mouseClick
 **/
class TransitionTitle extends State {

// Sets the text of the state
  constructor() {
    // We should always call the superclass constructor
    // even if it doesn't do anything right now. It might
    // later!
    super();

    // Set our property determining the text of the state
    this.transitionTitleString = "You completed the level! Goodjob, on to the next one...";
  }

// displays the text
  draw() {
    // Always call the super() version of the method if there is one
    // just in case it does something important.
    super.draw();

    // Set the background. We could do this in State if we knew that
    // we wanted all states to have a black background, but it probably
    // makes more sense to have this set per state like this.
    background(0);

    // Overkill perhaps, but we have a separate method to just display
    // the actual title text. More methods/functions is generally better.
    this.displayTitles();
  }

  // displayTitle()
  // Sets style and then display the text in the transitionTitleString property on the canvas
  displayTitles() {
    push();
    fill(255);
    // Text settings
    textSize(35);
    textAlign(CENTER, CENTER);
    text(this.transitionTitleString, width / 2, height / 2);
    pop();

  }

// Switches to the next level state
  mousePressed() {
    super.mousePressed();
    currentState = new SecondLvl();
  }
}
