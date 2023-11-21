let context;
let masterGain;
let particles = []
let volumeMeter;

let scheduleTime;
let scheduleTick;


function setup() {
  context = new AudioContext();
  masterGain = context.createGain();
  masterGain.connect(context.destination);

  scheduleTime = context.currentTime + 0.25;
  scheduleTick = 0;
  metro();

  createCanvas(window.innerWidth, window.innerHeight);

}


function metro() {
  if (context.currentTime >= scheduleTime) {

    if (scheduleTick % 1 == 0) {
      makeParticle(random(width), random(height));
    }
    scheduleTime = scheduleTime + 0.1;
    scheduleTick += 1;
  }
  setTimeout(metro, 30);
}


function draw() {
  background(0);
  for(const p of particles) {
    fill(p.color.r, p.color.g, p.color.b, p.color.a);
    ellipse(p.x , p.y, 40, 40);
    p.x += p.xDir;
    p.y += p.yDir;
    p.color.a -= 1;
    if (p.color.a < 0) p.life = false;
  }
  particles = particles.filter(p => p.life);
}

function makeParticle(x, y) {
  let osc = context.createOscillator();
  osc.frequency.value = midicps(choose([48, 52, 55, 59, 60,64,67,71,72,79]));
  let gain = context.createGain();
  gain.gain.value = 0.0;
  osc.connect(gain);
  gain.connect(masterGain);
  osc.start();
  gain.gain.linearRampToValueAtTime(0.03, context.currentTime + 0.3);
  gain.gain.linearRampToValueAtTime(0.0, context.currentTime + 1.3);
  osc.stop(context.currentTime + 1.4);

  particles.push({ 
      x : x,
      y : y,
      xDir: random(-3,3),
      yDir: random(-3,3),
      color: {
        r: random(255),
        g: random(255),
        b: random(255),
        a: 100
      },
      life: true
		 });
}

function mousePressed() {
  makeParticle(mouseX, mouseY);
}

function mouseDragged() {
  makeParticle(mouseX, mouseY);
}


function choose(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

function midicps(note) {
  let a = 440; //frequency of A (coomon value is 440Hz)
  return (a / 32) * (2 ** ((note - 9) / 12));
}
