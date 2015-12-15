G.Dna = function() {
  this.genes = [];
  this.alive = true;
  this.infoDetail = 100;
  this.fitness = 0;
}

G.Dna.prototype = {
  createGene: function() {
    var newGene = new G.Gene();
    for(var i = 0; i < this.infoDetail; i++) {
      newGene.createData()
    }
    this.genes.push(newGene)

    return this
  },
  fillGenes: function() {
    this.genes = []

    for(var i = 0; i < this.infoDetail; i++) {
      this.createGene()
    }
  },
  fillGenesFromArray: function(arr) {
    var self = this;

    var genes = arr.map(function(data) {
      return new G.Gene(data)
    })

    self.genes = genes;
    return self.genes
  },
  mutateGenes: function(genes) {
    return genes.map(function(gene) {
      return gene.mutate();
    })
  },
  replicate: function() {
    return this.mutateGenes(this.genes)
  }

}
