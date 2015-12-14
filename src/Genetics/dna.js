G.Dna = function() {
  this.genes = [];
  this.alive = true;
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
