G.Food = function(num) {
  this.foodItems = [];
  this.batchSize = 5 || num;

  // In milliseconds
  this.lastFoodTime = undefined;
  this.foodInterval = 10000

}


G.Food.prototype.makeFood = function(dep) {
  this.lastFoodTime = new Date()

  for(let i = 0; i < this.batchSize; i++) {
    var foodItem = new G.Food.foodItem()

    var x = new p5().random(0, dep.world.width)
    var y = new p5().random(0, dep.world.height)

    foodItem.position = new p5.Vector(x, y)

    this.foodItems.push(foodItem)
  }
}

G.Food.prototype.update = function(dep) {
  dep.food = this;

  var self = this


  var interval = new Date() - self.lastFoodTime;

  if(!self.lastFoodTime || self.foodInterval < interval) {
    console.log("Got to food interval")
    self.makeFood(dep)
  }

  this.foodItems.forEach(function(foodItem) {
    foodItem.update(dep)
  })
}

G.Food.prototype.changeIntervalSeconds = function(num) {
  this.changeIntervalMillis(num * 1000);
}

G.Food.prototype.changeIntervalMillis = function(num) {
  this.foodInterval = num;
}




G.Food.foodItem = function() {
  this.category = 'food';
  this.ID = Math.floor(Math.random() * 1000000)
  this.position = undefined;
  this.percentEaten = 0.0;
  this.color = [138, 195, 121]


  var maxSize = 20;
  var minSize = 1;

  this.size = new p5().random(minSize, maxSize);
}

G.Food.foodItem.prototype.render = function(p) {
  var self = this;
  p.push()
  p.stroke(...self.color);
  p.fill(...self.color);
  p.rect(self.position.x, self.position.y, self.size, self.size);
  p.pop()
}

G.Food.foodItem.prototype.update = function(dep) {
  this.render(dep.p)
}
