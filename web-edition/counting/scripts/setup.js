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
    console.log(rsrc);
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
      loadedAssets.push(resource);
    } else {
      resource.onload = () => {
        resolve(rsrc.url);
        loadedAssets.push(resource);
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
  {url:`${ASSET_PATH}/audio/zero.wav`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/one.wav`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/two.wav`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/three.wav`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/four.wav`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/five.wav`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/six.wav`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/seven.wav`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/eight.wav`, resourceType:`audio`},
  {url:`${ASSET_PATH}/audio/nine.wav`, resourceType:`audio`}
];


const loadedAssets = [

]


let promises = [];

for (let i = 0, l = resources.length; i < l; i++) {
  promises.push(loadResource(resources[i]));
}
for (let i = 0, l = scriptURLs.length - 1; i < l; i++) {
  promises.push(loadScript(scriptURLs[i]));
}

console.log(promises);

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
