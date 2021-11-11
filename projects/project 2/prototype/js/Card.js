class Card{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.width=300;
    this.height=500;
  }
}


function display(){
  push();
  fill(255);
  noStroke();
  rectMode(CENTER);
  rect(this.x, this.y, this.width, this.height);
  pop();
}
