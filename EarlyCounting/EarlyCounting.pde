import ddf.minim.*;

Minim minim;
//AudioPlayer one;
//AudioPlayer two;
AudioPlayer[] number = new AudioPlayer[10];
//AudioSample[] number = new AudioSample[10];
int xSquare=0;
int ySquare=0;
int squareSize=600;
int fadeDuration=100;  // fade in / fade out time in ms (minimum=1)

int total=0;
int clickTime;  // time that an object was pressed (to time fades, etc.)
PImage dotSelected;
PImage dotDeselected;
PImage buttons;
NumberSet apples=new NumberSet(1, false);

void setup(){
  if (frame != null) {
    frame.setResizable(true);
  }
  size(int(squareSize*1.5),squareSize);
  dotSelected=loadImage("images/apple.png");
  dotDeselected=loadImage("images/apple.png");
  buttons=loadImage("images/PrevNextButton.jpg");
  //dotDeselected=dotSelected.clone();
  dotDeselected.filter(GRAY);
    
  // we pass this to Minim so that it can load files from the data directory
  minim = new Minim(this);
  
  // loadFile will look in all the same places as loadImage does.
  // this means you can find files that are in the data folder and the 
  // sketch folder. you can also pass an absolute path, or a URL.
  //number[1] = minim.loadFile("audio/one.mp3");
  number[1]=minim.loadFile("audio/one.wav");
  number[2] =minim.loadFile("audio/two.wav");
  
//  one.play();
//  one.stop();
  
  // play the file from start to finish.
  // if you want to play the file again, 
  // you need to call rewind() first.
  //player.play();  
}

void draw()
{
  background(255);
  imageMode(CENTER);
  image(buttons, width-height/4, int(height*0.85), width/5, width/5);
  apples.display();
  textAlign(CENTER, CENTER);
  textSize(height*0.7);
  fill(0);
  text(str(total),width-height/4,int(height*0.3));
}

void keyPressed()
{
//  if ( key == 's' ) number[1].trigger();
  //if ( key == 'k' ) kick.trigger();
}

void mousePressed(){
  apples.click();
  if (total==apples.maxCount&&(millis()-clickTime>fadeDuration)){
    apples=new NumberSet(total+1, false);
    textSize(20);
    text(str(apples.maxCount),700,300);
    total=0;
  }
}

void stop()
{
  // always close Minim audio classes when you are done with them
  number[1].close();
  //number[1].close();
  minim.stop();
  super.stop();
}
