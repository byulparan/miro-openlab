
class Circle {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.size = random(10, 50);
    this.lifeTime = 255;
    this.color = color(random(0,255), random(0,255), random(0,255));
  }
  draw() {
    this.color.setAlpha(this.lifeTime);
    if(random(0,10) > 5) {
      noFill();
      stroke(this.color);
    } else {
      noStroke();
      fill(this.color);
    }
    this.size += sin(millis()) * 10;
    ellipse(this.x, this.y, this.size, this.size);
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

  for(let i = 0; i < circles.length; i++) {
    circles[i].draw();
    if(i != (circles.length-1)) {
      stroke(circles[i+1].color);
      line(circles[i].x, circles[i].y, circles[i+1].x, circles[i+1].y);
    }
    if(circles[i].lifeTime > 0) {
      tempCircles.push(circles[i]);
    }
  }


  circles = tempCircles;
}



function oscillation(x) {
  let now = audioCtx.currentTime;
  let osc = audioCtx.createOscillator();
  let gain = audioCtx.createGain();
  osc.frequency.value = noteToFreq(choose([48,55,60,64,67,71,72,74,79,83,84]));
  gain.gain.value = 0.0;
  gain.gain.linearRampToValueAtTime(0.05, now+0.4);
  gain.gain.linearRampToValueAtTime(0.0, now+1.8);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now+2.0);
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
  let circle = new Circle(mouseX, mouseY);
  circles.push(circle);
  oscillation(mouseX/width);
}


function noteToFreq(note) {
  let a = 440;
  return (a / 32) * (2 ** ((note - 9) / 12));
}

function choose(array) {
  let indx = Math.floor(Math.random() * array.length);
  return array[indx];
}