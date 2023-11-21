
let initialized = false;
let audioCtx = new AudioContext();
let oscils = [];

let pg;

let size = 300;
let positions = [];
let rotations = [];
let lastTime = 0;

function setup() {
  pixelDensity(1.0);
  let canvas = createCanvas(windowWidth , windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-10');
  
  pg = createGraphics(width,height, WEBGL);
  background(0);
  for(let i = 0; i < size; i++) {
    positions.push({x: random(-8,8), y: random(-8,8), z: random(-8,8)});
    rotations.push(random(0, TAU));
  }

  lastTime = audioCtx.currentTime;
}

function draw() {
  let time = 0.0
  if(initialized) { 
    time = millis() * 0.001; 
    let curTime = audioCtx.currentTime;
    if(curTime - lastTime > 4.0) {
      oscils[2].frequency.value = noteToFreq(choose([64,65,67]));
      oscils[4].frequency.value = noteToFreq(choose([72,74,79,82]));
      lastTime = curTime;
    }
  } 
  background(0);
  pg.clear();
  pg.perspective(45.0, width/height, .01, 100.0);
  pg.camera(cos(time*0.5)*10.0, 0.0, sin(time*0.6)*10.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

  pg.fill("darkviolet");
  for(let i = 0; i < size; i++) {
    let pos = positions[i];
    pg.push();
    pg.translate(pos.x, pos.y, pos.z);
    pg.rotateX(rotations[i]+time);
    pg.rotateY(rotations[i]+time);
    pg.rotateZ(rotations[i]+time);
    pg.box(0.5);
    pg.pop();
  }

  image(pg, 0, 0, pg.width, pg.height);
}

function mousePressed() {
  if(!initialized) {
    initialized = true;
    audioCtx.resume();
    sound();
    sfx();
  }
}


function sound() {
  let now = audioCtx.currentTime;
 
  let notes = [48, 60, 64, 70, 74];
  let gain = audioCtx.createGain();
  gain.gain.value = 0.0;
  gain.gain.linearRampToValueAtTime(0.04, now + 2.0);
  for(let note of notes) {
    let osc = audioCtx.createOscillator();
    osc.frequency.value = noteToFreq(note);
    osc.connect(gain);
    oscils.push(osc);
  }
  gain.connect(audioCtx.destination);
  for(let osc of oscils) {
    osc.start(now);
  }
}

function sfx() {
  fetch('/resources/sfx.mp3')
    .then(data => data.arrayBuffer())
    .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
    .then(decodedAudio => {
      let now = audioCtx.currentTime;
      let playSound = audioCtx.createBufferSource();
      let gain = audioCtx.createGain();
      gain.gain.value = 0.0;
      gain.gain.linearRampToValueAtTime(0.6, now + 2)
      playSound.buffer = decodedAudio;
      playSound.loop = true;
      playSound.connect(gain);
      gain.connect(audioCtx.destination);
      playSound.start(now);
    })
}


function noteToFreq(note) {
  let a = 440; //frequency of A (coomon value is 440Hz)
  return (a / 32) * (2 ** ((note - 9) / 12));
}

function choose(array) {
  return array[Math.floor(Math.random() * array.length)];
}