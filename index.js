var G = {}

G.Settings = {}

G.Gene = function() {
  this.data = [];
  this.mutationRate = 0.1;
  this.mutationAmount = 3;
}

G.Gene.prototype = {
  mutate: function(){
    var self = this;
    var polarity =  Math.random() < 0.5 ? -1 : 1;

    var mutant = self.data.map(function(d) {
      // change value
      if(Math.random() < self.mutationRate) {
        return d + (polarity * self.mutationAmount)
      }
    })
    // add/remove value
    if(Math.random() < self.mutationRate * (self.mutationAmount * self.mutationRate) ) {
      var index = Math.floor(Math.random() * self.data.length)

      if(polarity < 0) {
        self.data.splice(index, 1)
      } else {
        self.data.push(gene.data[index])
      }
    }
  }
}

G.Dna = function() {
  this.genes = [];
}

G.Dna.prototype = {
  mutateGenes: function(genes) {
    return genes.map(function(gene) {
      return gene.mutate();
    })
  },
  replicate: function() {
    return this.mutateGenes(this.genes)
  }

}

G.Population = function() {
  this.dnaPool = [];
}

G.Population.prototype = {
  reproduce: function(dna1, dna2) {
    dna1 = dna1.replicate()
    dna2 = dna2.replicate()

    var childGenes = dna1.genes.forEach(function(gene, index) {
      if(Math.random() < 5) {
        childGenes.push(gene)
      }
    })

  }
}
