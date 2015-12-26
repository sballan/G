G.Body.prototype.applyForce = function(force) {
  this.acceleration.add(force);
}

G.Body.prototype.searching = function(dep) {
  var world = dep.world
  var body = dep.body
  var brain = dep.brain

  if(!brain.memory.target) {
    var x = new p5().random(0, world.width);
    var y = new p5().random(0, world.height);

    brain.memory.target = new p5.Vector(x, y)
  }

  var force = body.seek(brain.memory.target)

  body.applyForce(force)
}

G.Body.prototype.seek = function(target) {
  // A vector pointing from the location to the target
  var desired = p5.Vector.sub(target, this.position);

  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);

  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired, this.velocity);

  // Limit to maximum steering force
  steer.limit(this.maxforce);
  return steer;
}
