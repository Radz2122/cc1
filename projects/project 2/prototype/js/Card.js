class Card{
  constructor(x,y,nb){
    this.x=x;
    this.y=y;
    this.nb=nb;
    this.width=150;
    this.height=200;
    this.offset=550;
  }

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
}
