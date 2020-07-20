let flock = [];
let d;
let predator;
let x;
let y;

let cohesionSlider, alignmentSlider, separationSlider;

function setup() {
  d = 41
  let canvas = createCanvas(640, 360);
  alignmentSlider = createSlider(0, 5, 1, 0.1);
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  separationSlider = createSlider(0, 5, 1, 0.1);
  for (i = 0; i < 75; i++) {
    flock.push(new Boid())
  }

  canvas.mouseOver(() => {
    // console.log(flock[0].separation)
    d = [220, 141, 155]

  })

  canvas.mouseOut(() => {
    d = 41
    // for (let boid of flock) {
    //   boid.reset()
    // }
  })
}

function mouseDragged() {
  // flock.push(new Boid(mouseX, mouseY))
  x = mouseX
  y = mouseY
  predator = new Predator(x, y)
}

function draw() {
  background(d)
  for (let boid of flock) {
    boid.edges()
    if (predator) {
      predator.update(x, y);
      predator.show(x, y);
      boid.patternize(flock, predator)
    } else {
      boid.patternize(flock)
    }
    boid.update()
    boid.show()
  }
}