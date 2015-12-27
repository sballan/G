// returns an array of
G.Body.prototype.lookAround = function(dep) {
  var self = this;

  var surroundings = {
    bodies: [],
    food: [],
    closestBody: undefined,
    closestFoodItem: undefined
  };

  var bodyDistance = 9999999999;
  var foodDistance = 9999999999;


  var items = dep.world.getAll()
  //console.log(items)

  for(let i = 0; i < items.length; i++) {
    var data = self.checkDistance(items[i])
    if(!data) continue
    console.log("There is an item")

    var item = data.item
    var targetDistance = data.targetDistance

    if(item.category === 'body') {
      if(!surroundings.closestBody || targetDistance < bodyDistance) {
        surroundings.closestBody = item;
        bodyDistance = targetDistance;
      }
      surroundings.bodies.push(self.seeBody(item))

    } else if (item.category === 'food'){
      if(!surroundings.closestFoodItem || targetDistance < foodDistance) {
        surroundings.closestFoodItem = item;
        foodDistance = targetDistance;
      }
      console.log("see food")
      surroundings.food.push(self.seeFoodItem(item))
    }
  }

  return surroundings;
}

G.Body.prototype.checkDistance = function(item) {
  var self = this;
  var data = {}
  data.item = item
  data.targetDistance = p5.Vector.dist(self.position, item.position)

  if(data.targetDistance <= self.viewDistance) {
  //  console.log("return data", data)
    return data
  } else {
    return false
  }
}

// This function should assess the Body that it's looking at, and put it in the correct place in the Brain's memory.
G.Body.prototype.seeBody = function(body) {
  var self = this;

  var data = {
    body: body,
    // isFamily: self.checkFamily(body),
    // isFriend: self.checkFriend(body),
    // isEnemy: self.checkEnemy(body)
  }

  return data;
}

G.Body.prototype.seeFoodItem = function(foodItem) {
  var self = this;

  // For use in future processing, perhaps of size and color of food.
  var data = {
    foodItem: foodItem,
  }

  return foodItem;
}

// Returns false if no ancestor is shared, and returns the closeness of that ancestor if it is shared (number).
G.Body.prototype.checkFamily = function(body) {
  var self = this
  var isFamily = false;
  var relatedness
  if(self.ancestors.length) {
    for(let i = 0; i < self.ancestors.length; i++) {
      if(body.ancestors.indexOf(ancestor) > 0) {
        self.brain.memory.family[body.ID] = body
        isFamily = true;
        relatedness = i;
        break;
      }
    }
  }

  if(isFamily) return relatedness
  else return false
}

G.Body.prototype.checkFriend = function(body) {
  var self = this
  if(self.brain.memory.friends[body.ID]) return true

  return false
}

G.Body.prototype.checkEnemy = function(body) {
  var self = this
  if(self.brain.memory.enemies[body.ID]) return true

  return false

}
