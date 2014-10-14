import ddf.minim.*;

Minim minim;
AudioPlayer player;
//Char[][] dominos = new Char[9][9];  // true/false arrangement of shapes (2D)
//int gridSize=50;  // width and height of grid squares for shapes
float shapeProp=0.9;  // proportion of the grid square width taken by the N-gon
int gridWidth;  //number of shapes along each side of the grid

void setup()
{
  size(512, 200);
  
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
  gridWidth=3;
  
}

void draw()
{
  background(0);
  stroke(255);

  
  
}
