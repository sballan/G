// The World class is designed to be used with p5.js and with the other classes in the Demo folder.  Feel free to write your own World class.

G.World = function(){
  this.population = null;
  this.food = null;

  this.items = [];

  this.container = []

}

G.World.prototype.addPopulation = function(population) {
  this.population = population;
  this.attachReferences()
}

G.World.prototype.addFood = function(food) {
  this.food = food;
}

G.World.prototype.addItem = function(item) {
  this.items.push(item)
}

G.World.prototype.attachReferences = function() {
  var self = this;

  // Gives each Entity's Body a reference to this World.
  self.population.entities.forEach(function(entity) {
    entity.body.world = self
  })
}

G.World.prototype.update = function(dep) {
  dep.world = this;

  this.population.update(dep)
}
