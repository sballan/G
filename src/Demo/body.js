// This class is used by the Creature class; you may write you own Body class to replace this one if you wish.
G.Body = function() {
  this.category = 'body'
  this.brain = undefined;

  this.position = new p5.Vector(0, 0)
  this.velocity = new p5.Vector(0, 0)
  this.acceleration = new p5.Vector(0, 0)

  this.maxspeed = 3
  this.maxforce = 0.05

  this.init()
}


G.Body.prototype.init = function() {
  this.brain = new G.Brain()
}

G.Body.prototype.applyForce = function(force) {
  this.acceleration.add(force);
}

G.Body.prototype.getPosition = function() {
  return this.brain.position;
}
G.Body.prototype.getDna = function() {
  return this.brain.Dna;
}
G.Body.prototype.render = function() {
  this.brain.render();
}
// Can accept a p5.Vector or a Creature

G.Body.prototype.update = function() {
  this.brain.update()
  this[this.state]()

  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}
