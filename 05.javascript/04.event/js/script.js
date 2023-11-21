

let text = document.querySelector("p");  // p tag 를 찾아라. 
let button = document.querySelector("#click"); // id 가 click 인 tag 를 찾아라.

// button.addEventListener("click", event => {
//   text.style.color = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
// });

function clickHandle(a) {
  console.log('click!');
}

// 익명함수
(a) => {
  console.log('click');
}

// button.addEventListener('click', (a) => {
//   console.log('hello!! ')
// });

button.addEventListener("click", (event)=> {
  if(event.target.value == "push it") {
    event.target.value = "pop it";
    event.target.style.color = "red";
    event.target.style.border = "1px solid red";
    event.target.style.borderRadius = "5px";
    text.style.color = "red";
  }
  else {
    event.target.value = "push it";
    event.target.style.color = "blue";
    event.target.style.border = "1px solid blue";
    text.style.color = "green";
  }
});


let freqLabel = document.querySelector("#freqLabel");


let freq = document.querySelector("#freq");
freq.addEventListener("input", event=> {
  freqLabel.textContent = event.target.value;
});

let ampLabel = document.querySelector("#ampLabel");
let amp = document.querySelector("#amp");
amp.addEventListener("input", event=> {
  ampLabel.textContent = event.target.value;
});

