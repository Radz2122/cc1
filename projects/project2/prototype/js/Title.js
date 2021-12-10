/**
Project 2
Radhika Patel

A state representing the Title of the program
Displays the title on the screen and switches the first level on mouseClick
 **/

class Title extends State {
  constructor() {
    // call the superclass constructor
    super();
    createCanvas(windowWidth,windowHeight);

    // Set our property determining the title of the simulation
    this.titleString = "Welcome to the card matchmaking game! Click on the cards to make pairs :)";
    this.subTitleString="Click anywhere to start!";
  }

  // displays the titles
  draw() {
    //  call the super() version of the method
    super.draw();

    // Set the background.
    background(126,195,175);

    // display the  title text.
    this.displayTitles();
  }


  // Sets style and then display the title in the titleString and subTitleString properties on the canvas
  displayTitles() {
    push();
    fill(1,156,161);
    // Text settings
    textSize(35);
    textAlign(CENTER, CENTER);
    text(this.titleString, width / 2, height / 2);
    pop();
    push();
    fill(1,156,161);
    // Text settings
    textSize(25);
    textAlign(CENTER, CENTER);
    text(this.subTitleString, width / 2, (height /2)+200);
    pop();

  }


  //Switches to the FirstLvl state
  mousePressed() {
    super.mousePressed();
    currentState = new FirstLvl();
  }
}
