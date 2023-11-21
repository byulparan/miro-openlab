// setInterval 
// setTimeout

let count = document.querySelector('#count');

function countup() {
  count.textContent = parseInt(count.textContent) + 1;
  // count.style.color =
  //   "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
  // count.style.fontSize = "46px";
  setTimeout(countup, 1000);
}

countup();

// setInterval( countup, 1000 );
// setTimeout( countup, 4000);

let timer;

document.querySelector('#start')
  .addEventListener('click', event => {
    let button = event.target;
    if (button.value == "start") {
      timer = setInterval(countup, 100);
      button.value = "stop";
    }
    else {
      clearInterval(timer);
      button.value = "start";
    }
  });