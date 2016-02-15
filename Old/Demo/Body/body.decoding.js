G.Body.prototype.decodeDna = function() {
  this.decodeStates()
  this.decodeMovement()
  this.decodeTraits()
}

G.Body.prototype.decodeStates = function() {
  var states = this.dna.genes.map(function(gene, index) {
    return String.fromCharCode.apply(null, gene.data)
  })
  this.states = states.slice(0, 10)
  return this.states;
}

G.Body.prototype.decodeMovement = function() {
  var speedGene = this.dna.genes[10].data[0] / 100
  var forceGene = this.dna.genes[10].data[1] / 100

  this.maxspeed = speedGene;
  this.maxforce = forceGene
}

G.Body.prototype.decodeTraits = function() {
  var self = this;

  var traits = {
    health: {},
    torso: {},
    eyes: {},
    mouth: {},
    claws: {},
    tail: {}
  }

  decodeHealth(traits)
  decodeTorso(traits)
  decodeEyes(traits)
  decodeMouth(traits)
  decodeClaws(traits)
  decodeTail(traits)

  self.traits = traits;

  return traits

  // Private Functions
  function decodeHealth(traits) {
    traits.health.maxEnergy = self.dna.genes[10].data[2]
    return traits;
  }

  function decodeTorso(traits) {
    traits.torso.position = self.dna.genes[11].data[0]
    traits.torso.height = self.dna.genes[11].data[1] % 15 + 15
    traits.torso.width = self.dna.genes[11].data[2] % 15 + 15
    traits.torso.force = self.dna.genes[11].data[3]
    traits.torso.color = self.dna.genes[11].data[4]
  }

  function decodeEyes(traits) {
    traits.eyes.position = self.dna.genes[12].data[0]
    traits.eyes.size = self.dna.genes[12].data[1]
    traits.eyes.color = self.dna.genes[12].data[2]
  }

  function decodeMouth(traits) {
    traits.mouth.position = self.dna.genes[13].data[0]
    traits.mouth.size = self.dna.genes[13].data[1] % 6 + 10
    traits.mouth.color = self.dna.genes[13].data[2]
  }

  function decodeClaws(traits) {
    traits.claws.position = self.dna.genes[14].data[0]
    traits.claws.size = self.dna.genes[14].data[1]
    traits.claws.color = self.dna.genes[14].data[2]
  }

  function decodeTail(traits) {
    traits.tail.position = self.dna.genes[15].data[0]
    traits.tail.size = self.dna.genes[15].data[1]
    traits.tail.color = self.dna.genes[15].data[2]
  }
}
