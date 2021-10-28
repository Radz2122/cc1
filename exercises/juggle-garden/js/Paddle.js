class Paddle {

  constructor(w,h) {
    this.width = w;
    this.height = h;
    this.x = 0;
    this.y = height - this.height/2;
    this.speed=10;
  }

  move() {
  // if(keyIsDown===false){
  //   this.x = mouseX;
  // }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    this.x += this.speed;
  }
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    this.x -= this.speed;
  }
}



  display() {
    push();
    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(this.x,this.y,this.width,this.height);
    pop();
  }

}
