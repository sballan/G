// returns an array of
G.Body.prototype.lookAround = function(dep) {
  var self = this;

  var surroundings = {
    bodies: [],
    food: [],
    closestBody: undefined,
    closestFoodItem: undefined
  };

  var

  var targetDistance;

  var items = dep.world.getAll()

  for(let i = 0; i < items.length; i++) {
    var item = self.checkDistance(items[i])
    if(!item) continue

    if(item.category === 'body') {
      if(!surroundings.closestBody ||
      targetDistance < surroundings.closestFoodItem.distance) {
        surroundings.closestBody.body = item;
        surroundings.closestBody.distance = targetDistance;
      }
      surroundings.bodies.push(self.seeBody(item))

    } else if (item.category === 'food'){
      if(!surroundings.closestBody ||
      targetDistance < surroundings.closestFoodItem.distance) {
        surroundings.closestBody.body = item;
        surroundings.closestBody.distance = targetDistance;
      }
      surroundings.food.push(self.seeFoodItem(item))
    }
  }

  return surroundings;
}

G.Body.prototype.checkDistance = function(item) {
  var self = this;
  var targetDistance = p5.Vector.dist(self.position, item.position)

  if(targetDistance <= self.viewDistance) {
    return item
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

  var data = {
    foodItem: foodItem,

  }

  return data;
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
