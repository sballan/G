// The Brain class looks at a Creature's Dna and uses it to determine what to do next.

G.Brain = function(body) {
  this.dna = body.dna
  this.body = body
  this.timeStartedState = new p5().millis();
  console.dir(p5)

  this.memory = {
    target: undefined,
    family: undefined,
    friends: undefined,
    enemies: undefined
  };

  this.init()

}

G.Brain.prototype.init = function() {

}

G.Brain.prototype.assessSurroundings = function() {

}

G.Brain.prototype.assessTarget = function(target) {

}

G.Brain.prototype.searchingFood = function() {
  var self = this;
  if(!self.memory.target) {
    var x = new p5().random(0, self.body.world.width);
    var y = new p5().random(0, self.body.world.height);

    self.memory.target = new p5.Vector(x, y)
  }

  var force = self.body.seek(self.memory.target)

  self.body.applyForce(force)
}

G.Brain.prototype.update = function() {

}
