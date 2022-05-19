//setup.js
const SCRIPT_PATH = 'scripts';
const ASSET_PATH = 'assets';
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
        loadedImages.push(resource);
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
  {url:`${ASSET_PATH}/audio/voice_000.mp3`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/voice_001.mp3`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/voice_002.mp3`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/voice_003.mp3`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/voice_004.mp3`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/voice_005.mp3`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/voice_006.mp3`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/voice_007.mp3`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/voice_008.mp3`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/voice_009.mp3`, resourceType:`audio`}
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
<svg width="975" height="485" version="1.1" viewBox="0 0 975 485" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xlink="http://www.w3.org/1999/xlink">
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
<svg width="975" height="485" version="1.1" viewBox="0 0 975 485" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xlink="http://www.w3.org/1999/xlink">
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
