/* eslint no-undef: "off", no-unused-vars: "off" */


let pg;

let size = 300;
let positions = [];
let rotations = [];
function setup() {
  pixelDensity(1.0);
  let canvas = createCanvas(windowWidth , windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-10');
  
  pg = createGraphics(width,height, WEBGL);
  background(0);
  for(let i = 0; i < size; i++) {
    positions.push({x: random(-8,8), y: random(-8,8), z: random(-8,8)});
    rotations.push(random(0, TAU));
  }
}

function draw() {
  let time = millis() * 0.001;
  background(0);
  pg.clear();
  pg.perspective(45.0, width/height, .01, 100.0);
  pg.camera(cos(time*0.5)*10.0, 0.0, sin(time*0.6)*10.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);

  pg.fill("darkviolet");
  for(let i = 0; i < size; i++) {
    let pos = positions[i];
    pg.push();
    pg.translate(pos.x, pos.y, pos.z);
    pg.rotateX(rotations[i]+time);
    pg.rotateY(rotations[i]+time);
    pg.rotateZ(rotations[i]+time);
    pg.box(0.5);
    pg.pop();
  }

  image(pg, 0, 0, pg.width, pg.height);

}


