// The World class is designed to be used with p5.js and with the other classes in the Demo folder.  Feel free to write your own World class.

G.World = function(){
  this.population = null;
  this.food = null;
  this.items = [];

  this.width = undefined;
  this.height = undefined;

}

G.World.prototype.addPopulation = function(population) {
  this.population = population;
}

G.World.prototype.addFood = function(food) {
  this.food = food;
}

G.World.prototype.addItem = function(item) {
  this.items.push(item)
}

G.World.prototype.getAll = function() {
  var bodies = this.population.entities.map(function(entity){
    return entity.body
  })

  return [].concat(bodies, this.food.foodItems)
}

G.World.prototype.update = function(dep) {
  dep.world = this;

  this.population.update(dep)
  this.food.update(dep)
}
