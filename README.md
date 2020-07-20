# Boid Flocking in p5.js

A simple Boids implementation based on https://www.red3d.com/cwr/boids/.

Started with example as found in Nature of Code by Daniel Schiffman and building on top of that as practice p5.js.

Current implementation goes beyond the bare-bones Boids Flocking simulator in a few ways: ![Current](https://github.com/dengel29/p5-flocking/blob/master/flocking-predator.gif)

* Positional "forward" direction calculated and rotates based on direction traveling
* "Predator" logic compels boids to flee predator (triggered by mouseDragged event), re-using the separation logic

Further features to build:
* [ ] boid trails;
* [ ] barrier avoidance;
* [ ] nicer color combos
* [ ] refactor looping logic to accommodate more boids on screen at once
