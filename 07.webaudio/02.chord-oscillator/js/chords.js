
const context = new AudioContext();
context.suspend();

const gain = context.createGain();
gain.gain.value = 0.1;
gain.connect(context.destination);

const oscillators = [ ];

[60, 64, 67, 71].forEach(note => {
  let osc = context.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.value = midicps(note);
  osc.connect(gain);
  osc.start();
  oscillators.push(osc);
});

// midicps 함수는 미디노트 값을 주파수로 변환하는 함수
// 60 => c4  
// 67 => g4
// 69 => a4
// 72 => c5
function midicps(note) {
  let a = 440; //frequency of A (coomon value is 440Hz)
  return (a / 32) * (2 ** ((note - 9) / 12));
}


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

document.querySelectorAll('.chord')
  .forEach(button => {
    button.addEventListener('click', event => {
      switch(button.value) {
      case '1':
      	for(let i = 0; i < 4; i++) {
    	    oscillators[i].frequency.value = midicps([60, 64, 67, 71][i]);
	      }
      	break;
      case '2':
      	for(let i = 0; i < 4; i++) {
      	  oscillators[i].frequency.value = midicps([57, 72, 79, 83][i]);
      	}
      	break;
      case '3':
      	for(let i = 0; i < 4; i++) {
      	  oscillators[i].frequency.value = midicps( Math.floor(Math.random() * 40 + 40) );
      	}
      	break;
      case '4':
      	for(let i = 0; i < 4; i++) {
      	  oscillators[i].frequency.value = midicps([52, 67, 71, 74][i]);
      	}
      	break;
      }
    });
  });



