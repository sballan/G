G.Food = class Food {
  constructor(num = 5) {
    this.foodItems = [];
    this.batchSize = num;

    // In milliseconds
    this.lastFoodTime = undefined;
    this.foodInterval = 10000

  }

  makeFood(dep) {
    this.lastFoodTime = new Date()

    for(let i = 0; i < this.batchSize; i++) {
      var foodItem = new G.Food.foodItem()

      var x = new p5().random(0, dep.world.width)
      var y = new p5().random(0, dep.world.height)

      foodItem.position = new p5.Vector(x, y)

      this.foodItems.push(foodItem)
    }
  }

  update(dep) {
    dep.food = this;

    var self = this

    var interval = new Date() - self.lastFoodTime;

    if(!self.lastFoodTime || self.foodInterval < interval) {
//      console.log("Got to food interval")
      self.makeFood(dep)
    }

    this.foodItems.forEach(function(foodItem) {
      foodItem.update(dep)
    })
  }

  changeIntervalSeconds(num) {
    this.changeIntervalMillis(num * 1000);
  }

  changeIntervalMillis(num) {
    this.foodInterval = num;
  }

}


G.Food.foodItem = class FoodItem {
  constructor() {
    this.category = 'foodItem';
    this.ID = Math.floor(Math.random() * 1000000)
    this.position = undefined;
    this.percentEaten = 0.0;
    this.color = [138, 195, 121]

    var maxSize = 20;
    var minSize = 1;

    this.size = new p5().random(minSize, maxSize);
    this.totalChunks = this.size * this.size
    this.energy = this.size
  }

  render(p) {
    var self = this;
    p.push()
    p.stroke(...self.color);
    p.fill(...self.color);
    p.rect(self.position.x, self.position.y, self.size, self.size);
    p.pop()
  }

  removeChunks(num) {
    var self = this;
    self.totalChunks -= num;
    self.size = Math.sqrt(self.totalChunks);
    self.energy = size
  }

  update(dep) {
    var self = this;
    var food = dep.world.food

    if(self.energy < 1) {
      for(let i = 0; i < food.length; i++) {
        if(food[i].ID === self.ID) {
          food.splice(i, 1)
          break;
        }
      }
    }

    self.render(dep.p)
  }

}



