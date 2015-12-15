// The Brain class looks at a Creature's Dna and uses it to determine what to do next.

G.Brain = function(dna) {
  this.dna = dna;
  this.states = [];
  this.state = 'searchingFood';
  this.timeStartedState = null;

  this.init()

}

G.Brain.prototype = {
  init: function() {
    this.decodeDna()
  },
  searchFood: function() {

  },
  decodeDna: function() {
    this.decodeStates()
  },
  decodeStates: function() {
    var states = this.dna.genes.map(function(gene, index) {
      return String.fromCharCode.apply(null, gene.data)
    })
    this.states = states.slice(0, 10)
    return this.states;
  }

}
