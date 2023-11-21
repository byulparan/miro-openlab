
const context = new AudioContext();
context.suspend();

let kickBuffer;
let snareBuffer;
let hihatBuffer;
let pianoBuffer;

loadSample('resources/kick.wav', buffer=>{ kickBuffer = buffer; });
loadSample('resources/snare.wav', buffer=>{ snareBuffer = buffer; });
loadSample('resources/hihat.wav', buffer=>{ hihatBuffer = buffer; });
loadSample('resources/piano.wav', buffer=>{ pianoBuffer = buffer; });

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

document.querySelectorAll('.sample')
  .forEach(button => {
    button.addEventListener('click', event=> {
      let buffer;
      switch(button.value) {
      case 'kick':
      	buffer = kickBuffer;
      	break;
      case 'snare':
      	buffer = snareBuffer;
      	break;
      case 'hihat':
      	buffer = hihatBuffer;
      	break;
      }
      let source = context.createBufferSource();
      source.buffer = buffer;
      source.loop = false;
      source.connect(context.destination);
      source.start();
    });
  });


let pianos = [];

document.querySelector('#piano')
  .addEventListener('click', event=>{
    let source = context.createBufferSource();
    source.buffer = pianoBuffer;
    source.loop = document.querySelector('#loop').checked;
    source.connect(context.destination);
    pianos.push(source);
    source.start();
  });

document.querySelector('#pianoStop')
  .addEventListener('click', event=> {
    pianos.forEach(piano => {
      piano.stop();
    })
    pianos = [];
  });

