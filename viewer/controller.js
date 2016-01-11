var world = new G.World()
var population = new G.Population()
var food = new G.Food()


world.addPopulation(population)
world.addFood(food)

var canvas = new G.Canvas(world)

var d = 100
canvas.addFunction('rectangle', function(dep) {
  var p = dep.p
  p.pop()
  p.stroke(255, 153, 0);
  p.rect(100, 100, 10, 10);
  p.push()
})

// G.Setup.defaultDna()

// var vec = new p5.Vector(20, 50)
// console.log(vec)
// body.moveAway(vec)


console.log(world)
// console.log(body.brain.decodeStates())
