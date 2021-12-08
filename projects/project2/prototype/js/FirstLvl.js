/**
Project 2
Radhika Patel

This is my final project, a matchmaking memory game with a twist
*/

class FirstLvl extends State{


constructor(){

  super();
  //starts off the game with the game FOR NOW
  // let state = `game`;
  //array that contains the first set of cards
   this.cards = [];

  // How many rows and columns in the grid?
  this.rows = 3;
  this.cols = 4;

  this.patternChoice;
  this.possiblePatterns=["pattern1","pattern2","pattern3","pattern4","pattern5","pattern6","pattern1","pattern2","pattern3","pattern4","pattern5","pattern6"];
  this.flippedCards=[];
  this.nbValues=[];
  this.points=0;


  createCanvas(windowWidth, windowHeight);
  this.createCardGrid();
}




  /**
  Description of setup
  */
  // function setup() {


  // }


  /**
  Description of draw()
  */
   draw() {
     super.draw();
    background(0);
    this.displayCardGrid();

    for (let i = 0; i < this.cards.length; i++) {
      let card= this.cards[i];
      // card.display();
      //the swithc detects which pattern to display
      switch(card.nb){
        case "pattern1":
        this.pattern1(card);
          //call the function that produces pattern 1
          //TEST
          // card.pattern1();
          // const randomCard = Math.floor(Math.random() * cards.length);
          // new Firstdesign(cards[randomCard].x,cards[randomCard].y,cards[randomCard].nb);
          // cards[randomCard].display();
          // cards.splice(randomCard,1);
          // console.log(cards[randomCard].nb);
          break;
        case "pattern2":
          //call the function that produces pattern 2
          // new Firstdesign()
          // card.pattern2();
          break;
        case "pattern3":
          //call the function that produces pattern 3
          break;
        case "pattern4":
          //call the function that produces pattern 4
          break;
        case "pattern5":
          //call the function that produces pattern 5
          break;
        case "pattern6":
          //call the function that produces pattern 6
          break;
      }
    }
  }

  //displays the game assets
   game(){


  }
  pattern1(card){
    if(card.isFaceUp===true){
      push();
      fill(34,56,34);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      fill(0,56,34);
      rect(card.x, card.y, card.width/2, card.height/2);
      pop();
    }
    else{
      push();
      fill(34,34,34);
      rectMode(CENTER);
      rect(card.x, card.y, card.width, card.height);
      pop();
    }

  }

   createCard(x,y,nb) {
    let card = {
      x: x,
      y: y,
      nb:nb,
      width:150,
      height:200,
      isFaceUp:false
    };
    return card;
  }

  //displays the cards in a grid
  // code inspired by Pippin's grid: https://editor.p5js.org/pippinbarr/sketches/Xq3qsbQWA
   createCardGrid(){
    for (let c=0; c < this.cols; c++) {
      for (let r =0 ;r< this.rows ;r++) {
        //selectiing a possible pattern at random
        const patternChoice = Math.floor(Math.random() * this.possiblePatterns.length);
        //creating cards and pushing them into their array
        // the multiplied value is the distance between the cards
        //the addded value is the position of the entire card grid
        //had to play around with the numbers to find the correct ones....
        let card = this.createCard(c * 280 + windowWidth/3.5, r * 280 + windowHeight/4,this.possiblePatterns[patternChoice]);
        this.cards.push(card);
        this.possiblePatterns.splice(patternChoice,1);
          // console.log(this.cards);
        //copy the array
        //PROBLEM:since the array is the exact same the x positions of the cards in the copy have to be changed or we cant see them...
        // arrayCopy(cards,0,copyCards,0,cards.length);

      }
    }

      // console.log(this.possiblePatterns);
  }
  /**
  displays the grid of cards
  */
   displayCardGrid() {
    for (let i = 0; i < this.cards.length; i++) {
      this.drawCardGrid(this.cards[i]);
    }
  }

  /**
  draws the card grid
  */
   drawCardGrid(cardShape) {
    push();
    fill(255);
    rectMode(CENTER);
    rect(cardShape.x, cardShape.y, cardShape.width, cardShape.height);
    pop();
  }

  //inspired by github code
   mousePressed(){
    for (let i = 0 ;i < this.cards.length; i++) {
      let card= this.cards[i];
      if (this.isUnderMouse(card,mouseX, mouseY)) {

        if (this.flippedCards.length < 2 && !card.isFaceUp) {

          this.setIsFaceUp(card,true);
          this.flippedCards.push(card);
          this.nbValues.push(card.nb);
          if (this.flippedCards.length>=2 && this.nbValues[0]===this.nbValues[1]){
              console.log("its a match");
            this.flippedCards.splice(0,2);
            this.points++;
            console.log(this.flippedCards);
            }
            else{
                   for (const prop in this.flippedCards) {
                // console.log(`obj.${prop} = ${this.flippedCards[prop]}`);
                setTimeout(this.resetChoiceFailed(this.flippedCards[prop]),2000);
              }

            }
        }
      }
    }

  }



   resetChoiceFailed(obj){
     // console.log(obj.isFaceUp);

//      for (const prop in this.flippedCards) {
//   if (this.flippedCards.hasOwnProperty(prop)) {
//     console.log(`obj.${prop} = ${this.flippedCards[prop]}`);
//   }
// }

//      for (const prop in this.flippedCards) {
//   console.log(`obj.${prop} = ${this.flippedCards[prop]}`);
// }
     console.log("failedmatch");

    //   let card= this.flippedCards[i];
    //   this.setIsFaceUp(card,false);
    // }

      // this.flippedCards.splice(0,2);
  }

  //  resetChoiceMatched(){
  //     this.flippedCards.splice(0,2);
  //     this.points++;
  //     console.log(this.points);
  // }

  //TAKEN FORMM GITHUB
  setIsFaceUp(card,isFaceUp) {
    card.isFaceUp = isFaceUp
  }
//END TAKEN

  isUnderMouse(card,x, y) {
    // return x >= this.x && x <= this.x + this.width  &&
    // y >= this.y && y <= this.y + this.height
    if (dist(card.x, card.y, x, y) < card.width/2) {
     return true;
   } else {
     return false;
   }
  }

}