G.Population = function() {
  this.startingPopulation = 5;
  this.entities = [];

  this.dnaPool = [];
  this.init()
}


G.Population.prototype.init = function() {
  this.createEntities()
  this.update = this.update.bind(this)
}
G.Population.prototype.reproduce = function(dna1, dna2) {
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

}
G.Population.prototype.prune = function() {
  var self = this;
  self.dnaPool = self.dnaPool.map(function(dna) {
    return dna.alive
  })
}
// This function lets you make a new pool of randomly created Dna objects.  It is not the recommended way to run a simulation, and is meant for testing purposes.
G.Population.prototype.createDnaPool = function() {
  for(var i = 0; i < this.startingPopulation; i++) {
    var newDna = new G.Dna();
    newDna.fillGenes()
    this.dnaPool.push(newDna);
  }

  return this.dnaPool;
}

G.Population.prototype.createEntities = function() {
  var self = this;
  for(var i = 0; i < this.startingPopulation; i++) {
    var e = new G.Entity();
    this.entities.push(e);
  }

  return this.entities;
}

G.Population.prototype.update = function(p) {
  this.entities.forEach(function(entity){
    entity.update(p)
  })
}
