
const context = new AudioContext();
context.suspend();

let scheduleTime;
let scheduleTick;

let melodyNote;
let chordSelect = 0;

let kick;
let snare;
let hihat;

loadSample("statics/kick.wav", buffer => { kick = buffer;});
loadSample("statics/snare.wav", buffer => { snare = buffer;});
loadSample("statics/hihat.wav", buffer => { hihat = buffer;});

melodyNote = 69;

function metro() {
  if (context.currentTime >= scheduleTime) {

    if (scheduleTick % 2 == 0) {
      playSample(hihat, Math.random() * 0.5 + 0.5);
      melodyNote = choose([69, 72, 74, 79, 83]);

    }

    if (scheduleTick % 16 == 0) {
      playSample(kick, 1.0); 
    }

    if (scheduleTick % 16 == 8) {
      melodyNote = 69;
      playSample(snare, 1.0); 
    }


    if (scheduleTick % 32 == 0) {
      chord(chordSelect);
      chordSelect += 1;
    }


    melody();
    scheduleTime = scheduleTime + 0.1;
    scheduleTick += 1;
  }
  setTimeout(metro, 30);
}



function chord(chordSelect) {
  let now = context.currentTime;

  let notes = [ [64, 67, 71, 74], [65, 69, 72, 76] ][chordSelect % 2];
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
    osc.start();
    osc.stop(now + 4.0);
  }
  env.gain.linearRampToValueAtTime(0.1, now + 2.0 );
  env.gain.linearRampToValueAtTime(0.0, now + 4.0 );
}

function playSample(buffer, amp) {
  let src = context.createBufferSource();
  let gain = context.createGain();
  src.buffer = buffer;
  gain.gain.value = amp;
  src.connect(gain);
  gain.connect(context.destination);
  src.start();
  src.stop(context.currentTime + 1.0);
}


function melody() {
  let osc = context.createOscillator();
  let env = context.createGain();
  osc.frequency.value = midicps(melodyNote);
  env.gain.value = 0.0;
  env.gain.linearRampToValueAtTime(0.2, context.currentTime + 0.1);
  env.gain.linearRampToValueAtTime(0.0, context.currentTime + 0.2);

  osc.connect(env);
  env.connect(context.destination);

  osc.start();
  osc.stop(context.currentTime + 0.3);
}


document.querySelector('#context')
  .addEventListener('click', event => {
    if (event.target.value == 'start') {
      context.resume();
      scheduleTime = context.currentTime + 0.25;
      scheduleTick = 0;
      metro();
      event.target.value = 'stop';
    }
    else {
      context.suspend();
      event.target.value = 'start';
    }
  });




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
