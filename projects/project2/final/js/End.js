/**
Project 2
Radhika Patel

A state representing the end screen of the program
Displays the text on the screen
 **/
class End extends State {

  constructor() {
    super();

    // Set our property determining the text of the state
    this.endTitleString = "Congrats!You completed the game!";
  }

// displays the text
  draw() {
    super.draw();

    // Set the background.
    background(126,195,175);
    this.displayTitles();
  }


  // Sets style and then display the text in the endTitleString property on the canvas
  displayTitles() {
    push();
    fill(1,156,161);
    // Text settings
    textSize(35);
    textAlign(CENTER, CENTER);
    text(this.endTitleString, width / 2, height / 2);
    pop();

  }

}
