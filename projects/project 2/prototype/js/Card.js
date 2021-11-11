class Card{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.width=150;
    this.height=200;
  }

   display(){
    push();
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}