
class Circle {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.lifeTime = 255;
    this.color = color(random(0,255), random(0,255), random(0,255));
  }
  draw() {
    noStroke();
    this.color.setAlpha(this.lifeTime);
    fill(this.color);
    ellipse(this.x, this.y, 50, 50);
    this.lifeTime -= 5;
  }
}

let audioCtx = new AudioContext();
let initialized = false;
let circles = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(0);
  let tempCircles = [];
  for(let circle of circles) {
    circle.draw();
  }
  for(let circle of circles) {
    if(circle.lifeTime > 0) {
      tempCircles.push(circle);
    }
  }
  circles = tempCircles;
}

function oscillation(x) {
  let now = audioCtx.currentTime;
  let osc = audioCtx.createOscillator();
  let gain = audioCtx.createGain();
  osc.frequency.value = 1000 * x + 100;
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.setValueAtTime(0.0, now + 0.4);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now+4.0);
}

function mousePressed() {
  if(!initialized) {
    audioCtx.resume();
    initialized = true;
  }
  let circle = new Circle(mouseX, mouseY);
  circles.push(circle);
  oscillation(mouseX/width);
}

function mouseDragged() {
  if (!initialized) {
    audioCtx.resume();
    initialized = true;
  }
  let circle = new Circle(mouseX, mouseY);
  circles.push(circle);
  oscillation(mouseX/width);
}