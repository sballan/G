G.Dna = class {
  constructor() {
    this.genes = [];
    this.alive = true;
    this.infoDetail = 100;
    this.fitness = 0;
  }

  createGene() {
    let newGene = new G.Gene();
    for(let i = 0; i < this.infoDetail; i++) {
      newGene.createData()
    }
    this.genes.push(newGene)

    return this
  }

  fillGenes() {
    this.genes = []

    for(let i = 0; i < this.infoDetail; i++) {
      this.createGene()
    }
  }

  fillGenesFromArray(arr) {
    let self = this;

    let genes = arr.map(function(data) {
      return new G.Gene(data)
    })

    self.genes = genes;
    return self.genes
  }

  mutateGenes(genes) {
    return genes.map(function(gene) {
      return gene.mutate();
    })
  }

  replicate() {
    return this.mutateGenes(this.genes)
  }


}





