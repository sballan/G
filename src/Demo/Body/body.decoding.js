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

  this.traits = traits;

  return traits
}

G.Body.prototype.decodeHealth = function(traits) {
  traits.health.maxEnergy = this.dna.genes[10].data[2]
  return traits;
}

G.Body.prototype.decodeTorso = function(traits) {
  traits.torso.position = this.dna.genes[11].data[0]
  traits.torso.height = this.dna.genes[11].data[1]
  traits.torso.width = this.dna.genes[11].data[2]
  traits.torso.force = this.dna.genes[11].data[3]
  traits.torso.color = this.dna.genes[11].data[4]
}

G.Body.prototype.decodeEyes = function(traits) {
  traits.eyes.position = this.dna.genes[12].data[0]
  traits.eyes.size = this.dna.genes[12].data[1]
  traits.eyes.color = this.dna.genes[12].data[2]
}

G.Body.prototype.decodeMouth = function(traits) {
  traits.mouth.position = this.dna.genes[13].data[0]
  traits.mouth.size = this.dna.genes[13].data[1]
  traits.mouth.color = this.dna.genes[13].data[2]
}

G.Body.prototype.decodeClaws = function(traits) {
  traits.mouth.position = this.dna.genes[14].data[0]
  traits.mouth.size = this.dna.genes[14].data[1]
  traits.mouth.color = this.dna.genes[14].data[2]
}

G.Body.prototype.decodeTail = function(traits) {
  traits.mouth.position = this.dna.genes[15].data[0]
  traits.mouth.size = this.dna.genes[15].data[1]
  traits.mouth.color = this.dna.genes[15].data[2]
}
