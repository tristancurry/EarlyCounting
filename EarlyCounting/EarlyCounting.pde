import ddf.minim.*;

Minim minim;
AudioPlayer player;

void setup()
{
  size(512, 200);
  
  // we pass this to Minim so that it can load files from the data directory
  minim = new Minim(this);
  
  // loadFile will look in all the same places as loadImage does.
  // this means you can find files that are in the data folder and the 
  // sketch folder. you can also pass an absolute path, or a URL.
  player = minim.loadFile("Anything you can do, I can do better.wav");
  
  // play the file from start to finish.
  // if you want to play the file again, 
  // you need to call rewind() first.
  //player.play();
}

void draw()
{
  background(0);
  stroke(255);
  
}
