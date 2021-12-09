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
    // We should always call the superclass constructor
    // even if it doesn't do anything right now. It might
    // later!
    super();
    createCanvas(windowWidth,windowHeight);

    // Set our property determining the title of the simulation
    this.titleString = "Welcome to the card matchmaking game! Click on the cards to find their respective pair:)";
    this.subTitleString="Click anywhere to start!";
  }

  // draw()
  // Called every frame in the main script. Handles what the title
  // state needs to do each frame, which is display the title.
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

    // Switch to the animation state

    // NOTE how we do not need to check if the state is title,
    // because this class IS the title state

    // NOTE that we switch states by changing what kind of state object is in
    // the currentState variable from the main script. By putting a new Animation
    // state object into it, the program will start using the Animation class to
    // determine how to handle draw() and keyPressed()

    // NOTE that creating a new Animation object like this automatically calls its
    // constructor(), which therefore acts like setup(), called once when the state
    // starts.
    currentState = new FirstLvl();
  }
}
