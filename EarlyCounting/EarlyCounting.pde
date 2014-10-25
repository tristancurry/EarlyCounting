import ddf.minim.*;

Minim minim;
AudioPlayer[] number = new AudioPlayer[10];
//Char[][] dominos = new Char[9][9];  // true/false arrangement of shapes (2D)
//int gridSize=50;  // width and height of grid squares for shapes
//float shapeProp=0.9;  // proportion of the grid square width taken by the N-gon
//int gridWidth;  //number of shapes along each side of the grid
int xSquare=0;
int ySquare=0;
int squareSize=600;
int total=0;
PImage dotSelected;
PImage dotDeselected;
NumberSet apples=new NumberSet(1, false);

//Button testButton = new Button(0.4, 0.25, 0.25, false);
//Button testButton2 = new Button(0.4, 0.75, 0.25, true);

void setup(){
  if (frame != null) {
    frame.setResizable(true);
  }
  size(int(squareSize*1.5),squareSize);
  dotSelected=loadImage("images/apple.png");
  dotDeselected=loadImage("images/apple.png");
  //dotDeselected=dotSelected.clone();
  dotDeselected.filter(GRAY);
    
  // we pass this to Minim so that it can load files from the data directory
  minim = new Minim(this);
  
  // loadFile will look in all the same places as loadImage does.
  // this means you can find files that are in the data folder and the 
  // sketch folder. you can also pass an absolute path, or a URL.
  number[1] = minim.loadFile("audio/one.mp3");
  
  // play the file from start to finish.
  // if you want to play the file again, 
  // you need to call rewind() first.
  //player.play();  
}

void draw()
{
  background(255);
  apples.display();
  textAlign(RIGHT, TOP);
  textSize(height*0.8);
  fill(0);
  text(str(total),width, 0);
}

void mousePressed(){
  apples.click();
  switch(total){
    case 1:
      number[1].play();
    break;
    case 2:
      number[1].rewind();
    break;
  }
  if (total==apples.maxCount){
    apples=new NumberSet(total+1, false);
    textSize(20);
    text(str(apples.maxCount),700,300);
    total=0;
  }
}
