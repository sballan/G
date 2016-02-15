// This class is used by the Creature class; you may write you own Body class to replace this one if you wish.
G.Body.prototype.init = function() {
  var self = this;

  self.dna = new G.Dna()
  var dataArray = G.Setup.defaultDna()
  self.dna.fillGenesFromArray(dataArray)

  self.decodeDna()

  self.brain = new G.Brain(self)
}

G.Body.prototype.setState = function(state) {
  if(this.states.indexOf(state) > 0) {
    this.state = state;
  } else {
    console.error("You tried to set an invalid state: ", state)
  }
}

G.Body.prototype.render = function(p) {
  var self = this;

  p.push()
  // Body
  p.stroke(255, 153, 100);
  p.fill(255, 153, 100);
  p.ellipse(
    self.position.x,
    self.position.y,
    self.traits.torso.width,
    self.traits.torso.height
  );

  p.push()
  // Mouth
  p.stroke(0, 0, 0);
  p.fill(0, 0, 0);
  p.ellipse(
    self.position.x,
    self.position.y - 5,
    self.traits.mouth.size,
    self.traits.mouth.size
  );
  p.pop()
  p.pop()
}

// Can accept a p5.Vector or a Creature
G.Body.prototype.update = function(dep) {
  // Attach the body to the depency dep
  dep.body = this;
  dep.brain = this.brain;

  if(dep.brain.memory.target && dep.brain.memory.target.energy < 1) {
    dep.brain.memory.target = null
  }

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
