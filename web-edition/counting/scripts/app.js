const N_MAX = 20; // highest number expected
const cellsRequired = Math.pow(Math.ceil(Math.sqrt(N_MAX)), 2);
const IMAGE_PATH = 'assets/images/apple.png';
let N = 1;
let counted = 0;
if(N > N_MAX) {
  N = N_MAX;
}
const GRID_DIMENSIONS = {
  wide: [],
  narrow: [],
  square: []
};

//default values
const settings_default = {
  sound_on: true,
  countdirection: 'up-only',
  countlimit: 9,
  applecolourOffset: 0
}

const settings = {};
//initialise settings with default values
for (const s in settings_default) {
  let value = settings_default[s];
  settings[s] = value;
}


if (storageAvailable('localStorage')) {
  //check to see if storage is already populated (e.g. app has been visited before)
  if(!localStorage.getItem('sound_on')) {
    //populate storage with default settings
    for (const s in settings_default) {
      let value = settings_default[s];
      localStorage.setItem(s, value);
    }
  } else {
    //load stored settings into msapplication
    for (const s in settings) {
      let value = localStorage.getItem(s);
      if (value === 'true') {value = true;}
      if (value === 'false') {value = false;}
      settings[s] = value;
    }
  }
}







const main = document.getElementsByClassName('main')[0];


const logo = document.getElementsByClassName('logo')[0];
logo.insertAdjacentHTML('beforeend', aboutLogoMarkup);


const optionsBackground = document.getElementsByClassName('options-background')[0];


//Buttons on main view
const nextButton = document.getElementsByClassName('next')[0];
nextButton.insertAdjacentHTML('beforeend', nextButtonMarkup);

const prevButton = document.getElementsByClassName('prev')[0];
prevButton.insertAdjacentHTML('beforeend', prevButtonMarkup);

const soundToggle = document.getElementsByClassName('soundtoggle')[0];
soundToggle.insertAdjacentHTML('beforeend', soundButtonMarkup);

const shuffleButton = '';

const optionsButton = document.getElementsByClassName('options')[0];

const numberDisplay = document.getElementsByClassName('number')[0];

//Controls that appear in the options window
const applecolourSlider = document.getElementsByClassName('applecolour-slider')[0];
const countdirectionControl = document.getElementsByClassName('countdirection')[0];
const soundonoffControl = document.getElementsByClassName('soundonoff')[0];
const countlimitControl = document.getElementsByClassName('countlimit')[0];
//setup event listeners for the various options.

const countDir_radios = countdirectionControl.getElementsByTagName('input');
for (const radio of countDir_radios) {
  radio.onclick = (event) => {
    //set the countdir variable to the appropriate value.
    settings.countdirection = event.target.value;
    //store user preference
    if (storageAvailable('localStorage')) {
      localStorage.setItem('countdirection', settings.countdirection);
    }
  }
}

const soundonoff_radios = soundonoffControl.getElementsByTagName('input');
for (const radio of soundonoff_radios) {
  radio.onclick = (event) => {
    //set the countdir variable to the appropriate value.
    if (event.target.value == 'sound-off') {
      settings.sound_on = false;
      document.getElementsByClassName('nope')[0].classList.remove('hide');
    } else {
      settings.sound_on = true;
      document.getElementsByClassName('nope')[0].classList.add('hide');
    }
    //store user preference
  }
}

countlimitControl.addEventListener('click', (event) => {
  if(event.target.tagName == 'BUTTON') {
    if (event.target.id == 'limit-less') {
      //reduce countlimit, if countlimit is > 1
      if(settings.countlimit > 1) {
        settings.countlimit --;
      }
      //disable when countlimit is 1
      if(settings.countlimit <= 1) {
        event.target.disabled = true;
      }

      if (N > settings.countlimit) {
        N = settings.countlimit;
        resizeGrid(N);
        resetAppleCount();
      }
      //enable limit-more if countlimit is less than N_MAX
      if (document.getElementById('limit-more').disabled && settings.countlimit < N_MAX) {
        document.getElementById('limit-more').disabled = false;
      }
    } else if (event.target.id == 'limit-more') {
      //increase countlimit, if countlimit < N_MAX
      if(settings.countlimit < N_MAX) {
        settings.countlimit ++;
      }
      //disable when countlimit is N_MAX
      if(settings.countlimit >= N_MAX) {
        event.target.disabled = true;
      }
      //enable limit-more if countlimit is more than 1
      if (document.getElementById('limit-less').disabled && settings.countlimit > 1) {
        document.getElementById('limit-less').disabled = false;
      }
    }
    //display current countlimit in window
    let display = countlimitControl.getElementsByClassName('countlimit')[0];
    display.innerText = settings.countlimit;
    //save user preference
    if (storageAvailable('localStorage')) {
      localStorage.setItem('countlimit', settings.countlimit);
    }
  }
});

applecolourSlider.addEventListener('input', (event) => {
  let howdoyoulikethemapples = document.getElementsByClassName('apple');
  settings.applecolourOffset = event.target.value;
  if(storageAvailable('localStorage')) {
    localStorage.setItem('applecolourOffset', settings.applecolourOffset);
  }
  for (let i = 0, l = howdoyoulikethemapples.length; i < l; i++) {
    let img = howdoyoulikethemapples[i].getElementsByTagName('img')[0];
    img.style.filter = `hue-rotate(${settings.applecolourOffset}deg)`;
  }
  document.getElementsByClassName('logo-word-apple')[0].style.filter = `hue-rotate(${event.target.value}deg)`;
  document.getElementsByClassName('word-apple')[0].style.filter = `hue-rotate(${event.target.value}deg)`;
});

optionsButton.addEventListener('click', () => {
  optionsBackground.classList.remove('nodisplay');
  setTimeout(() => {
    optionsBackground.getElementsByClassName('options-window')[0].classList.remove('zoom-from-corner');
  }, 0);
});

optionsBackground.addEventListener('click', (event) => {
  let target = event.target;
  if(event.target == optionsBackground || event.target == optionsBackground.getElementsByClassName('closebox')[0]) {
    optionsBackground.getElementsByClassName('options-window')[0].classList.add('zoom-from-corner');
    setTimeout(() => {
      optionsBackground.classList.add('nodisplay');
    }, 100);
  }
});

nextButton.addEventListener('click', () => {
  if(N < settings.countlimit) {
    N++;
  } else {
    N = 1;
  }
  resizeGrid(N);
  resetAppleCount();
});

prevButton.addEventListener('click', () => {
  if(N > 1) {
    N--;
  } else {
    N = settings.countlimit;
  }
  resizeGrid(N);
  resetAppleCount();
});

soundToggle.addEventListener ('click', () => {
  settings.sound_on = !settings.sound_on;
  document.getElementsByClassName('nope')[0].classList.toggle('hide');
  //toggle state of radio buttons in options window too.
  if (settings.sound_on) {
    document.getElementById('sound-on').checked = true;
  } else {
    document.getElementById('sound-off').checked = true;
  }
  //retain user preference
  if (storageAvailable('localStorage')) {
    localStorage.setItem('sound_on', settings.sound_on);
  }
 });



const appleGrid = document.getElementsByClassName('countables-grid')[0];
const navigation = document.getElementsByClassName('navigation')[0];



appleGrid.addEventListener('touchstart', (event) => {
  event.preventDefault();
  handleAppleCount();
  if(event.target.classList.contains('apple')) {
    event.target.classList.add('activated');
  }
});

appleGrid.addEventListener('touchend', (event) => {
  if(event.target.classList.contains('apple')) {
    event.target.classList.remove('activated');
  }
});

appleGrid.addEventListener('mousedown', (event) => {
  handleAppleCount();
});

for (let i = 0; i < cellsRequired; i++) {
  let celly = document.createElement('div');
  celly.classList.add('cell');
  appleGrid.appendChild(celly);

  let markup = `
  <button class="apple greyed">
    <img src="${IMAGE_PATH}"/>
  </button>
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
  {rows: 3, cols: 3, fraction: 33},
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

LAYOUTS.wide = [
  [1],
  [1],
  [1,1],
  [1,1,1],
  [1,1,0, 0,1,1],
  [1,0,1, 1,1,1],
  [1,1,1, 1,1,1],
  [1,1,1,1, 1,1,1,0],
  [1,1,1,1, 1,1,1,1],
  [1,0,1,1,
   1,1,0,1,
   1,0,1,1
  ],
  [1,1,1,1,
   1,0,0,1,
   1,1,1,1
  ],
  [1,1,1,1,
   1,0,1,1,
   1,1,1,1
  ],
  [1,1,1,1,
   1,1,1,1,
   1,1,1,1
  ],
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

LAYOUTS.square = [
  [1],
  [1],
  [1, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [0,1,1,0,
   1,0,1,1,
   1,1,0,1,
   0,1,1,0],
  [1,1,1,1,
   1,0,0,1,
   1,0,0,1,
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
const wideQuery = window.matchMedia('(orientation: landscape) and (min-aspect-ratio: 2/1)');
const narrowQuery = window.matchMedia('(orientation: portrait) and (max-aspect-ratio: 1/2)');
const portraitQuery = window.matchMedia('(orientation: portrait) and (min-aspect-ratio: 1/2)');
const landscapeQuery = window.matchMedia('(orientation: landscape) and (max-aspect-ratio: 2/1)');

wideQuery.addListener(() => {
  resizeGrid(N);
});

narrowQuery.addListener(() => {
  resizeGrid(N);
});

portraitQuery.addListener(() => {
  resizeGrid(N);
});

landscapeQuery.addListener(() => {
  resizeGrid(N);
});


generateLayouts();

//execute settings once loaded/initialised
applySettings();
resizeGrid(N);

//actually might be able to get CSS to handle cases matching 1: just set the width of
//the countables appropriately and the grid should handle the rest?

//Can do this setting grid-template-columns minmax:
//for rows of 4, set minmax(25%, 1fr);
//for rows of 5, set minmax(20%, 1fr);
//etc


function resizeGrid (N) {
  if(N > 9) {numberDisplay.classList.add('number-long');}
  else {numberDisplay.classList.remove('number-long');}
  let shape = 'square';
  // if(wideQuery.matches){
  //   shape = 'wide';
  // } else if(narrowQuery.matches){
  //   shape = 'narrow';
  // }

  //adjust grid parameters
  appleGrid.style.gridTemplateColumns = `repeat(auto-fit, minmax(${GRID_DIMENSIONS[shape][N].fraction}%, 1fr))`;
  // appleGrid.style.gridTemplateRows = `repeat(auto-fit, minmax(${Math.floor(100/GRID_DIMENSIONS[shape][N].rows)}%, 1fr))`;


  //set the correct layout
  let thisLayout = LAYOUTS[shape][N];
  let cells = appleGrid.getElementsByClassName('cell');

  //adjust visibilities of elements according to N
  for (let i = 0; i < cellsRequired; i++) {
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

function handleAppleCount () {
  //increment count
  //handle class changes
  //play audio
  if(event.target.classList.contains('greyed')) {
    event.target.classList.remove('greyed');
    counted++;
    playNumberSound(counted);
  } else if (settings.countdirection == 'up-down' && event.target.classList.contains('apple')) {
    event.target.classList.add('greyed');
    counted--;
    playNumberSound(counted);
  }
  numberDisplay.innerText = counted;
}

function resetAppleCount () {
  let apples = appleGrid.getElementsByClassName('apple');
  for (let i = 0, l = apples.length; i < l; i++) {
    apples[i].classList.add('greyed');
  }
  counted = 0;
  numberDisplay.innerText = counted;
}

function playNumberSound (number) {
  if (settings.sound_on == true && loadedSounds[number]) {
    loadedSounds[number].play();
  }
}

function applySettings () {
  //for each setting...trigger associated actions
  //sound - toggle sound state if necessary, change state of Controls
  if(settings.sound_on == true) {
    document.getElementsByClassName('nope')[0].classList.add('hide');
    document.getElementById('sound-on').checked = true;
  } else {
    document.getElementsByClassName('nope')[0].classList.remove('hide');
    document.getElementById('sound-off').checked = true;
  }
  //apple colour - set slider to relevant position
  applecolourSlider.value = parseInt(settings.applecolourOffset);
  applecolourSlider.dispatchEvent(new Event('input'));
  //countlimit - adjust, and restrict displayed apples as necessary
  settings.countlimit++;
  document.getElementById('limit-less').dispatchEvent(new Event('click'));
  let display = countlimitControl.getElementsByClassName('countlimit')[0];
  display.innerText = settings.countlimit;
  //count direction
  document.getElementById(settings.countdirection).checked = true;
}

function restoreDefaultSettings () {
  for (const s in settings_default) {
    let value = settings_default[s];
    settings[s] = value;
    if(storageAvailable('localStorage')) {
      localStorage.setItem(s, value);
    }
  }
}
