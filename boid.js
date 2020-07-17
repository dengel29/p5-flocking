class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
  }

  flock(boids) {
    let alignment = this.align(boids);
    this.acceleration = alignment;
  }

  align(boids) {
    let perceptionRadius = 50
    let steeringForce = createVector();
    let total = 0;
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (d < perceptionRadius && other != this) {
        steeringForce.add(other.velocity)
        total++
      }
    }
    if (total > 0) {
      steeringForce.div(total)
      steeringForce.sub(this.velocity)
    }
    return steeringForce;
  }
  update() {
    this.position.add(this.velocity)
    this.velocity.add(this.acceleration)
  }
  show() {
    strokeWeight(8);
    stroke(255);
    point(this.position.x, this.position.y)
  }
}