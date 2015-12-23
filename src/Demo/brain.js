// The Brain class looks at a Creature's Dna and uses it to determine what to do next.

G.Brain = function(dna) {
  this.dna = dna
  this.states = [];
  this.state = 'searchingFood';
  // this.timeStartedState = p5.millis();

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

G.Brain.prototype.lookAround = function() {

}

G.Brain.prototype.assessTarget = function(target) {

}

G.Brain.prototype.searchingFood = function() {

}

G.Brain.prototype.update = function() {

}
