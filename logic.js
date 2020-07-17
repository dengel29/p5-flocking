let flock = [];

function setup() {
  createCanvas(640, 360)
  for (i = 0; i < 100; i++) {
    flock.push(new Boid())
  }

}

function draw() {
  background(41)
  for (let boid of flock) {
    boid.flock(flock)
    boid.update()
    boid.show()
  }
}