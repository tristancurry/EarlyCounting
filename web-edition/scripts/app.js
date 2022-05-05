const N_MAX = 16; // highest number expected
let N = 12;
const GRID_DIMENSIONS = {
  wide: [],
  narrow: [],
  square: []
};

const appleGrid = document.getElementsByClassName('countables-grid')[0];

GRID_DIMENSIONS.wide = [
  {rows: 1, cols: 1, fraction: 100},
  {rows: 1, cols: 1, fraction: 100},
  {rows: 1, cols: 2, fraction: 50},
  {rows: 1, cols: 3, fraction: 33},
  {rows: 2, cols: 3, fraction: 33},
  {rows: 2, cols: 3, fraction: 33},
  {rows: 2, cols: 3, fraction: 33},
  {rows: 2, cols: 4, fraction: 25},
  {rows: 2, cols: 4, fraction: 25},
  {rows: 3, cols: 4, fraction: 25},
  {rows: 3, cols: 4, fraction: 25},
  {rows: 3, cols: 4, fraction: 25},
  {rows: 3, cols: 4, fraction: 25},
];

for (let i = 0, l = GRID_DIMENSIONS.wide.length; i < l; i++) {
  let wide_dims = GRID_DIMENSIONS.wide[i];
  let narrow_dims = {rows: wide_dims.cols, cols: wide_dims.rows, fraction: Math.floor(100/wide_dims.rows)};
  GRID_DIMENSIONS.narrow.push(narrow_dims);
}
//determine which style of grid to use, based on screen dimensions
//1 - tall or wide: try for rows of 5 (anticipating 10 countables)
//2 - not all that tall/wide: use a square grid whenever possible.
const wideQuery = window.matchMedia('(orientation: landscape) and (min-aspect-ratio: 12/9)');
const narrowQuery = window.matchMedia('(orientation: portrait) and (max-aspect-ratio: 9/12)');
wideQuery.addListener(() => {
  console.log(wideQuery);
  resizeGrid(N);
});

narrowQuery.addListener(() => {
  console.log(narrowQuery);
  resizeGrid(N);
});


for (let i = 0; i < N_MAX + 1; i++) {
  let gridSize = Math.ceil(Math.sqrt(i));
  let dimensions = {rows: 1, cols: 1, fraction: 100};
  if(i != 0) {
    dimensions.rows = gridSize;
    dimensions.cols = gridSize;
    dimensions.fraction = Math.floor(100/gridSize);
  }
  if(i > GRID_DIMENSIONS.wide.length) {
    GRID_DIMENSIONS.wide.push(dimensions);
    GRID_DIMENSIONS.narrow.push(dimensions);
  }
  GRID_DIMENSIONS.square.push(dimensions);
}

resizeGrid(N);
console.log(GRID_DIMENSIONS);
//actually might be able to get CSS to handle cases matching 1: just set the width of
//the countables appropriately and the grid should handle the rest?


//Can do this setting grid-template-columns minmax:
//for rows of 4, set minmax(25%, 1fr);
//for rows of 5, set minmax(20%, 1fr);
//etc


function resizeGrid (N) {
  if(wideQuery.matches){
    appleGrid.style.gridTemplateColumns = `repeat(auto-fit, minmax(${GRID_DIMENSIONS.wide[N].fraction}%, 1fr))`;
    appleGrid.style.gridTemplateRows = `repeat(auto-fit, minmax(${Math.floor(100/GRID_DIMENSIONS.wide[N].rows)}%, 1fr))`;
  } else if(narrowQuery.matches){
    // appleGrid.style.gridTemplateColumns = `repeat(auto-fit, minmax(${GRID_DIMENSIONS.narrow[N].fraction}%, 1fr))`;
    appleGrid.style.gridTemplateRows = `repeat(auto-fit, minmax(${Math.floor(100/GRID_DIMENSIONS.narrow[N].rows)}%, 1fr))`;

  } else {
    appleGrid.style.gridTemplateColumns = `repeat(auto-fit, minmax(${GRID_DIMENSIONS.square[N].fraction}%, 1fr))`;
    appleGrid.style.gridTemplateRows = `repeat(auto-fit, minmax(${Math.floor(100/GRID_DIMENSIONS.square[N].rows)}%, 1fr))`;

  }

}
