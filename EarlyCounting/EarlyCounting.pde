import ddf.minim.*;

Minim minim;
AudioPlayer[] number = new AudioPlayer[10];
Navigation nav = new Navigation();
int xSquare=0;
int ySquare=0;
int squareSize=600;
int fadeDuration=100;  // fade in / fade out time in ms (minimum=1)

int total=0;
int clickTime;  // time that an object was pressed (to time fades, etc.)
PImage dotSelected;
PImage dotDeselected;
PImage fwdBack;
boolean twoWay=true;
NumberSet apples=new NumberSet(1, twoWay);

void setup(){
  if (frame != null) {
    frame.setResizable(true);
  }
  size(int(squareSize*1.5),squareSize);
  dotSelected=loadImage("images/apple.png");
  dotDeselected=loadImage("images/apple.png");
  fwdBack=loadImage("images/PrevNextButton.png");
  //dotDeselected=dotSelected.clone();
  dotDeselected.filter(GRAY);
    
  // we pass this to Minim so that it can load files from the data directory
  minim = new Minim(this);
  
  // loadFile will look in all the same places as loadImage does.
  // this means you can find files that are in the data folder and the 
  // sketch folder. you can also pass an absolute path, or a URL.
  //number[1] = minim.loadFile("audio/one.mp3");
  number[0] =minim.loadFile("audio/zero.wav");
  number[1] =minim.loadFile("audio/one.wav");
  number[2] =minim.loadFile("audio/two.wav");
  number[3] =minim.loadFile("audio/three.wav");
  number[4] =minim.loadFile("audio/four.wav");
  number[5] =minim.loadFile("audio/five.wav");
  number[6] =minim.loadFile("audio/six.wav");
  number[7] =minim.loadFile("audio/seven.wav");
  number[8] =minim.loadFile("audio/eight.wav");
  number[9] =minim.loadFile("audio/nine.wav");
  

}

void draw()
{
  background(255);
  imageMode(CENTER);
  nav.display();
  textAlign(LEFT,BOTTOM);
  textSize(height/30);
  fill(0);
  text(" Feedback to Chris.Heddles@asms.sa.edu.au",0,height);
  apples.display();
  textAlign(CENTER, CENTER);
  textSize(height*0.7);
  fill(0);
  text(str(total),nav.xCentre,int(height*0.3));
}

void keyPressed(){
  //  might make left and right arrows shift between grids
}

void mousePressed(){
  apples.click();
  nav.click(mouseX,mouseY);
}

void stop()
{
  // always close Minim audio classes when you are done with them
  for(int i=0;i<10;i++){
    number[i].close();
  }
  minim.stop();
  super.stop();
}
