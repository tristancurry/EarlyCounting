//setup.js
const SCRIPT_PATH = 'scripts';
const ASSET_PATH = 'assets';

let viewport = document.querySelector('meta[name=viewport]');
viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');

window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('overflow', 'auto');
});
//simple scriptloader, thanks https://usefulangle.com/post/343/javascript-load-multiple-script-by-order
let loadScript = (url) => {
  return new Promise ( (resolve, reject) => {
    let script = document.createElement('script');
    script.src = url;
    script.async = false;
    script.onload = () => {
      resolve(url);
    };
    script.onerror = () => {
      reject(url);
    };
    document.body.appendChild(script);
  });
}

let loadResource = (rsrc) => {
  return new Promise ( (resolve, reject) => {
    let resource;
    if(rsrc.resourceType === 'image') {
      resource = new Image();
    } else if (rsrc.resourceType === 'audio') {
      resource = new Audio();
    }
    resource.src = rsrc.url;
    resource.async = false;
    if(rsrc.resourceType === 'audio') {
      resource.addEventListener('canplaythrough', resolve(rsrc.url), false);
      loadedSounds.push(resource);
    } else {
      resource.onload = () => {
        resolve(rsrc.url);
        loadedImages[rsrc.val] = resource;
      };
    }
    resource.onerror = () => {
      reject(rsrc.url);
    };
  });
}


const scriptURLs = [
  `${SCRIPT_PATH}/swHandling.js`,
  `${SCRIPT_PATH}/app.js`
];

const resources = [
  {url:`${ASSET_PATH}/images/apple.png`, resourceType:`image`},
  {url:`${ASSET_PATH}/audio/voice_000.mp3`, resourceType:`audio`, val: 0},
  {url:`${ASSET_PATH}/audio/voice_001.mp3`, resourceType:`audio`, val: 1},
  {url:`${ASSET_PATH}/audio/voice_002.mp3`, resourceType:`audio`, val: 2},
  {url:`${ASSET_PATH}/audio/voice_003.mp3`, resourceType:`audio`, val: 3},
  {url:`${ASSET_PATH}/audio/voice_004.mp3`, resourceType:`audio`, val: 4},
  {url:`${ASSET_PATH}/audio/voice_005.mp3`, resourceType:`audio`, val: 5},
  {url:`${ASSET_PATH}/audio/voice_006.mp3`, resourceType:`audio`, val: 6},
  {url:`${ASSET_PATH}/audio/voice_007.mp3`, resourceType:`audio`, val: 7},
  {url:`${ASSET_PATH}/audio/voice_008.mp3`, resourceType:`audio`, val: 8},
  {url:`${ASSET_PATH}/audio/voice_009.mp3`, resourceType:`audio`, val: 9}
];


const loadedSounds = [];
const loadedImages = [];


let promises = [];

for (let i = 0, l = resources.length; i < l; i++) {
  promises.push(loadResource(resources[i]));
}
for (let i = 0, l = scriptURLs.length - 1; i < l; i++) {
  promises.push(loadScript(scriptURLs[i]));
}

Promise.all(promises)
.then( () => {
    loadScript(scriptURLs[scriptURLs.length - 1])
    .then( () => {
      document.getElementsByClassName('loading')[0].classList.add('hide');
      setTimeout(() => document.getElementsByClassName('loading')[0].classList.add('nodisplay'), 1000);
      console.log('all scripts loaded');
    })
    .catch( () => {
      console.log('main script not loaded');
    });
})
.catch ((rsrc) => {
  console.log(rsrc + ' failed to load');
});

const prevButtonMarkup = `
<svg version="1.1" viewBox="0 0 975 485" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xlink="http://www.w3.org/1999/xlink">
 <path class="sign" d="m193.11 7.9534h776.94v471.82h-776.94l-187.16-235.91z" fill="none" opacity=".995" stroke="#000" stroke-linejoin="round" stroke-width="7.9068"/>
 <g transform="translate(55.903 -10.328)">
  <g transform="translate(-112.9,-114.41)">
   <g id="word-prev" transform="translate(-370.97,204.08)" opacity=".997">
    <path id="prev-R" d="m894.42 60.394c-0.35722-14.794-34.034-15.8-29.161 4.0833 17.183 70.108 2.2752 113.02-16.007 167.21-5.481 16.249 23.645 24.125 27.804 5.2909 9.2959-42.094 12.938-67.299 16.439-86.398 4.2078-22.952 16.218-79.137 52.996-67.767 10.626 3.285 17.163 12.867 21.092 26.681 6.525 22.941 28.754 2.0661 28.239-11.799-10.407 8.7849-13.984 13.618-16.544-3.2136-8.1547-53.618-77.86-36.44-84.236 5.7855 0.27344-13.302-0.30172-26.582-0.62276-39.877z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" opacity="1" shape-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
    <path id="prev-E" d="m1089.9 54.952c-53.404 3.5998-107.09 51.719-108.77 103.3-1.4213 43.744 30.254 77.725 68.176 81.407 20.609 2.0008 37.518-3.7808 53.466-14.482 20.428-13.707 52.598-51.221 43.798-78.125-15.468 38.095-45.264 60.713-54.99 65.177-43.916 20.154-87.129-7.7729-87.254-52.319-0.052-18.595 9.7239-42.34 27.912-57.332 27.598-22.747 70.38-39.471 78.61-17.609 18.456 49.026-60.579 65.943-81.281 59.767-19.491-5.8147-19.602 29.906 1.1221 25.733 26.664-5.3688 57.098-9.392 80.858-29.294 31.197-26.132 27.844-89.559-21.65-86.223z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" opacity="1" shape-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
    <g id="prev-P">
     <path d="m745.02 125.12c0.23208-27.058 23.415-52.33 60.114-46.884 54.715 8.1195 41.72 151.1-20.517 136.93-29.671-6.755-31.169-25.508-37.061-37.765-1.3907 19.517 1.2359 42.622 16.995 52.891 35.321 23.017 78.254 7.9239 92.238-51.697 10.588-45.142 8e-3 -108.8-41.864-121.13-23.055-6.7898-54.276 2.2109-69.946 23.358 0 0 0.55167-0.96144 1.6714-23.102 0.55747-11.023-25.926-16.617-25.411 2.8173 1.9665 74.174 3.7796 25.869 1.2998 45.041-5.629 43.52-42.81 153.64-55.754 201.95-9.3079 34.743 3.0061 51.884 18.483 54.184 20.859 3.1003 33.252-14.621 36.979-44.62 6.467-52.056 19.023-144.18 22.771-191.98zm-17.917 24.171c-13.519 26.116-22.352 191.01-37.97 185.08-8.6844-3.3024 37.264-166.15 37.97-185.08z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" opacity="1" shape-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
    </g>
    <g id="prev-V" transform="translate(-5.0508)" opacity=".995">
     <path d="m1245.1 81.879c-9.8131 73.316-34.38 101.43-75.124 136.57 19.986-41.716 14.186-116.96 13.484-162.08-0.2344-15.06-28.035-16.451-23.305 4.0441 8.6139 37.328 5.8022 111.07-12.309 170.65-3.5127 11.556 3.4842 24.057 23.948 8.1236 64.355-46.071 85.126-99.408 91.16-150.72 2.145-18.241 7.4067-27.305 27.839-39.167-17.682-5.7897-42.635 9.728-45.694 32.579z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" opacity="1" shape-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
    </g>
   </g>
  </g>
 </g>
<g fill="#008000">
  <path class="word-apple-leaf leaf-P1" d="m225.06 140.85c56.102-21.817 64.829 1.2467 64.829 1.2467s-20.571 28.674-64.829-1.2467z"/>
  <path class="word-apple-leaf leaf-P2" d="m253.08 146.24c56.102-21.817 64.829 1.2467 64.829 1.2467s-20.571 28.674-64.829-1.2467z"/>
  <path class="word-apple-leaf leaf-V" d="m767.97 133.77c56.102-21.817 64.829 1.2467 64.829 1.2467s-20.571 28.674-64.829-1.2467z"/>
 </g>
</svg>
`;


const nextButtonMarkup = `
<svg version="1.1" viewBox="0 0 975 485" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xlink="http://www.w3.org/1999/xlink">
 <path class="sign" d="m782.89 479.78h-776.94v-471.82h776.94l187.16 235.91z" fill="none" opacity=".995" stroke="#000" stroke-linejoin="round" stroke-width="7.9068"/>
 <g transform="translate(-64.895 -37.708)">
  <g transform="translate(-112.9,-114.41)">
   <g id="word-next" transform="translate(188.52,115.39)" opacity=".997">
    <path id="next-E" d="m292.36 231.65c-33.626 67.3-1.1376 136.89 75.765 125.57 43.482-6.4049 85.209-50.57 82.517-89.061-17.189 33.862-58.885 63.579-81.321 66.709-32.859 4.5845-53.513-5.1219-61.174-21.579-7.5281-16.174-14.518-41.451 2.875-76.234 13.385-26.769 69.685-57.348 85.116-36.167 21.054 28.9-32.029 67.163-64.817 59.369-23.841-5.6668-23.646 32.366-2.7519 28.312 28.74-5.577 51.417-13.452 73.724-31.431 47.645-38.4 19.353-85.033-24.017-82.476-38.16 2.2498-71.422 27.985-85.916 56.993z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" opacity="1" shape-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
    <path id="next-X" d="m554.73 171.79c-23.953 19.473-39.181 31.753-56.083 51.646-10.554-21.769-24.169-38.336-35.277-48.492-12.985-12.79-29.145 6.31-17.66 17.592 14.703 14.022 28.811 33.923 38.99 52.893-14.226 23.12-18.584 31.421-35.09 56.188-7.7264 11.593-17.312 30.061-43.367 53.428 21.437-5.0279 40.103-19.93 54.449-36.341 14.895-17.039 24.008-34.604 35.99-51.398 9.5373 20.132 10.27 28.011 14.908 46.411 16.268 64.54 63.442 42.697 62.758 16.663-8.3685 5.9635-29.976 32.487-45.521-23.969-6.1762-22.43-8.2897-34.541-18.8-58.849 20.974-26.302 33.991-39.951 57.121-55.236 13.247-8.7541-2.757-28.388-12.417-20.535z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" opacity="1" shape-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
    <g id="next-T" transform="translate(2.014,4.0281)">
     <path d="m642.18 107.98c-5.5526 0.0204-11.642 3.2832-14.4 10.217-3.1551 12.601-13.159 38.717-23.141 69.18-18.15 5.856-35.837 12.691-52.861 19.479-15.755 6.2813-7.0129 33.643 13.469 24.709 10.831-4.7245 20.545-8.9053 29.75-12.836-25.017 67.832-28.133 144.64 32.002 142.03 23.347-1.0123 46.014-38.57 30.791-65.347-3.5093 28.239-12.036 43.567-36.997 41.241-34.538-3.2189-18.832-72.969-1.255-128.28 29.863-12.397 17.54-6.427 43.011-16.02 20.77-7.8225 27.01-23.819 23.957-38.831-7.2593 10.772-10.379 12.47-27.804 17.942-7.5 2.3555-17.441 5.7638-29.533 8.7602 8.933-24.431 17.684-44.496 21.822-52.889 6.2716-12.487-0.69516-19.383-8.8106-19.354z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" opacity="1" shape-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
    </g>
    <g id="next-N" transform="translate(0,-4.0281)">
     <path d="m233.89 175.42c-7.0657-0.23733-23.541-0.7243-40.553 21.707-8.2706 10.905-14.815 21.722-24.353 46.261-1.1633-17.28 1.2499-35.246-1.6303-52.398-3.089-16.21-29.987-5.3944-27.225 4.3839 8.4718 50.451 10.466 106.16 4.3357 157.1-1.2714 15.241 22.372 19.837 24.118 2.135 9.0274-56.457 3.1084-133.21 52.568-158.55 9.0608-4.6423 28.609 0.0195 36.386 16.203 11.73 24.408-3.7396 20.164-17.947 136.08-3.5273 28.779 12.479 53.779 40.4 53.633 11.861-0.0618 34.696-15.358 32.315-44.448-26.928 49.45-53.208 24.272-51.996-7.0414 3.0505-78.774 25.973-103.23 19.528-134.03-4.5548-21.764-14.569-28.398-26.219-35.244-5.825-3.4228-12.661-5.5478-19.727-5.7852z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" opacity="1" shape-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
    </g>
   </g>
  </g>
 </g>
 <g fill="#008000">
  <path class="word-apple-leaf leaf-N" d="m93.2 194.84c56.102-21.817 64.829 1.2467 64.829 1.2467s-20.571 28.674-64.829-1.2467z"/>
  <path class="word-apple-leaf leaf-T1" d="m628.19 135.76c56.102-21.817 64.829 1.2467 64.829 1.2467s-20.571 28.674-64.829-1.2467z"/>
  <path class="word-apple-leaf leaf-T2" d="m628.19 135.76c56.102-21.817 64.829 1.2467 64.829 1.2467s-20.571 28.674-64.829-1.2467z"/>
 </g>
</svg>
`;

const soundButtonMarkup = `
<svg version="1.1" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">

 <path class="speakercone" d="m162.84 51.342-76.463 44.805h-42.11c-8.8653 0-8.8653 0-8.8653 8.8662v91.986c0 8.8662 0 8.8662 8.8653 8.8662h42.11l76.463 44.807c6.649 4.4331 6.649 4.4331 6.649-4.4331v-190.46c0-8.8662 0-8.8662-6.649-4.4331z" stroke="#000" stroke-linejoin="round" stroke-width="10"/>
 <g class="soundwaves" transform="matrix(1.1082 0 0 1.1083 -43.907 -22.597)" fill-opacity="0" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="9.0235">
  <path d="m232.69 77.632a101.79 105.36 0 0 1 34.452 78.551 101.79 105.36 0 0 1-33.788 78.859" opacity=".995"/>
  <path d="m217.88 101.83a78.929 81.702 0 0 1 0.48018 109.08" opacity=".995"/>
  <path d="m246.27 53.639a124.56 128.93 0 0 1 49.644 102.2 124.56 128.93 0 0 1-48.411 102.83" opacity=".995"/>
 </g>
 <path class="nope hide" d="m19.474 19.598a5.5408 5.5414 0 0 0-3.8937 1.6234 5.5408 5.5414 0 0 0 0 7.8358l122.14 122.15-122.14 122.15a5.5408 5.5414 0 0 0 0 7.8358 5.5408 5.5414 0 0 0 7.835 0l122.14-122.15 122.14 122.15a5.5408 5.5414 0 0 0 7.835 0 5.5408 5.5414 0 0 0 0-7.8358l-122.14-122.15 122.14-122.15a5.5408 5.5414 0 0 0 0-7.8358 5.5408 5.5414 0 0 0-3.9413-1.6234 5.5408 5.5414 0 0 0-3.8937 1.6234l-122.14 122.15-122.14-122.15a5.5408 5.5414 0 0 0-3.9413-1.6234z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" shape-rendering="auto" solid-color="#000000" stop-color="#000000" stroke="#fff" stroke-linecap="round" stroke-width="10" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;paint-order:markers stroke fill;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
</svg>`;


const aboutLogoMarkup = `
<svg version="1.1" viewBox="0 0 943.84 547.91" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xlink="http://www.w3.org/1999/xlink">
 <defs>
  <linearGradient id="linearGradient1097" x1="568.99" x2="577.15" y1="-145.69" y2="-127.47" gradientTransform="matrix(1.3611,0,0,1.3611,-205.09,46.631)" gradientUnits="userSpaceOnUse">
   <stop stop-color="#f00" offset="0"/>
   <stop stop-color="#540000" offset="1"/>
  </linearGradient>
  <filter id="filter3713" x="-.0096166" y="-.016776" width="1.0192" height="1.0336" color-interpolation-filters="sRGB">
   <feGaussianBlur stdDeviation="3.7281432"/>
  </filter>
 </defs>

 <use class="logo-shadow" transform="translate(7,12)" width="100%" height="100%" filter="url(#filter3713)" opacity=".36449" xlink:href="#g2257"/>
 <g id="g2257" transform="translate(-37.391 -78.963)">
  <g transform="matrix(.68808 -.10229 .10229 .68808 104.77 431.21)" stroke-width="1.4375">
   <path d="m745.02 125.12c0.23208-27.058 24.88-58.504 60.114-46.884 65.447 21.583 49.975 143.58-20.517 121.68-29.671-6.755-35.655-26.405-41.547-38.662-1.3907 19.517 1.2359 42.622 16.995 52.891 31.982 23.845 96.893 22.21 107.49-57.08 5.9207-44.307-10.757-86.884-52.629-99.6-22.997-6.9836-54.276 2.2109-69.946 23.358 0 0 0.55167-0.96144 1.6714-23.102 0.55747-11.023-25.926-16.617-25.411 2.8173 1.9665 74.174 3.7796 25.869 1.2998 45.041-5.629 43.52-42.81 153.64-55.754 201.95-9.3079 34.743 3.0061 51.884 18.483 54.184 20.859 3.1003 33.252-14.621 36.979-44.62 6.467-52.056 19.023-144.18 22.771-191.98zm-17.917 24.171c-13.519 26.116-22.352 191.01-37.97 185.08-8.6844-3.3024 37.264-166.15 37.97-185.08z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" shape-rendering="auto" solid-color="#000000" stop-color="#000000" stroke-width="2.5533" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
  </g>
  <g shape-rendering="auto">
   <path d="m223.77 250.54c5.2516-15.624 3.7603-34.254 12.15-43.07-11.541-0.0308-21.694 15.373-27.312 28.929-31.938 77.06-143.16 58.379-143.73-40.015-0.44486-76.883 87.767-125.31 145.1-40.284 10.935 12.369 29.074-3.7059 17.011-19.987-52.898-71.397-183.55-72.649-185.68 57.582-1.9923 121.99 148.44 158.04 182.46 56.844z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
   <path d="m239.48 156.53c104.19-10.067 98.667 93.053 57.687 118.87-37.483 23.613-65.786 6.1473-81.142-17.496-16.331-25.145-13.129-68.315 23.495-78.922 11.58-3.3535 16.73 0.7295 22.355 7.2786-11.878-0.70828-13.617-0.25802-20.11 3.0059-30.042 15.103-22.327 47.619-11.714 60.224 11.714 13.912 33.425 21.311 55.052 9.6706 26.704-14.372 41.593-88.262-42.181-84.644-12.887 0.55654-13.045-17.059-3.4419-17.987z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
   <path d="m416.44 162.41c-5.9175 0-10.198 3.823-12.893 7.6573-2.6954 3.8343-4.5365 8.3704-6.0306 13.551-2.9883 10.361-4.3727 23.338-3.6559 36.582 0.37215 6.8759 1.3364 13.799 3.0385 20.435-15.518 26.477-43.21 26.602-49.766-3.5716-4.2634-19.623 3.5558-47.342 10.857-60.29 7.569-13.423-10.355-22.929-16.385-8.0448-7.1723 17.702-13.619 45.812-10.568 70.005 4.9381 39.151 43.265 55.816 73.258 19.999 16.658 19.386 38.414 8.9041 45.84-0.17612-13.999 2.8626-26.248 0.27301-32.367-8.6612-1.0649-1.8363-2.0095-3.9022-2.8636-6.0959 5.2638-8.4275 9.9088-17.4 13.635-26.185 5.1725-12.194 8.5519-23.804 8.1061-34.154-0.22291-5.1751-1.4745-10.373-5.0508-14.581-3.5763-4.2083-9.3533-6.4689-15.154-6.4689zm0.88289 16.275c1.2279 0.10303 1.6561 0.33734 1.9407 0.67217 0.35755 0.42074 1.0878 1.8765 1.2137 4.8 0.25186 5.847-2.2019 16.214-6.8355 27.138-1.0863 2.561-2.3189 5.1657-3.6285 7.7753-0.58805-11.4 0.73781-22.94 3.0532-30.968 1.1664-4.0441 2.6374-7.189 3.7191-8.7277 0.38528-0.54806 0.44646-0.58548 0.53731-0.68903z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
   <path d="m455.27 157.64c-2.7279 0.71273-10.379 4.5989-6.5401 13.05 7.2371 15.931 3.3085 6.4162 9.1819 21.161-7.9256 20.398-33.135 79.966 1.2576 83.025 26.572 2.3634 25.922-34.998 15.69-79.527 3.2055-17.602 22.163-27.128 39.665-22.888 17.188 2.7183 12.278 26.446 10.208 36.494-3.8733 18.801-15.969 43.527-0.91616 61.148 10.399 12.173 36.182 0.59618 39.224-18.494 1.9917-3.7275-11.755 9.9666-19.601 9.8857-14.216-0.14662 0.23335-47.766 0.50425-49.303 4.0386-22.921 9.1132-52.969-26.966-57.464-25.046-1.0999-41.559 7.9516-48.287 21.505-2.4874-11.966-0.20411-3.9837-2.3206-12.483-1.7392-6.9848-5.9759-7.4473-11.1-6.1084zm8.8161 57.469c-0.2368-0.21345 6.9223 39.085-4.9938 38.429-9.4051-0.51815 4.9938-38.429 4.9938-38.429z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
  </g>
  <g transform="matrix(1.0787 .01515 -.01515 1.0787 -38.147 69.938)" shape-rendering="auto" stroke-width=".92692">
   <path d="m409.21 203.09c-40.51 2.9716-52.682 72.77-59.413 104.95-6.5966 31.54-10.162 54.441-22.322 82.314-7.8295 17.947 15.271 26.117 22.625 10.708 23.392-43.375 16.208-172.16 59.918-176.78 17.755-1.878 20.07 11.056 22.346 25.126 5.909 36.533 10.214 73.933 13.837 106.78 1.6 14.505 4.776 45.529 32.318 47.809 17.002 1.4069 23.725-12.845 21.85-23.441 0.52916 5.869-25.781 21.87-31.869-14.902-9.1786-55.434-14.107-97.452-18.734-127.62-3.7889-24.703-25.553-36.047-40.556-34.946z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
   <path d="m297.11 330.83s80.668-15.934 109.3-16.685c5.4454-0.1428 11.088-0.31561 20.379 0.51161 12.26 1.0915 10.146-18.969-0.14387-19.328-6.8485-0.23907-9.5693 0.16822-19.881 0.6365-35.011 1.5899-75.358 10.797-109.65 34.865z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
  </g>
  <path d="m886.39 423.83c5.0797 43.466 65.096 19.422 64.555 43.679-0.71651 32.129-71.566 28.78-62.568-19.191-41.228 61.782 78.423 74.867 78.941 16.398 0.33471-37.789-77.425-17.441-65.27-49.016 10.157-26.384 56.456-23.051 49.101 3.5501-3.6663 13.26 15.464 13.454 15.748 3.2189 1.693-61.143-85.717-43.23-80.506 1.3618z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" shape-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
  <g transform="matrix(.78231 0 0 .78231 110.24 -3.5104)" stroke-width="1.2783">
   <path d="m642.18 107.98c-5.5526 0.0204-11.642 3.2832-14.4 10.217-3.1551 12.601-13.159 38.717-23.141 69.18-18.15 5.856-21.936 7.0591-39.759 11.33-10.616 2.5439-8.607 30.271 8.5157 25.827 11.438-2.9682 11.917-2.6737 21.601-5.8055-25.017 67.832-28.133 144.64 32.002 142.03 23.347-1.0123 46.014-38.57 30.791-65.347-3.5093 28.239-12.036 43.567-36.997 41.241-34.538-3.2189-18.832-67.856-1.255-123.17 25.868-9.0415 25.849-8.5042 37.898-13.463 20.524-8.4473 25.093-19.984 22.04-34.996-6.6202 5.3394-6.704 6.2384-24.129 11.71-7.5 2.3555-13.606 3.6866-25.698 6.683 8.933-24.431 17.205-47.692 21.343-56.085 6.2716-12.487-0.69516-19.383-8.8106-19.354z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" shape-rendering="auto" solid-color="#000000" stop-color="#000000" stroke-width="2.047" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
  </g>
  <path d="m650.59 161.35c-10.434 14.474-17.971 48.542-16.151 71.431 1.9432 24.439 13.43 43.406 33.893 42.822 20.289-0.57894 27.831-28.456 27.831-28.456-13.485 12.128-31.827 23.583-39.437 0.0303-5.2964-16.392-7.3929-40.989 13.961-75.351 6.3981-10.296-7.1787-28.396-20.096-10.477z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
  <g class="logo-word-apple" transform="matrix(1.1578 .0038925 -.0038925 1.1578 10.412 289.74)" stroke-width=".86369">
   <path id="word-apple-stem" d="m569.98-153.53c0.45216-3.6963-0.31035-6.6281 1.8927-11.426l3.47 1.0037c-0.99441 1.2204-3.9124 6.3833-3.9105 10.173 9.3e-4 1.8726-0.4016-1.5396-1.4522 0.24932z" fill="#fff" stroke-width=".77458"/>
   <g class="word-apple-fruit">
    <path d="m570.95-155.39c-7.3575-6.7104-17.305-2.6642-16.613 8.9215 0.69178 11.586 3.7422 18.449 13.473 17.152 9.209 3.5339 13.131-1.206 16.792-13.373 3.6614-12.167-7.1885-17.172-13.652-12.701z" fill="url(#linearGradient1097)" stroke-width=".86369"/>
    <path d="m556.71-146.71c-2.0396-3.9969 2.5022-12.469 10.659-8.791-6.1292 1.6207-8.6249 4.4768-10.659 8.791z" fill="#fff" stroke-width=".77458"/>
   </g>
   <path id="word-apple-leaf" d="m585.44-162.2c-2.19 5.0288-10.03 7.9801-14.594 6.4784-0.0412-4.3492 6.524-7.6403 14.594-6.4784z" fill="#008000" stroke-width=".77458"/>
  </g>
  <path id="word-N" d="m769.03 147.24c-11.374-0.9364-28.903 7.9943-37.413 22.032-0.0385-0.2825-2.8237 5.143-2.9263 3.7887-1.7726-23.393-28.478-10.357-20.989 4.6186 1.5485 7.1441 5.5357 6.5697 6.3735 17.966-3.9327 9.7605-9.1174 19.751-11.295 29.474-2.2171 9.8987-3.4608 18.969-3.1081 26.76 0.1764 3.8949 0.58975 7.4928 2.5117 11.418 1.922 3.925 7.5549 8.7406 13.569 8.7161 6.5769-0.0268 11.433-4.8309 13.499-8.5156 2.0659-3.6847 2.9887-7.3549 3.7463-11.461 1.5152-8.212 1.9075-18.168 1.8244-28.922-0.0598-7.7334-2.8957-22.264-3.3877-30.086 3.0363-9.6805 15.75-26.683 36.569-24.965 20.819 1.7181 19.133 32.204 17.126 47.436-2.6525 17.754-5.8785 29.611-3.33 41.822 2.2673 10.867 9.622 15.504 17.298 13.959 5.6584-1.1393 9.9558-4.9308 11.83-10.286-4.9854 2.8038-9.2933 5.9606-13.737 1.5415-6.8937-6.8563 5.1452-49.5 6.3253-58.289 2.594-32.884-9.7247-54.957-34.486-57.002zm-47.874 66.108s6.0164 36.332-3.7902 35.651c-9.8066-0.68104 3.7902-35.651 3.7902-35.651z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
  <path id="word-G" d="m903.48 152.81c-0.65973-0.13939-1.3173-0.22898-1.9676-0.26414-4.0856-0.22091-8.4495 1.9692-10.905 4.5217-6.0886 7.3673-7.294 17.096-7.7829 27.17-0.59487 7.5254-0.15581 21.019-0.37247 30.556-5.5122 8.761-13.561 14.805-17.38 17.353-31.477 21.004-48.1-7.4729-41.103-33.732 2.8426-10.668 29.096-39.261 44.325-30.124 13.63 9.4685 24.829-8.7576 10.687-16.353-23.933-13.555-61.436 11.94-68.994 43.139-9.8962 31.924 12.898 91.242 72.821 39.041-64.191 31.376-97.753 139.34-25.713 140.89 37.684 0.80896 43.81-91.854 45.096-132.52 32.618-18.404 27.458-36.66 27.458-36.66s-11.36 13.184-26.694 18.307c0.0845-3.9864-0.20057-2.9465-0.12246-6.7023 3.0151-5.6012 5.7894-11.335 8.0713-17.065 3.6634-9.2 6.201-17.941 6.4911-26.273 0.14508-4.1662-0.1276-8.4565-2.5322-12.961-2.1041-3.9411-6.7687-7.3448-11.387-8.3224zm-2.6482 17.915c8.2264 1.3707-4.9985 28.604-4.9985 28.604s-3.2279-29.975 4.9985-28.604zm-14.348 78.157c-1.526 28.231-7.8386 110.5-33.731 107.41-48.536-5.7832-4.3148-96.935 33.731-107.41z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
  <path id="word-L" d="m748.41 311.69c-43.308-2.8983-26.987 105.17-12.273 138.59-6.5058 16.266-10.56 22.415-21.317 33.798-10.758 11.385 2.4025 21.713 11.917 9.9813 9.5153-11.731 10.89-13.46 16.758-24.679 12.126 23.728 29.654 34.986 54.412 38.802-28.606-8.9888-37.896-40.518-43.31-60.837 21.671-54.289 32.715-133.27-6.1873-135.66zm0.0184 21.74c11.301 0.0757 8.4099 72.704-2.8796 96.138-13.107-30.444-8.4213-96.215 2.8796-96.138z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
  <g transform="matrix(.69859 -.13857 .13857 .69859 -12.581 525.77)" stroke-width="1.4041">
   <path d="m750.01 22.16c7.8442-21.349 25.549-44.317 57.817-40.835 55.377 5.9749 67.947 121.86-14.808 115.36-30.337-2.3816-33.072-10.918-38.964-23.175-1.3907 19.517 14.874 39.12 32.854 44.644 26.094 8.0168 70.34 1.8742 81.454-40.279 13.635-51.716 0.22172-108.03-50.745-117.32-23.644-4.3138-54.276 2.2109-69.946 23.358 0 0 0.55167-0.96144 1.6714-23.102 0.55747-11.023-25.861-16.619-25.411 2.8173 0.22812 9.8588 2.6625 20.318 0.56685 49.685-30.239 55.723-104.42 218.83-44.612 230.86 71.935 14.461 70.091-187.73 70.123-222.01zm-20.214 30.22c2.3835 18.843-12.497 175.12-46.044 164.45-25.458-8.0974 35.697-150.1 46.044-164.45z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" shape-rendering="auto" solid-color="#000000" stop-color="#000000" stroke-width="2.4939" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
  </g>
  <path id="next-E" d="m783.5 414.01c-29.127 42.609-13.531 92.936 39.794 92.409 30.151-0.30093 62.628-26.43 64.386-52.843-14.839 21.413-45.948 37.726-61.49 37.762-22.761 0.0536-35.895-8.4685-39.568-20.368-3.6094-11.695-6.0046-29.527 9.0588-51.547 11.592-16.947 52.708-32.484 61.223-16.65 11.617 21.605-28.029 42.665-49.588 34.311-15.676-6.0735-19.088 19.795-4.509 18.987 20.054-1.1121 36.201-4.3512 53.038-14.492 35.962-21.659 21.079-55.992-8.6374-58.296-26.146-2.0272-51.152 12.365-63.707 30.73z" color="#000000" color-rendering="auto" dominant-baseline="auto" image-rendering="auto" shape-rendering="auto" solid-color="#000000" stop-color="#000000" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;font-variation-settings:normal;inline-size:0;isolation:auto;mix-blend-mode:normal;shape-margin:0;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
 </g>
</svg>
`;
