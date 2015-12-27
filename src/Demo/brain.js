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
  var self = this

  var surroundings = body.lookAround(dep)
  // console.log(surroundings)
  if(surroundings.closestFoodItem) {
    self.memory.target = surroundings.closestFoodItem.position
    console.info("surroundings: ", surroundings)
    console.info("self is", self.memory)
    body.setState('pursuingFood')
  } else {
    body.searching(dep)
  }

}

G.Brain.prototype.pursuingFood = function(dep) {
  var body = dep.body;
  if(this.memory.target) {
    console.log("pursuing food")
    var force = body.seek(this.memory.target)
    body.applyForce(force)
  } else {
    this.memory.target = null
    body.setState('searchingFood')
    console.info("didn't pursue food")
  }

}

G.Brain.prototype.update = function(world) {

}
