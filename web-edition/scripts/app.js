const N_MAX = 16; // highest number expected
const IMAGE_PATH = 'assets/images/apple.png';
let N = 7;
if(N > N_MAX) {
  N = N_MAX;
}
const GRID_DIMENSIONS = {
  wide: [],
  narrow: [],
  square: []
};


const appleGrid = document.getElementsByClassName('countables-grid')[0];

for (let i = 0; i < N_MAX; i++) {
  let celly = document.createElement('div');
  celly.classList.add('cell');
  appleGrid.appendChild(celly);

  let markup = `
  <div class="apple">
    <img src="${IMAGE_PATH}"/>
  </div>
  <div class="spacer nodisplay">
  </div>
  `;
  celly.insertAdjacentHTML('beforeEnd', markup);
}




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

for (let i = 0; i < N_MAX + 1; i++) {
  let gridSize = Math.ceil(Math.sqrt(i));
  let dimensions = {rows: 1, cols: 1, fraction: 100};
  if(i != 0) {
    dimensions.rows = gridSize;
    dimensions.cols = gridSize;
    dimensions.fraction = Math.floor(100/gridSize);
  }
  if(i >= GRID_DIMENSIONS.wide.length) {
    GRID_DIMENSIONS.wide.push(dimensions);
    GRID_DIMENSIONS.narrow.push(dimensions);
  }
  GRID_DIMENSIONS.square.push(dimensions);
}

GRID_DIMENSIONS.square[3] = {rows: 3, columns: 3, fraction: 33};

const LAYOUTS = {
  wide: [],
  narrow: [],
  square: []
};

LAYOUTS.square = [
  [1],
  [1],
  [1, 0, 1, 0],
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0,1,1,1,
   1,0,0,1,
   1,0,0,1,
   1,1,1,0],
  [0,1,1,1,
   0,1,1,1,
   1,0,1,0,
   1,1,1,0],
  [1,1,1,1,
   1,0,0,1,
   1,0,0,1,
   1,1,1,1],
  [1,1,0,1,
   1,1,1,1,
   1,1,0,1,
   0,1,1,1],
  [1,1,0,1,
   1,1,1,1,
   1,1,1,1,
   1,0,1,1],
  [1,1,1,1,
   1,1,1,1,
   1,1,1,1,
   1,0,1,1],
  [1,1,1,1,
   1,1,1,1,
   1,1,1,1,
   1,1,1,1]
];



//determine which style of grid to use, based on screen dimensions
//1 - tall or wide: try for rows of 5 (anticipating 10 countables)
//2 - not all that tall/wide: use a square grid whenever possible.
const wideQuery = window.matchMedia('(orientation: landscape) and (min-aspect-ratio: 16/9)');
const narrowQuery = window.matchMedia('(orientation: portrait) and (max-aspect-ratio: 9/16)');
const portraitQuery = window.matchMedia('(orientation: portrait)');
const landscapeQuery = window.matchMedia('(orientation: landscape)');

wideQuery.addListener(() => {
  resizeGrid(N);
});

narrowQuery.addListener(() => {
  resizeGrid(N);
});



generateLayouts();
resizeGrid(N);
//actually might be able to get CSS to handle cases matching 1: just set the width of
//the countables appropriately and the grid should handle the rest?

//Can do this setting grid-template-columns minmax:
//for rows of 4, set minmax(25%, 1fr);
//for rows of 5, set minmax(20%, 1fr);
//etc


function resizeGrid (N) {
  let shape = 'square';
  if(wideQuery.matches){
    shape = 'wide';
  } else if(narrowQuery.matches){
    shape = 'narrow';
  }

  //adjust grid parameters
  appleGrid.style.gridTemplateColumns = `repeat(auto-fit, minmax(${GRID_DIMENSIONS[shape][N].fraction}%, 1fr))`;
  appleGrid.style.gridTemplateRows = `repeat(auto-fit, minmax(${Math.floor(100/GRID_DIMENSIONS[shape][N].rows)}%, 1fr))`;


  //set the correct layout
  let thisLayout = LAYOUTS[shape][N];
  let cells = appleGrid.getElementsByClassName('cell');

  //adjust visibilities of elements according to N
  for (let i = 0; i < N_MAX; i++) {
    let thisApple = cells[i].getElementsByClassName('apple')[0];
    let thisSpacer = cells[i].getElementsByClassName('spacer')[0];
    if (i >= thisLayout.length) {
      cells[i].classList.add('nodisplay');
    }
    else if (thisLayout[i] === 1) {
      cells[i].classList.remove('nodisplay');
      thisApple.classList.remove('nodisplay');
      thisSpacer.classList.add('nodisplay');
    } else if (thisLayout[i] === 0) {
      cells[i].classList.remove('nodisplay');
      thisApple.classList.add('nodisplay');
      thisSpacer.classList.remove('nodisplay');
    }
  }
}

function generateLayout (N, shape) {
  //randomly assign spacers and apples to create space-filling patterns
  let apples = N;
  let spaces = GRID_DIMENSIONS[shape][N].rows * GRID_DIMENSIONS[shape][N].cols;
  let layout = new Array(spaces).fill(0);
  for (let i = 0; i < apples; i++) {
    let place = Math.floor(spaces*Math.random());
    while (layout[place] != 0) {
      place = Math.floor(spaces*Math.random());
    }
    layout[place] = 1;
  }
  return layout;
}

function generateLayouts () {
  for (let shape in GRID_DIMENSIONS) {
    for (let i = 0; i < N_MAX + 1; i++) {
      if(!LAYOUTS[shape][i]) {
        LAYOUTS[shape][i] = generateLayout(i, shape);
      }
    }
  }
}
