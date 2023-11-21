
const context = new AudioContext();
context.suspend();

const oscillator = context.createOscillator();
const gain = context.createGain();
gain.gain.value = 0.0;

oscillator.connect(gain);
gain.connect(context.destination);

oscillator.start();


function bang() {
  let now = context.currentTime;
  
  gain.gain.cancelScheduledValues(now);

  let gains = new Float32Array(3);
  gains[0] = 0.0;
  gains[1] = 0.4;
  gains[2] = 0.0;
  gain.gain.setValueCurveAtTime(gains, now, 4.0);

  oscillator.frequency.cancelScheduledValues(now);
  let freqs = new Float32Array(5);
  freqs[0] = 440;
  freqs[1] = 880;
  freqs[2] = 440;
  freqs[3] = 1440;
  freqs[4] = 440;
  oscillator.frequency.setValueCurveAtTime(freqs, now, 4.0);

}


document.querySelector('#context')
  .addEventListener('click', event => {
    if(event.target.value == 'start') {
      context.resume();
      event.target.value = 'stop';
    } else {
      context.suspend();
      event.target.value = 'start';
    }
  });

document.querySelector('#bang')
  .addEventListener('click', event => {
    bang();
  });
