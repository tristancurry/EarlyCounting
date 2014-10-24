class Button{
// The button class contains a button that can be selected and deselected in response to being touched
// the button is predominantly round
// when selected, the button should be brightly-coloured. When deselected, the button 

float dProp;  // diameter as proportion of square
float xProp;  // x-coordinate as proportion of square
float yProp;  // y-cooordinate as a proportion of square
boolean selected=false;
boolean twoWay;  //whether a button can be deselected to count down
//PImage imgSelected;
//PImage imgDeselected;
  
  
  //Button(float d, float x, float y, boolean bothWays){
  Button(boolean bothWays){
//    dProp=d;
//    xProp=x;
//    yProp=y;
    //imgSelected=dotSelected;
    //imgDeselected=dotDeselected;
    twoWay=bothWays;
  }
  
  void display(int x, int y, int w){
    int xLoc=x+int(xProp*w);
    int yLoc=y+int(yProp*w);
    int diam=int(dProp*w);
    imageMode(CENTER);
    rectMode(CENTER);
    fill(255,255,255,170);
    strokeWeight(0);
    stroke(255);
    if(selected){
      image(dotSelected, xLoc, yLoc, diam, diam);
    }else{
      image(dotDeselected, xLoc, yLoc, diam, diam);
      rect(xLoc, yLoc, diam, diam);
    }
  }
  
  void click(int x, int y, int xBox, int yBox, int wBox){
    int xLoc=xBox+int(xProp*wBox);
    int yLoc=yBox+int(yProp*wBox);
    int radius=int(dProp*wBox/2);
    
    if(isOver(x, y, xLoc, yLoc, radius)){
      if((twoWay)&&(selected)){
        selected=false;
        total=total-1;
      }else if(!selected){
        selected=true;
        total=total+1;
      }
    }
  }
  
  boolean isOver(int x1, int y1, int x2, int y2, int r){
    if ((r*r)>((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2))) return true;
    else return false;
  }
  
}
