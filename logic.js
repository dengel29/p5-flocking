let flock = [];

let cohesionSlider, alignmentSlider, separationSlider;

function setup() {
  createCanvas(640, 360);
  alignmentSlider = createSlider(0, 5, 1, 0.1);
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  separationSlider = createSlider(0, 5, 1, 0.1);
  for (i = 0; i < 100; i++) {
    flock.push(new Boid())
  }

}

function draw() {
  background(41)
  for (let boid of flock) {
    boid.edges()
    boid.flock(flock)
    boid.update()
    boid.show()
  }
}