class ShapeMother {
  constructor(tmpX, tmpY, tmpR) {
    this.x = tmpX;
    this.y = tmpY;
    this.brightness = 100;
    this.r = tmpR;
    this.strokeValue = 125;
  }

  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }

  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      console.log("It worked!");
      this.brightness = 255;
    }
  }

  visibilityCheck(brt, strV, strWV) {
    if ((brt || strV || strWV) == 0) {
      return true;
    }
  }
}

class Bubble extends ShapeMother {
  constructor(tmpX, tmpY, tmpR) {
    super(tmpX, tmpY, tmpR);
  }

  show() {
    stroke(this.strokeValue);
    fill(this.brightness, this.strokeValue);
    ellipse(this.x, this.y, this.r);
  }

  clicked(px, py, bubbleX, bubbleY, index) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      console.log("It worked!");
      this.brightness = 255;
      squares[index].x = bubbleX;
      squares[index].y = bubbleY;
      this.brightness = 0;
      this.strokeValue = 0;
      this.strokeWeight = 0;
      if (
        ShapeMother.visibilityCheck(
          this.brightness,
          this.strokeValue,
          this.strokeWeightValue
        ) == true
      ) {
        this.brightness = 50;
        this.strokeValue = 125;
        this.strokeWeight = 3;
      }
    }
  }
}

class Square extends ShapeMother {
  constructor(tmpX, tmpY, tmpSide, tmpR) {
    super(tmpX, tmpY, tmpR);
    this.side = tmpSide;
    this.visibility = 0;
  }

  show() {
    stroke(this.visibility);
    fill(this.brightness, this.strokeValue);
    square(this.x, this.y, this.side, this.r);
  }

  clicked(px, py, squareX, squareY, index) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.side) {
      console.log("It worked!");
      this.brightness = 255;
      bubbles[index].x = squareX;
      bubbles[index].y = squareY;
      this.brightness = 0;
      this.strokeValue = 0;
      this.strokeWeight = 0;
      if (
        ShapeMother.visibilityCheck(
          this.brightness,
          this.strokeValue,
          this.strokeWeightValue
        ) == true
      ) {
        this.brightness = 50;
        this.strokeValue = 125;
        this.strokeWeight = 3;
      }
    }
  }
}

let bubbles = [];
let squares = [];
let shapesCount = 10;
let testShape = new Square(100, 100, 100, 10);

function setup() {
  createCanvas(800, 800);
  background(0);
  frameRate(60);
  for (let i = 0; i < shapesCount; i++) {
    bubbles[i] = new Bubble(random(10, 790), random(10, 790), random(10, 50));
  }
  for (let i = 0; i < shapesCount; i++) {
    squares[i] = new Square(
      random(10, 790),
      random(10, 790),
      random(10, 50),
      1
    );
  }
  console.log(bubbles);
  console.log(squares);
}

function mousePressed() {
  for (let i = 0; i < bubbles.length; i++) {
    let bubbleX = bubbles[i].x;
    let bubbleY = bubbles[i].y;
    bubbles[i].clicked(mouseX, mouseY, bubbleX, bubbleY, i);
  }
  for (let i = 0; i < squares.length; i++) {
    let squareX = squares[i].x;
    let squareY = squares[i].y;
    squares[i].clicked(mouseX, mouseY, squareX, squareY, i);
  }
}

function draw() {
  background(0);

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
  for (let i = 0; i < squares.length; i++) {
    squares[i].move();
    squares[i].show();
  }
}
