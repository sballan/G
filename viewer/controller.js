var population = new G.Population()

// population.createDnaPool()

var P5 = new G.Canvas()

G.Setup.defaultDna()

var body = new G.Body()
// var vec = new p5.Vector(20, 50)
// console.log(vec)
// body.moveAway(vec)


console.log(body.dna.genes)
console.log(body.brain.decodeStates())
