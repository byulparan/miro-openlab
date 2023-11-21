
const context = new AudioContext();
context.suspend();


const gain = context.createGain();
gain.gain.value = 0.1;
const oscillators = [];

[48,55,59,64].forEach(note=> {
    let osc = context.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = midicps(note);
    osc.connect(gain);
    osc.start();
    oscillators.push(osc);
});

const filter = context.createBiquadFilter();
filter.type = "bandpass";
filter.gain.value = 0.1;
filter.frequency.value = 1200;

gain.connect(filter);
filter.connect(context.destination);



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

document.querySelector('#freq')
    .addEventListener('input', event=>{
        filter.frequency.value = event.target.value;
        document.querySelector('#freq_label')
            .textContent = "filter freq " + event.target.value;
    });

function midicps(note) {
    let a = 440; //frequency of A (coomon value is 440Hz)
    return (a / 32) * (2 ** ((note - 9) / 12));
}   
