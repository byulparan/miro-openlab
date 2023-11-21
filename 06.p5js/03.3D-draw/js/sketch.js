
function setup() {
  createCanvas(800, 600, WEBGL);
}

// translate, rotate, scale
function draw() {
  background(0);
  let time = millis() * 0.004;
  camera(0, -100.0, 300, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
  stroke(255);
  noFill();
  push();
  translate(-100,-100,-100);
  cylinder(10, 40);
  pop();
  box(50);
}

