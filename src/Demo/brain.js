// The Brain class looks at a Creature's Dna and uses it to determine what to do next.

G.Brain = function(dna) {
  this.dna = dna
  this.characteristics = {};
  this.states = [];
  this.state = 'searchingFood';
  this.timeStartedState = null;

  this.target = null;

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
