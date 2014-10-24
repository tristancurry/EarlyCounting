class NumberSet{
  
  Button button[];
  
  NumberSet(int max, boolean bothWays){
   button=new Button[max];
   for(int i=0; i<max; i++){
     button[i]=new Button(true);
   }
   switch(max){
     case 4:
       for(int i=0; i<4; i++){
         button[i].dProp=0.4;
       }
       button[0].xProp=0.25;
       button[0].yProp=0.25;
       button[1].xProp=0.25;
       button[1].yProp=0.75;
       button[2].xProp=0.75;
       button[2].yProp=0.25;
       button[3].xProp=0.75;
       button[3].yProp=0.75;
     break;
   }
  }
  
  void display(){
    for(int i=0; i<4; i++){
      button[i].display(xSquare, ySquare, squareSize);
    }
  }
  
  void click(){
    for(int i=0; i<4; i++){
      button[i].click(mouseX,mouseY,xSquare, ySquare, squareSize);
    }
  }
}
