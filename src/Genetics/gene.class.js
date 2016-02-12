G.Gene = class Gene{
  constructor(data = [], infoDetail = 100) {
    this._mutationRate = 0.1;
    this._mutationAmount = 3;
    this.data = data;
    this.infoDetail = infoDetail;
  }
  // Private Fields

  static _createGeneDatum() {
    var data = Math.random() * 100;
    return Math.floor(data);
  };

  static _createGeneData(num = 10) {
    var data = [];

    for(let i = 0; i < num; i++) {
      data.push(this._createGeneDatum())
    }

    return data;
  };

  static mutate(gene) {
    let polarity = Math.random() < 0.5 ? -1 : 1;

    //Change existing values
    gene.forEach(function(d) {
      if(Math.random() < this._mutationRate) {
        return d + (polarity * this._mutationAmount)
      }
    });

    // add/remove value
    if(Math.random() < this._mutationRate * (this._mutationAmount * this._mutationRate) ) {
      var index = Math.floor(Math.random() * gene.data.length);

      if(polarity < 0) {
        gene.data.splice(index, 1)
      } else {
        // Maybe use createData here?
        gene.data.push(gene.data[index])
      }
    }
    return gene;
  }

  static createGene() {
    var data = this._createGeneData(this.infoDetail);
    return new G.Gene(data);
  }

};
