// This class is used by the Creature class; you may write you own Body class to replace this one if you wish.
G.Body = function() {
  this.category = 'body'
  this.brain = undefined;
  this.dna = undefined;

  this.states = [];
  this.state = 'searchingFood';

  this.position = new p5.Vector(100, 100)
  this.velocity = new p5.Vector(0, 1)
  this.acceleration = new p5.Vector(0, 29)

  this.maxspeed = 1
  this.maxforce = 0.05

  this.init()
}


G.Body.prototype.init = function() {
  this.brain = new G.Brain()

  this.dna = new G.Dna()
  var dataArray = G.Setup.defaultDna()

  this.dna.fillGenesFromArray(dataArray)

  this.decodeDna()
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

G.Body.prototype.decodeDna = function() {
  this.decodeStates()
  this.decodeMovement()
}

G.Body.prototype.decodeStates = function() {
  var states = this.dna.genes.map(function(gene, index) {
    return String.fromCharCode.apply(null, gene.data)
  })
  this.states = states.slice(0, 10)
  return this.states;
}

G.Body.prototype.decodeMovement = function() {
  var speedGene = this.dna.genes[10].data[0] / 100
  var forceGene = this.dna.genes[10].data[1] / 100

  this.maxspeed = speedGene;
  this.maxforce = forceGene
}

G.Body.prototype.render = function(p) {
  var self = this;
  p.pop()
  p.stroke(255, 153, 0);
  p.rect(self.position.x, self.position.y, 20, 20);
  p.push()
}
// Can accept a p5.Vector or a Creature

G.Body.prototype.update = function(p) {
  this.brain.update()
  this.brain[this.state]()

  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);

  this.render(p)
}
