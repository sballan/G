// This class is used by the Creature class; you may write you own Body class to replace this one if you wish.
G.Body.prototype.init = function() {
  var self = this;

  self.dna = new G.Dna()
  var dataArray = G.Setup.defaultDna()
  self.dna.fillGenesFromArray(dataArray)

  self.decodeDna()

  self.brain = new G.Brain(self)
}

G.Body.prototype.applyForce = function(force) {
  this.acceleration.add(force);
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

G.Body.prototype.render = function(p) {
  var self = this;
  p.pop()
  p.stroke(255, 153, 0);
  p.rect(self.position.x, self.position.y, 20, 20);
  p.push()
}

// Can accept a p5.Vector or a Creature
G.Body.prototype.update = function(injection) {
  // Attach the body to the depency injection
  injection.body = this;

  this.brain.update(injection)
  this.brain[this.state](injection)

  // Update velocity
  this.velocity.add(this.acceleration);

  // Limit speed
  this.velocity.limit(this.maxspeed);

  // Add velocity to current position
  this.position.add(this.velocity);

  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);

  this.render(injection.p)
}
