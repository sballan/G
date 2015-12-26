// The Brain class looks at a Creature's Dna and uses it to determine what to do next.

G.Brain = function(body) {
  this.timeStartedState = new p5().millis();
  console.dir(p5)

  // These should be hash maps that use the Body.ID property for lookup
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

G.Brain.prototype.searchingFood = function(dep) {
  var body = dep.body;

  body.searching(dep)
}

G.Brain.prototype.update = function(world) {

}
