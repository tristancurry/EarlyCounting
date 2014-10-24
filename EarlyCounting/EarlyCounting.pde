import ddf.minim.*;

Minim minim;
AudioPlayer player;
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
NumberSet apples=new NumberSet(4, true);

//Button testButton = new Button(0.4, 0.25, 0.25, false);
//Button testButton2 = new Button(0.4, 0.75, 0.25, true);

void setup()
{
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
  player = minim.loadFile("Anything you can do, I can do better.wav");  //sample audio file (had handy at the time)
  
  // play the file from start to finish.
  // if you want to play the file again, 
  // you need to call rewind() first.
  //player.play();
  
  //Hard-coded values for now
  //gridWidth=3;
  
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
//  testButton.click(mouseX, mouseY,0,0,height);
//  testButton2.click(mouseX, mouseY,0,0,height);
}
