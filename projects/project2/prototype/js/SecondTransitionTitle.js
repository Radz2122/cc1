/**
Project 2
Radhika Patel

A state representing the second transition screen of the program
Displays the text on the screen and switches the next level on mouseClick
 **/
class SecondTransitionTitle extends State {

  constructor() {
    super();

    // Set our property determining the text of the state
    this.transitionTitleString = "Another one!! One more to go...";
  }

// displays the text
  draw() {
    super.draw();

    // Set the background
    background(126,195,175);
    this.displayTitles();
  }

  // displayTitle()
  // Sets style and then display the text in the transitionTitleString property on the canvas
  displayTitles() {
    push();
    fill(1,156,161);
    // Text settings
    textSize(35);
    textAlign(CENTER, CENTER);
    text(this.transitionTitleString, width / 2, height / 2);
    pop();

  }

// Switches to the next level state
  mousePressed() {
    super.mousePressed();
    currentState = new ThirdLvl();
  }
}
