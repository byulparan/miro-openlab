
let capture;
function setup() {
  createCanvas(800, 600, WEBGL);
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  background(0);
  noStroke();
  let time = millis() * 0.004;
  camera(0 , -200, 400, 0, 0, 0, 0, 1, 0);
  texture(capture);
  box(40);

  push();
  rotateY(time);
  translate(200, 0, 0);
  scale(2.0,2.0,2.0);
  fill(0,255,0);
  rotate(time);
  texture(capture);
  box(40);
  pop();
  push();
  translate(-100,0, 0);
  scale(3.0,3.0,3.0);  
  fill(255,255,0);
  rotateX(time);
  rotateY(time);
  rotateZ(time);
  texture(capture);
  box(40);
  pop();
}

