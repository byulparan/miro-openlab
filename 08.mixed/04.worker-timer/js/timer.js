
let context;
let oscillator1;
let gain1;

let scheduleTime;
let scheduleTick;
const schedAhead = 0.25;

let kick;
let snare;
let hihat;

let bpm = 80;
let melodyNote = 69;

init();

function init() {
  context = new AudioContext() ;
  loadSample("statics/kick.wav", buffer => { kick = buffer;});
  loadSample("statics/snare.wav", buffer => { snare = buffer;});
  loadSample("statics/hihat.wav", buffer => { hihat = buffer;});

  timerWorker = new Worker("js/worker.js");

  timerWorker.onmessage = function(e) {
    if (e.data == "tick") {
      metro();
    }
    else {
      console.log("message: " + e.data);
    }
  };
  start();
}

function start() {
  scheduleTime = context.currentTime + 0.25;
  scheduleTick = 0;
  timerWorker.postMessage('start');
  context.resume();
}

function stop() {
  context.close();
  timerWorker.postMessage('stop');
}


function choose(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}


function metro() {
  if (context.currentTime + schedAhead >= scheduleTime) {
    if (scheduleTick % 2 == 0) {
      playSample(scheduleTime, hihat, Math.random() * 0.5 + 0.5);
      melodyNote = choose([69, 72, 74, 79, 83]);
    }

    if (scheduleTick % 16 == 0) {
      playSample(scheduleTime, kick, 1.0); 
    }

    if (scheduleTick % 16 == 8) {
      melodyNote = 69;
      playSample(scheduleTime, snare, 1.0); 
    }


    if (scheduleTick % 32 == 0) {
      chord(scheduleTime);
    }


    melody(scheduleTime);
    scheduleTime = scheduleTime + (60 / bpm / 8);
    scheduleTick += 1;
  }
}





function chord(time) {
  let select = Math.floor(scheduleTick / 32);
  let notes = [ [64, 67, 71, 74], [65, 69, 72, 76] ][select % 2];
  let env = context.createGain();
  let filter = context.createBiquadFilter();
  filter.frequency.value = 1000;
  filter.type = "lowpass";
  
  env.gain.value = 0.0;
  env.connect(filter);
  filter.connect(context.destination);

  for(let i = 0; i < 4; i++) {
    let osc = context.createOscillator();
    osc.frequency.value = midicps(notes[i]);
    osc.type = "sawtooth";
    osc.connect(env);
    osc.start(time);
    osc.stop(time + 4.0);
  }
  env.gain.linearRampToValueAtTime(0.1, time + 2.0 );
  env.gain.linearRampToValueAtTime(0.0, time + 4.0 );
}

function playSample(time, buffer, amp) {
  let src = context.createBufferSource();
  let gain = context.createGain();
  src.buffer = buffer;
  gain.gain.value = amp;
  src.connect(gain);
  gain.connect(context.destination);
  src.start(time);
  src.stop(time + 1.0);
}


function melody(time) {
  let osc = context.createOscillator();
  let env = context.createGain();
  osc.frequency.value = midicps(melodyNote);
  env.gain.value = 0.0;
  env.gain.linearRampToValueAtTime(0.2, time + 0.1);
  env.gain.linearRampToValueAtTime(0.0, time + 0.2);

  osc.connect(env);
  env.connect(context.destination);

  osc.start(time);
  osc.stop(time + 0.3);
}



function loadSample(url, handle) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function() {
    context.decodeAudioData(xhr.response, decoded => {
      handle(decoded);
    });
  }
  xhr.send();
}


function choose(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

function midicps(note) {
  let a = 440; //frequency of A (coomon value is 440Hz)
  return (a / 32) * (2 ** ((note - 9) / 12));
}


document.querySelector('#context')
  .addEventListener('click', event=> {
    if (event.target.value == "start") {
      init();
      event.target.value = "stop";
    } 
    else {
      stop();
      event.target.value = "start";
    }
  } );
