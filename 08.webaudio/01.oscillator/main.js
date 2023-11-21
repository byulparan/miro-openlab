
const context = new AudioContext();
context.suspend();

const oscillator = context.createOscillator();
const gain = context.createGain();
const panner = context.createStereoPanner();

const panLfo = context.createOscillator();
const freqLfo = context.createOscillator();
const freqLfoGain = context.createGain();


// AudioParam property 는 .value = 값 형태로 직접 값을 입력 할 수 있다. 
oscillator.frequency.value = 840.0;
gain.gain.value = 0.3;
panLfo.frequency.value = 0.3;

freqLfo.frequency.value = 4;
freqLfo.type = "square";
freqLfoGain.gain.value = 440;

oscillator.type = "square";


oscillator.connect(gain);
gain.connect(panner);
panner.connect(context.destination);

freqLfo.connect(freqLfoGain);
freqLfoGain.connect(oscillator.frequency);
panLfo.connect(panner.pan);

oscillator.start();
panLfo.start();
freqLfo.start();



document.querySelector('#context')
  .addEventListener('click', event=> {
    let button = event.target;
    if(button.value == 'start') {
      context.resume();
      button.value = 'stop';
    } else {
      context.suspend();
      button.value = 'start';
    }
  });


document.querySelector('#slider1')
  .addEventListener('input', event=>{
    oscillator.frequency.value = event.target.value;
    document.querySelector('#slider1_value').textContent = 'freq: ' + event.target.value;
  });


document.querySelector('#slider2')
  .addEventListener('input', event=>{
    gain.gain.linearRampToValueAtTime(event.target.value, context.currentTime + 0.2);
    document.querySelector('#slider2_value').textContent = 'amp: ' + event.target.value;
  });
