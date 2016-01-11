// The World class is designed to be used with p5.js and with the other classes in the Demo folder.  Feel free to write your own World class.

G.World = class World {
  constructor() {
    this.population = null;
    this.food = null;


    this.items = [];

    this.width = undefined;
    this.height = undefined;
  }

  addPopulation(population) {
    this.population = population;
  }

  addFood(food) {
    this.food = food;
  }

  addItem(item) {
    this.items.push(item)
  }

  getAll() {
    var bodies = this.population.entities.map(function(entity) {
      return entity.body
    })

    return [].concat(bodies, this.food.foodItems)
  }

  update(dep) {
    dep.world = this;

    this.population.update(dep)
    this.food.update(dep)
  }


}


