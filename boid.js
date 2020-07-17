class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.maxSpeed = 4;
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height
    }
  }
  flock(boids) {
    let cohesion = this.cohesion(boids)
    let alignment = this.align(boids);
    let separation = this.separation(boids);

    separation.mult(separationSlider.value())
    cohesion.mult(cohesionSlider.value())
    alignment.mult(alignmentSlider.value())
    this.acceleration.add(separation)
    this.acceleration.add(cohesion);
    this.acceleration.add(alignment)
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
      steeringForce.setMag(this.maxSpeed)
      steeringForce.sub(this.velocity)
      steeringForce.limit(this.maxForce)
    }
    return steeringForce;
  }

  cohesion(boids) {
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
        steeringForce.add(other.position)
        total++
      }
    }
    if (total > 0) {
      steeringForce.div(total)
      steeringForce.sub(this.position)
      // steeringForce.setMag(this.maxSpeed)
      steeringForce.sub(this.velocity)
      steeringForce.limit(this.maxForce)
    }
    return steeringForce;
  }

  separation(boids) {
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
        let diff = p5.Vector.sub(this.position, other.position)
        diff.div(d)
        steeringForce.add(diff)
        total++
      }
    }
    if (total > 0) {
      steeringForce.div(total)
      steeringForce.setMag(this.maxSpeed)
      steeringForce.sub(this.velocity)
      steeringForce.limit(this.maxForce)
    }
    return steeringForce;
  }

  update() {
    this.position.add(this.velocity)
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxSpeed)
    this.acceleration.set(0, 0)
  }
  show() {
    strokeWeight(8);
    stroke(255);
    point(this.position.x, this.position.y)
  }
}