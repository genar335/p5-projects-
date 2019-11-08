let widthArray = [];
let canvasHeight = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
); //For y values
let canvasWidth = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
); // For x values
let m = 0;
let n = 0;

let context = new AudioContext();
let osc = context.createOscillator();
osc.connect(context.destination);

//osc.start();

function playSound(buffer) {
  let source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(0);
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  //frameRate(60);

  for (i = 0; i < canvasWidth; i++) {
    widthArray[i] = Math.round(randomNumberFromHeight(0, canvasHeight));
  }
  background(0);
  frameRate(60);
  i = 0;
}

function randomNumberFromHeight(min, max) {
  return Math.random() * (max - min) + min;
}

function swap(array, a, b) {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

function draw() {
  background(0);

  if (i < widthArray.length) {
    for (j = 0; j < widthArray.length - i - 1; j++) {
      let a = widthArray[j];
      let b = widthArray[j + 1];

      if (a > b) {
        swap(widthArray, j, j + 1);
      }
    }
  } else {
    noLoop();
  }

  for (m = 0; m < widthArray.length; m++) {
    stroke("white");
    line(m, canvasHeight, m, canvasHeight - widthArray[m]);
  }
  i++;
}

function sorty() {
  for (i = 0; i < widthArray.length; i++) {
    for (j = 0; j < widthArray.length - i - 1; j++) {
      let a = widthArray[j];
      let b = widthArray[j + 1];

      if (a > b) {
        swap(widthArray, j, j + 1);
      }
    }
  }
}
