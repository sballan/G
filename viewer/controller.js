var population = new G.Population()

var canvas = new G.Canvas(population)

var d = 100
canvas.addFunction('rectangle', function(p) {
  p.stroke(255, 153, 0);
  p.rect(100, d++, 10, 10);
})

// G.Setup.defaultDna()

// var vec = new p5.Vector(20, 50)
// console.log(vec)
// body.moveAway(vec)


// console.log(body.dna.genes)
// console.log(body.brain.decodeStates())
