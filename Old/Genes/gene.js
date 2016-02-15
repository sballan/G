G.Gene = function(data) {
  this.data = [];
  this.mutationRate = 0.1;
  this.mutationAmount = 3;

  if(data) this.data = data

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
        // Maybe use createData here?
        self.data.push(self.data[index])
      }
    }
  },
  createData: function() {
    var data = Math.random() * 100;
    data = Math.floor(data);
    this.data.push(data);

    return this;
  }
}
