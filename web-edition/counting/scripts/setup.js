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
    let resource = document.createElement(rsrc.resourceType);
    resource.src = rsrc.url;
    console.log(rsrc);
    resource.async = false;
    resource.onload = () => {
      resolve(rsrc.url);
    };
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
  {url:`${ASSET_PATH}/images/apple.png`, resourceType:`img`}
  // {url:`${ASSET_PATH}/audio/zero.wav`, resourceType:`audio`}
];


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
      console.log('all scripts loaded');
    })
    .catch( () => {
      console.log('main script not loaded');
    });
})
.catch ((rsrc) => {
  console.log(rsrc + ' failed to load');
});
