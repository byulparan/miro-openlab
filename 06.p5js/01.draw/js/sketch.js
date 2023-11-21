let col;
let size;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  col = color(random(255), random(255), random(255));
  size = random(20,200);
  rectMode(CENTER);
}

function draw() {
  background(0);
  noStroke();
  fill(col);
  ellipse(mouseX, mouseY, size, size);
  // let time = millis() * 0.002;
  // for(let i = 0; i < 100; i++) {
  //   time += i;
  //   let radius = Math.abs(Math.sin(time * i * 0.01)) * 200;
  //   let size = Math.abs(Math.sin(time*2.4)) * 40 + 20;
  //   fill(255, Math.abs(Math.sin(time) * 255), 0); 
  //   ellipse(width*0.5 + Math.cos(time) * radius, 
  //           height*0.5 +  Math.sin(time) * radius, 
  //           size, size);
  // }

  // line(0, height*0.5, width, height*0.5);
  // line(width*0.5, 0, width*0.5, height);
  // line(0, 0, width, height);
  // line(width, 0, 0, height);
  // stroke(255);
  // for(let i = 0; i < 1000; i++) {
  //   point(random(0,width), random(0, height));
  // }
  // rect(width*0.5, height*0.5, 100, 100);
}

function mousePressed() { // click
  col = color(random(255), random(255), random(255));
  size = random(20,200);
}

function mouseDragged() {
  col = color(random(255), random(255), random(255));
  size = random(20, 200);
}




// let slider = document.querySelector("#color");
// slider.addEventListener("input", evt => {
//   color = parseInt(evt.target.value);
//   document.querySelector("#colorLabel").textContent = evt.target.value;
// });
