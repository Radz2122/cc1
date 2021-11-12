class Card{
  constructor(x,y,nb){
    this.x=x;
    this.y=y;
    this.nb=nb;
    this.width=150;
    this.height=200;
    this.offset=550;
  }
//for now i did a display function  and a copy with its offset for the copied card
   display(){
    push();
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
  displayCopy(){
    push();
    fill(255);
    rectMode(CENTER);
    rect(this.x+this.offset, this.y, this.width, this.height);
    pop();
  }

  //for now i did a pattern  and a copy with its offset for the copied card
  pattern1Copy(){
    push();
    fill(34,34,34);
    rectMode(CENTER);
    rect(this.x+this.offset, this.y, this.width, this.height);
    pop();
  }
  pattern1(){
    push();
    fill(34,34,34);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
