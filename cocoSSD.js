const status = document.getElementById('status');
status.innerText = 'Loaded TensorFlow.js - version: ' + tf.version.tfjs;

const demosSection = document.getElementById('demos');

// Keep track of model and status.
let modelHasLoaded = false;
let model = undefined;

// Before we can use SSD we must wait for it to finish loading. 
cocoSsd.load()
.then((loadedModel) => {
  model = loadedModel;
  modelHasLoaded = true;
  // Show demo section now model is ready to use.
  demosSection.classList.remove('invisible');
});

const imageContainers = document.getElementsByClassName('classifyOnClick');

for (let i = 0; i < imageContainers.length; i++) {
  // Add event listener to the child element which is the img element.
  imageContainers[i].children[0].addEventListener('click', handleClick);
}

function handleClick(event) {
  if (!modelHasLoaded) {
    return;
  }

  model.detect(event.target)
  .then(function (predictions) {
    const h3 = document.createElement('h3');
    h3.innerText = `Model prediction: 
                    class: ${predictions[0].class}
                    score:  ${predictions[0].score}
                    bbox:  ${predictions[0].bbox}`;
    
    const child = event.target.parentNode.children[1];
    event.target.parentNode.replaceChild(h3, child);
    console.log(predictions)
  });
}


