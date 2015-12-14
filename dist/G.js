"use strict";

var G = {};

G.Settings = {};

G.Gene = function () {};

G.Population = function () {};

G.Dna = function () {};

G.Dna = function () {
  this.genes = [];
  this.alive = true;
};

G.Dna.prototype = {
  mutateGenes: function mutateGenes(genes) {
    return genes.map(function (gene) {
      return gene.mutate();
    });
  },
  replicate: function replicate() {
    return this.mutateGenes(this.genes);
  }

};

G.Gene = function () {
  this.data = [];
  this.mutationRate = 0.1;
  this.mutationAmount = 3;
};

G.Gene.prototype = {
  mutate: function mutate() {
    var self = this;
    var polarity = Math.random() < 0.5 ? -1 : 1;

    var mutant = self.data.map(function (d) {
      // change value
      if (Math.random() < self.mutationRate) {
        return d + polarity * self.mutationAmount;
      }
    });
    // add/remove value
    if (Math.random() < self.mutationRate * (self.mutationAmount * self.mutationRate)) {
      var index = Math.floor(Math.random() * self.data.length);

      if (polarity < 0) {
        self.data.splice(index, 1);
      } else {
        self.data.push(self.data[index]);
      }
    }
  }
};

G.Population = function () {
  this.dnaPool = [];
};

G.Population.prototype = {
  reproduce: function reproduce(dna1, dna2) {
    dna1 = dna1.replicate();
    dna2 = dna2.replicate();

    var longer = dna1.genes.length > dna2.genes.length ? dna1 : dna2;
    var shorter = dna1.genes.length <= dna2.genes.length ? dna2 : dna1;

    var childGenes = longer.genes.forEach(function (gene, index) {
      if (Math.random() < 0.5) {
        childGenes.push(gene);
      } else {
        var newGene = shorter.genes[index] ? shorter.genes[index] : gene;
        childGenes.push(newGene);
      }
    });
  },
  prune: function prune() {
    var self = this;
    self.dnaPool = self.dnaPool.map(function (dna) {
      return dna.alive;
    });
  }
};

// You should make your creature class inherit from this class in order to let it use G behaviors.