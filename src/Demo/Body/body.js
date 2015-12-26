// This class is used by the Creature class; you may write you own Body class to replace this one if you wish.
G.Body.prototype.init = function() {
  var self = this;

  self.dna = new G.Dna()
  var dataArray = G.Setup.defaultDna()
  self.dna.fillGenesFromArray(dataArray)

  self.decodeDna()

  self.brain = new G.Brain(self)
}

G.Body.prototype.render = function(p) {
  var self = this;
  p.push()
  p.stroke(255, 153, 0);
  p.rect(self.position.x, self.position.y, 20, 20);
  p.pop()
}

// Can accept a p5.Vector or a Creature
G.Body.prototype.update = function(dep) {
  // Attach the body to the depency dep
  dep.body = this;
  dep.brain = this.brain;

  this.brain.update(dep)
  this.brain[this.state](dep)

  // Update velocity
  this.velocity.add(this.acceleration);

  // Limit speed
  this.velocity.limit(this.maxspeed);

  // Add velocity to current position
  this.position.add(this.velocity);

  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);

  this.render(dep.p)
}
