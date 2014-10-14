class NumberSet{
  // This class contains the information about a set of possible numbers
  // to be displayed to the user. Instances of this class will likely be
  // populated by reading from data files
  
  int max;  //maximum number for the number set
  int gridWidth;  // grid width and height
  boolean[][] pattern;  // where the pieces go
  boolean[][] selected;  //which of the pieces are selected
  
  
  NumberSet(int maximum){
    max=maximum;
    gridWidth=pow(maximum,0.5);
    if (gridWidth*gridWidth<maximum) gridWidth++;
    pattern = new boolean[max+1][gridWidth*gridWidth];  //the first coordinate [0] won't be used so size max+1 is required to align the coefficient with the number of shapes
    
    
    if (max=9){  //hard code this in for now
      pattern={{false, false, false, false, false, false, false, false, false}  //0
               {false, false, false, false, true, false, false, false, false}  //1
               {false, false, true, false, false, false, true, false, false}  //2
               {false, false, true, false, true, false, true, false, false}  //3
               {true, false, true, false, false, false, true, false, true}  //4
               {true, false, true, false, true, false, true, false, true}  //5
               {true, false, true, true, false, true, true, false, true}  //6
               {true, false, true, true, true, true, true, false, true}  //7
               {true, true, true, true, false, true, true, true, true}  //8
               {true, true, true, true, true, true, true, true, true}  //9
    }
    
  }
  
  
}
