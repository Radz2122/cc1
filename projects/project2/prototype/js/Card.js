class Card{
  constructor(x,y,nb){
    this.x=x;
    this.y=y;
    this.nb=nb;
    this.width=150;
    this.height=200;
    this.isFaceUp=false;
  }
//for now i did a display function  and a copy with its offset for the copied card
   display(){
    push();
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

  //TAKEN FORMM GITHUB
  setIsFaceUp(isFaceUp) {
    this.isFaceUp = isFaceUp
  }

  isUnderMouse(x, y) {
    return x >= this.x && x <= this.x + this.width  &&
    y >= this.y && y <= this.y + this.width
  }
  //END TAKEN

  pattern1(){
    if(this.isFaceUp===true){
      push();
      fill(34,56,34);
      rectMode(CENTER);
      rect(this.x, this.y, this.width, this.height);
      pop();
    }
    else{
      push();
      fill(34,34,34);
      rectMode(CENTER);
      rect(this.x, this.y, this.width, this.height);
      pop();
    }

  }
  pattern2(){
    push();
    fill(34,56,0);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
