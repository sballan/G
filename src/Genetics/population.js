G.Population = function() {
  this.startingPopulation = 5;
  this.creatures = [];

  this.dnaPool = [];
}

G.Population.prototype = {
  reproduce: function(dna1, dna2) {
    dna1 = dna1.replicate()
    dna2 = dna2.replicate()

		var longer = dna1.genes.length > dna2.genes.length ? dna1 : dna2
		var shorter = dna1.genes.length <= dna2.genes.length ? dna2 : dna1

    var childGenes = longer.genes.forEach(function(gene, index) {
      if(Math.random() < 0.5) {
        childGenes.push(gene)
      } else {
				var newGene = shorter.genes[index] ? shorter.genes[index] : gene
				childGenes.push(newGene)
			}
    })

  },
  prune: function() {
    var self = this;
    self.dnaPool = self.dnaPool.map(function(dna) {
      return dna.alive
    })
  },
  // This function lets you make a new pool of randomly created Dna objects.  It is not the recommended way to run a simulation, and is meant for testing purposes.
  createDnaPool: function() {
    for(var i = 0; i < this.startingPopulation; i++) {
      var newDna = new G.Dna();
      newDna.fillGenes()
      this.dnaPool.push(newDna);
    }

    return this.dnaPool;
  },

  update: function() {
    this.creatures.forEach(function(creature){
      creature.update()
    })
  }
}
