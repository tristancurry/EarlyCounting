class NumberSet{
  int maxCount;
  Button button[];
  
  NumberSet(int max, boolean bothWays){
    maxCount=max;
    button=new Button[max];
    for(int i=0; i<max; i++){
      button[i]=new Button(bothWays);
    }
    switch(max){
      case 1:
        for(int i=0; i<max; i++){
          button[i].dProp=0.7;
        }
        button[0].xProp=0.5;
        button[0].yProp=0.5;
      break;
      
      case 2:
        for(int i=0; i<max; i++){
          button[i].dProp=0.45;
        }
        button[0].xProp=0.25;
        button[0].yProp=0.25;
        button[1].xProp=0.75;
        button[1].yProp=0.75;
      break;
      
      case 3:
        for(int i=0; i<max; i++){
          button[i].dProp=0.35;
        }
        button[0].xProp=0.2;
        button[0].yProp=0.2;
        button[1].xProp=0.5;
        button[1].yProp=0.5;
        button[2].xProp=0.8;
        button[2].yProp=0.8;
      break;
      
      case 4:
        for(int i=0; i<max; i++){
          button[i].dProp=0.45;
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
     
      case 5:
        for(int i=0; i<max; i++){
          button[i].dProp=0.35;
        }
        button[0].xProp=0.2;
        button[0].yProp=0.2;
        button[1].xProp=0.2;
        button[1].yProp=0.8;
        button[2].xProp=0.5;
        button[2].yProp=0.5;
        button[3].xProp=0.8;
        button[3].yProp=0.2;
        button[4].xProp=0.8;
        button[4].yProp=0.8;
      break;
      
      case 6:
        for(int i=0; i<max; i++){
          button[i].dProp=0.33;
        }
        button[0].xProp=0.25;
        button[0].yProp=0.165;
        button[1].xProp=0.25;
        button[1].yProp=0.5;
        button[2].xProp=0.25;
        button[2].yProp=0.835;
        button[3].xProp=0.75;
        button[3].yProp=0.165;
        button[4].xProp=0.75;
        button[4].yProp=0.5;
        button[5].xProp=0.75;
        button[5].yProp=0.835;
      break;
      
      case 7:
        for(int i=0; i<max; i++){
          button[i].dProp=0.33;
        }
        button[0].xProp=0.165;
        button[0].yProp=0.165;
        button[1].xProp=0.165;
        button[1].yProp=0.5;
        button[2].xProp=0.165;
        button[2].yProp=0.835;
        button[3].xProp=0.5;
        button[3].yProp=0.5;
        button[4].xProp=0.835;
        button[4].yProp=0.165;
        button[5].xProp=0.835;
        button[5].yProp=0.5;
        button[6].xProp=0.835;
        button[6].yProp=0.835;
      break;
      
      case 8:
        for(int i=0; i<max; i++){
          button[i].dProp=0.33;
        }
        button[0].xProp=0.165;
        button[0].yProp=0.165;
        button[1].xProp=0.165;
        button[1].yProp=0.5;
        button[2].xProp=0.165;
        button[2].yProp=0.835;
        button[3].xProp=0.5;
        button[3].yProp=0.165;
        button[4].xProp=0.5;
        button[4].yProp=0.835;
        button[5].xProp=0.835;
        button[5].yProp=0.165;
        button[6].xProp=0.835;
        button[6].yProp=0.5;
        button[7].xProp=0.835;
        button[7].yProp=0.835;
      break;
      
      case 9:
        for(int i=0; i<max; i++){
          button[i].dProp=0.33;
        }
        button[0].xProp=0.165;
        button[0].yProp=0.165;
        button[1].xProp=0.165;
        button[1].yProp=0.5;
        button[2].xProp=0.165;
        button[2].yProp=0.835;
        button[3].xProp=0.5;
        button[3].yProp=0.165;
        button[4].xProp=0.5;
        button[4].yProp=0.5;
        button[5].xProp=0.5;
        button[5].yProp=0.835;
        button[6].xProp=0.835;
        button[6].yProp=0.165;
        button[7].xProp=0.835;
        button[7].yProp=0.5;
        button[8].xProp=0.835;
        button[8].yProp=0.835;
      break;
    }
  }
  
  void display(){
    xSquare=0;
    ySquare=0;
    squareSize=height;
    for(int i=0; i<maxCount; i++){
      button[i].display(xSquare, ySquare, squareSize);
    }
  }
  
  void click(){
    for(int i=0; i<maxCount; i++){
      button[i].click(mouseX,mouseY,xSquare, ySquare, squareSize);
    }
  }
}
