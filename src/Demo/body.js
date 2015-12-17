// This class is used by the Creature class; you may write you own Body class to replace this one if you wish.
G.Body = function() {
  this.dna = new G.Dna();
  this.brain = null;
  this.position = new p5.Vector(0, 0)
  this.rotation = 0;
  this.category = 'body'

  this.currentStep = 5;
  this.maxStep = 10;
  this.minStep = 1;

  this.init()
}

G.Body.prototype = {
  init: function() {
    this.defaultDna()
    this.brain = new G.Brain(this.dna)
    this.states = this.brain.states
  },
  setPosition: function() {
    var self = this;
    var args = Array.prototype.slice.call (arguments)

    new p5.Vector().set.apply(self.position, args)
  },
  distanceTo: function(vector) {
    return this.position.dist(vector)
  },
  // Accepts a p5.Vector
  calcStep: function(end) {
    var step = this.currentStep
    var start = this.position
    var distance = start.dist(end)

    return p5.Vector.lerp(start, end, step / distance)
  },
  // Can accept a p5.Vector or a Creature

  render: function() {
    fill(127, 127);
    stroke(200);
    ellipse(this.position.x, this.position.y, 16, 16);
  },
  moveToward: function(end) {
    var self = this
    var endPoint

    if(end instanceof p5.Vector) endPoint = end;
    else endPoint = end.body.position;

    var newPoint = self.calcStep(endPoint)
    self.setPosition(newPoint)
  },
  moveAway: function(end) {
    var self = this
    var endPoint

    if(end instanceof p5.Vector) endPoint = end;
    else endPoint = end.body.position;

    var newPoint = self.calcStep(endPoint)
    self.position.sub(newPoint)
  },
  getState: function() {
    return this.brain.state
  },
  setState: function(string) {
    this.brain.state = string
  },
  update: function() {
    this.brain.update()
    this[this.state]()
  },

  defaultDna: function() {
    var dataArray = G.Setup.defaultDna()
    this.dna.fillGenesFromArray(dataArray)

    return this.dna
  }

}
