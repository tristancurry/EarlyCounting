class Navigation{
  int xCentre;
  int yCentre;
  int ySpan;
  int xSpan;
  
  
  Navigation(){
    
  }
  
  void display(){
    xSpan = min(width-height,height/3);
    ySpan = 119*xSpan/177;  // based on image dimensions
    xCentre = width-max(xSpan, width-height)/2;
    yCentre = 5*height/6;
    image(fwdBack, xCentre, yCentre, xSpan, ySpan);
  }
  
  void click(int x, int y){
    int nextCount;
    if (y>(yCentre-ySpan)){
      if (x>xCentre){
        nextCount=apples.maxCount+1;
        if (nextCount==10) nextCount=1;
        apples=new NumberSet(nextCount, twoWay);
        total=0;
      }else if (x>(xCentre-xSpan/2)){
        nextCount=apples.maxCount-1;
        if (nextCount==0) nextCount=9;
        apples=new NumberSet(nextCount, twoWay);
        total=0;
      }
    }
  }
  
}
