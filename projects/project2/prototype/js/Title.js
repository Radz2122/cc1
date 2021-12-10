// Title
// A state representing the Title of our program
// Displays the title on the screen and switches to
// Animation on a key press.

// NOTE: We extend the State class to guarantee this class will have
// the key methods that we call in the main program,
// draw() and keyPressed() in this case.
class Title extends State {

  // constructor()
  // Acts as the setup() of the state, called when the
  // state is created. Sets the title of the program.
  constructor() {
    // call the superclass constructor
    super();
    createCanvas(windowWidth,windowHeight);

    // Set our property determining the title of the simulation
    this.titleString = "Welcome to the card matchmaking game! Click on the cards to find their respective pair:)";
    this.subTitleString="Click anywhere to start!";
  }

  // Called every frame in the main script. Handles what the title
  // state needs to do each frame, which is display the title.
  draw() {
    //  call the super() version of the method
    super.draw();

    // Set the background.
    background(0);

    // display the  title text.
    this.displayTitles();
  }

  // displayTitle()
  // Sets style and then display the title in the titleString property on the canvas
  displayTitles() {
    push();
    fill(255);
    // Text settings
    textSize(35);
    textAlign(CENTER, CENTER);
    text(this.titleString, width / 2, height / 2);
    pop();
    push();
    fill(255);
    // Text settings
    textSize(25);
    textAlign(CENTER, CENTER);
    text(this.subTitleString, width / 2, (height /2)+200);
    pop();

  }

  // keyPressed()
  // Called by the main script when a key is pressed! Switches to the Animation state
  mousePressed() {
    // Always call the superclass version of the method in case it does something or will
    super.mousePressed();
    // Switch to the FirstLvl state
    currentState = new FirstLvl();
  }
}
