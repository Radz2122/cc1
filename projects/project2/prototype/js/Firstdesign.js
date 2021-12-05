class Firstdesign extends Card{
  constructor(x,y,nb){
    super(x,y,nb);
    this.width=150;
    this.height=200;
  }
//for now i did a display function  and a copy with its offset for the copied card
   display(){
     super.pattern2();
  }

}
