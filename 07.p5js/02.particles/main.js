let particles = []

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(0);
  for(const p of particles) {
    fill(p.color.r, p.color.g, p.color.b, 255);
    ellipse(p.x , p.y, p.size, p.size);
    p.x += p.xDir;
    p.y += p.yDir;
    p.size -= 0.7;

  }

  // particle 의 size 가 0 보다 작다면 particles 에서 제거
  particles = particles.filter(p => p.size > 0);
}

function makeParticle() {
  particles.push({ 
    x: mouseX,
		y: mouseY,
    xDir: random(-4, 4),
    yDir: random(-4, 4),
    size: 40,
		color: {
              r: random(255),
			        g: random(255),
			        b: random(255)
			    },
		lifeTime: 255,
	});
}

function mousePressed() {
  makeParticle();
}

function mouseDragged() {
  makeParticle();
}

