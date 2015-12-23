// returns an array of
G.Body.prototype.lookAround = function() {
  var self = this;
  // Loop through all entities in the population
  var surroundings = [];

  self.world.population.entities.forEach(function(entity) {
    // Calculate the distance to each of their bodies
    targetDistance = p5.Vector.dist(self.position, entity.body.position)
    // If it's close enough, pass it along to seeBody().
    if(targetDistance <= self.viewDistance) {
      surroundings.push(self.seeBody(entity.body))
    }

  })

  return surroundings;
}

// This function should assess the Body that it's looking at, and put it in the correct place in the Brain's memory.
G.Body.prototype.seeBody = function(body) {
  var self = this;

  var data = {
    body: body,
    isFamily: self.checkFamily(body),
    isFriend: self.checkFriend(body),
    isEnemy: self.checkEnemy(body)
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
