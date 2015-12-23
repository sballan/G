// This class is used by the Creature class; you may write you own Body class to replace this one if you wish.
G.Body = function() {
  this.category = 'body'
  this.ID = Math.floor(Math.random() * 1000000)
  this.timeBorn = new p5().millis()
  this.brain = undefined;
  this.dna = undefined;
  this.ancestors = []

  this.traits = {
    health: {
      maxEnergy: 100,
      energy: 100
    },
    torso: {
      position: null,
      height: 10,
      width: 10,
      color: 0x444444
    },
    eyes: {
      position: null,
      size: 3,
      color: 0x444444
    },
    mouth: {
      position: null,
      size: 5,
      color: 0x444444
    },
    claws: {
      position: null,
      size: 6,
      color: 0x000000
    },
    tail: {
      position: null,
      size: 3,
      speed,
      color: 0x444444
    },

  }

  this.states = [];
  this.state = 'searchingFood';
  this.timeStartedState = new p5().millis()

  this.position = new p5.Vector(100, 100)
  this.velocity = new p5.Vector(0, 0)
  this.acceleration = new p5.Vector(0, 0)

  this.viewDistance = 20;
  this.maxspeed = 1
  this.maxforce = 0.05

  this.init()
}


G.Body.prototype.init = function() {
  var self = this;

  self.dna = new G.Dna()
  var dataArray = G.Setup.defaultDna()
  self.dna.fillGenesFromArray(dataArray)

  self.decodeDna()

  self.brain = new G.Brain(self)
}

G.Body.prototype.applyForce = function(force) {
  this.acceleration.add(force);
}

G.Body.prototype.seek = function(target) {
  // A vector pointing from the location to the target
  var desired = p5.Vector.sub(target, this.position);

  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);

  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired, this.velocity);

  // Limit to maximum steering force
  steer.limit(this.maxforce);
  return steer;
}

G.Body.prototype.decodeDna = function() {
  this.decodeStates()
  this.decodeMovement()
}

G.Body.prototype.decodeStates = function() {
  var states = this.dna.genes.map(function(gene, index) {
    return String.fromCharCode.apply(null, gene.data)
  })
  this.states = states.slice(0, 10)
  return this.states;
}

G.Body.prototype.decodeMovement = function() {
  var speedGene = this.dna.genes[10].data[0] / 100
  var forceGene = this.dna.genes[10].data[1] / 100

  this.maxspeed = speedGene;
  this.maxforce = forceGene
}

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

G.Body.prototype.render = function(p) {
  var self = this;
  p.pop()
  p.stroke(255, 153, 0);
  p.rect(self.position.x, self.position.y, 20, 20);
  p.push()
}
// Can accept a p5.Vector or a Creature

G.Body.prototype.update = function(p) {
  this.brain.update()
  this.brain[this.state]()

  // Update velocity
  this.velocity.add(this.acceleration);

  // Limit speed
  this.velocity.limit(this.maxspeed);

  // Add velocity to current position
  this.position.add(this.velocity);

  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);

  this.render(p)
}
