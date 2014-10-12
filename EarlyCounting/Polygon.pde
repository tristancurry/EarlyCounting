class Polygon{
  int numSides;  //number of sides
  int radius;    //radius (in pixels)
  color before;
  color after;
  
  Polygon(){
    
  }

  void display(){
    beginShape();
      for (int i = 0; i < sides; i++) {
        vertex(vertices[i][0], vertices[i][1]);
      }
    endShape(CLOSE);
  }
}
