// The Brain class looks at a Creature's Dna and uses it to determine what to do next.

G.Brain = function(dna) {
  this.dna = dna || new G.Dna()
  this.characteristics = {};
  this.states = [];
  this.state = 'searchingFood';
  this.timeStartedState = null;

  this.target = null;

  this.init()

}

G.Brain.prototype.init = function() {
  var dataArray = G.Setup.defaultDna()
  this.dna.fillGenesFromArray(dataArray)
  this.decodeDna()
}

G.Brain.prototype.lookAround = function() {

}

G.Brain.prototype.assessTarget = function(target) {

}

G.Brain.prototype.searchingFood = function() {

}

G.Brain.prototype.decodeDna = function() {
  this.decodeStates()
}

G.Brain.prototype.decodeStates = function() {
  var states = this.dna.genes.map(function(gene, index) {
    return String.fromCharCode.apply(null, gene.data)
  })
  this.states = states.slice(0, 10)
  return this.states;
}
