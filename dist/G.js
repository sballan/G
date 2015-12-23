'use strict';

var G = {};

G.Settings = {};

G.Entity = function () {};

G.Gene = function () {};

G.Population = function () {};

G.Dna = function () {};

// These are part of the Demo and can should be modified if you wish to make your own simulation
G.Canvas = function () {};

G.World = function () {};

G.Body = function () {};

G.Brain = function () {};

// This class is used by the Creature class; you may write you own Body class to replace this one if you wish.
G.Body = function () {
  this.category = 'body';
  this.ID = Math.floor(Math.random() * 1000000);
  this.brain = undefined;
  this.dna = undefined;
  this.timeBorn = new p5().millis();
  this.ancestors = [];

  this.states = [];
  this.state = 'searchingFood';
  this.timeStartedState = new p5().millis();

  this.position = new p5.Vector(100, 100);
  this.velocity = new p5.Vector(0, 0);
  this.acceleration = new p5.Vector(0, 0);

  this.viewDistance = 20;
  this.maxspeed = 1;
  this.maxforce = 0.05;

  this.init();
};

G.Body.prototype.init = function () {
  var self = this;

  self.dna = new G.Dna();
  var dataArray = G.Setup.defaultDna();
  self.dna.fillGenesFromArray(dataArray);

  self.decodeDna();

  self.brain = new G.Brain(self);
};

G.Body.prototype.applyForce = function (force) {
  this.acceleration.add(force);
};

G.Body.prototype.seek = function (target) {
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
};

G.Body.prototype.decodeDna = function () {
  this.decodeStates();
  this.decodeMovement();
};

G.Body.prototype.decodeStates = function () {
  var states = this.dna.genes.map(function (gene, index) {
    return String.fromCharCode.apply(null, gene.data);
  });
  this.states = states.slice(0, 10);
  return this.states;
};

G.Body.prototype.decodeMovement = function () {
  var speedGene = this.dna.genes[10].data[0] / 100;
  var forceGene = this.dna.genes[10].data[1] / 100;

  this.maxspeed = speedGene;
  this.maxforce = forceGene;
};

// returns an array of
G.Body.prototype.lookAround = function () {
  var self = this;
  // Loop through all entities in the population
  var surroundings = [];

  self.world.population.entities.forEach(function (entity) {
    // Calculate the distance to each of their bodies
    targetDistance = p5.Vector.dist(self.position, entity.body.position);
    // If it's close enough, pass it along to seeBody().
    if (targetDistance <= self.viewDistance) {
      surroundings.push(self.seeBody(entity.body));
    }
  });

  return surroundings;
};

// This function should assess the Body that it's looking at, and put it in the correct place in the Brain's memory.
G.Body.prototype.seeBody = function (body) {
  var self = this;

  var data = {
    body: body,
    isFamily: self.checkFamily(body),
    isFriend: self.checkFriend(body),
    isEnemy: self.checkEnemy(body)
  };

  return data;
};

// Returns false if no ancestor is shared, and returns the closeness of that ancestor if it is shared (number).
G.Body.prototype.checkFamily = function (body) {
  var self = this;
  var isFamily = false;
  var relatedness;
  if (self.ancestors.length) {
    for (var i = 0; i < self.ancestors.length; i++) {
      if (body.ancestors.indexOf(ancestor) > 0) {
        self.brain.memory.family[body.ID] = body;
        isFamily = true;
        relatedness = i;
        break;
      }
    }
  }

  if (isFamily) return relatedness;else return false;
};

G.Body.prototype.checkFriend = function (body) {
  var self = this;
  if (self.brain.memory.friends[body.ID]) return true;

  return false;
};

G.Body.prototype.checkEnemy = function (body) {
  var self = this;
  if (self.brain.memory.enemies[body.ID]) return true;

  return false;
};

G.Body.prototype.render = function (p) {
  var self = this;
  p.pop();
  p.stroke(255, 153, 0);
  p.rect(self.position.x, self.position.y, 20, 20);
  p.push();
};
// Can accept a p5.Vector or a Creature

G.Body.prototype.update = function (p) {
  this.brain.update();
  this.brain[this.state]();

  // Update velocity
  this.velocity.add(this.acceleration);

  // Limit speed
  this.velocity.limit(this.maxspeed);

  // Add velocity to current position
  this.position.add(this.velocity);

  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);

  this.render(p);
};

// The Brain class looks at a Creature's Dna and uses it to determine what to do next.

G.Brain = function (body) {
  this.dna = body.dna;
  this.body = body;
  this.timeStartedState = new p5().millis();
  console.dir(p5);

  this.memory = {
    target: undefined,
    family: undefined,
    friends: undefined,
    enemies: undefined
  };

  this.init();
};

G.Brain.prototype.init = function () {};

G.Brain.prototype.assessSurroundings = function () {};

G.Brain.prototype.assessTarget = function (target) {};

G.Brain.prototype.searchingFood = function () {
  var self = this;
  if (!self.memory.target) {
    var x = new p5().random(0, self.body.world.width);
    var y = new p5().random(0, self.body.world.height);

    self.memory.target = new p5.Vector(x, y);
  }

  var force = self.body.seek(self.memory.target);

  self.body.applyForce(force);
};

G.Brain.prototype.update = function () {};

//This class is used to create a canvas using p5.js.  Feel free to replace it!

G.Canvas = function (world) {
  var self = this;

  this.world = world;

  this.drawFunctions = {};
  this.p5 = undefined;

  var width = this.world.width || window.innerWidth;
  var height = this.world.height || window.innerHeight;

  this.world.width = width;
  this.world.height = height;

  function canvas(p) {
    p.setup = function () {
      p.createCanvas(width, height);
    };

    p.draw = function () {
      // Executes all the functions in the drawFunctions objet

      // Set the background to black and turn off the fill color
      p.background(0);
      p.noFill();

      // The two parameters of the point() method each specify
      // coordinates.
      // The first parameter is the x-coordinate and the second is the Y
      p.stroke(255);
      p.point(width * 0.5, height * 0.5);
      p.point(width * 0.5, height * 0.25);

      // Coordinates are used for drawing all shapes, not just points.
      // Parameters for different functions are used for different
      // purposes. For example, the first two parameters to line()
      // specify the coordinates of the first endpoint and the second
      // two parameters specify the second endpoint
      p.stroke(0, 153, 255);
      p.line(0, height * 0.33, width, height * 0.33);

      // By default, the first two parameters to rect() are the
      // coordinates of the upper-left corner and the second pair
      // is the width and height
      p.stroke(255, 153, 0);
      p.rect(width * 0.25, height * 0.1, width * 0.5, height * 0.8);

      self.draw(p);
    };
  }
  this.p5 = new p5(canvas, 'p5-canvas');
  this.init();
};

G.Canvas.prototype.init = function () {
  var self = this;

  var update = self.world.update; //.bind(self.world.population);
  self.addFunction('world', update, self.world);
};

// This function executes all functions in teh drawFunctions object
G.Canvas.prototype.draw = function (p) {
  var funcs = this.drawFunctions;

  for (var func in funcs) {
    if (typeof funcs[func] === 'function') funcs[func](p);
  }
};

// This function takes a function and a name and creates a new key value pair of name and function in the drawFunctions object
G.Canvas.prototype.addFunction = function (name, func, thisArg) {
  var self = this;
  if (thisArg) func = func.bind(thisArg);

  self.drawFunctions[name] = func;
};

// This function uses the name parameter to remove the function with that name from the drawFunctions object.
G.Canvas.prototype.removeFunction = function (name, func) {
  this.drawFunctions[name] = null;
};

G.Setup = {
  defaultDna: function defaultDna() {
    var states = ['searchingFood', 'searchingPrey', 'searchingMate', 'pursuingFood', 'pursuingPrey', 'pursuingMate', 'eating', 'attacking', 'reproducing', 'avoiding'];

    // Fill with states
    var dataArray = states.map(function (string) {
      var data = [];
      for (var i = 0; i < string.length; i++) {
        data.push(string.charCodeAt(i));
      }
      return data;
    });

    //fill with random numbers
    for (var i = 0; i < 10; i++) {
      var data = [];
      for (var j = 0; j < 10; j++) {
        data.push(Math.floor(Math.random() * 100));
      }
      dataArray.push(data);
    }

    return dataArray;
  },
  bodyView: function bodyView() {}

};

// The World class is designed to be used with p5.js and with the other classes in the Demo folder.  Feel free to write your own World class.

G.World = function () {
  this.population = null;
  this.food = null;

  this.items = [];

  this.container = [];
};

G.World.prototype.addPopulation = function (population) {
  this.population = population;
  this.attachReferences();
};

G.World.prototype.addFood = function (food) {
  this.food = food;
};

G.World.prototype.addItem = function (item) {
  this.items.push(item);
};

G.World.prototype.attachReferences = function () {
  var self = this;
  self.population.entities.forEach(function (entity) {
    entity.body.world = self;
  });
};

G.World.prototype.update = function (p) {
  //this.food.update()
  this.population.update(p);
};

G.Dna = function () {
  this.genes = [];
  this.alive = true;
  this.infoDetail = 100;
  this.fitness = 0;
};

G.Dna.prototype.createGene = function () {
  var newGene = new G.Gene();
  for (var i = 0; i < this.infoDetail; i++) {
    newGene.createData();
  }
  this.genes.push(newGene);

  return this;
};
G.Dna.prototype.fillGenes = function () {
  this.genes = [];

  for (var i = 0; i < this.infoDetail; i++) {
    this.createGene();
  }
};
G.Dna.prototype.fillGenesFromArray = function (arr) {
  var self = this;

  var genes = arr.map(function (data) {
    return new G.Gene(data);
  });

  self.genes = genes;
  return self.genes;
};
G.Dna.prototype.mutateGenes = function (genes) {
  return genes.map(function (gene) {
    return gene.mutate();
  });
};
G.Dna.prototype.replicate = function () {
  return this.mutateGenes(this.genes);
};

// You should make your creature class inherit from this class in order to let it use G behaviors.
G.Entity = function () {
  this.alive = true;
  this.fitness = undefined;

  // A reference to the Entities in the population this Entity is a part of.
  this.entities = undefined;

  this.body = new G.Body();
};

G.Entity.prototype = {
  reproduce: function reproduce(entity) {
    //Event emitter to Population, sending this entity and another entity, and telling them both to reproduce.  Or maybe, sending this body and another body and then calling their reproduce functions, passing in a reference to the Population itself so that the offspring can be added to the gene-pool.
  },
  die: function die() {
    this.alive = false;
  },
  update: function update(p) {
    this.body.update(p);
    this.fitness = this.body.fitness;
  }

};

G.Gene = function (data) {
  this.data = [];
  this.mutationRate = 0.1;
  this.mutationAmount = 3;

  if (data) this.data = data;
};

G.Gene.prototype = {
  mutate: function mutate() {
    var self = this;
    var polarity = Math.random() < 0.5 ? -1 : 1;

    var mutant = self.data.map(function (d) {
      // change value
      if (Math.random() < self.mutationRate) {
        return d + polarity * self.mutationAmount;
      }
    });
    // add/remove value
    if (Math.random() < self.mutationRate * (self.mutationAmount * self.mutationRate)) {
      var index = Math.floor(Math.random() * self.data.length);

      if (polarity < 0) {
        self.data.splice(index, 1);
      } else {
        // Maybe use createData here?
        self.data.push(self.data[index]);
      }
    }
  },
  createData: function createData() {
    var data = Math.random() * 100;
    data = Math.floor(data);
    this.data.push(data);

    return this;
  }
};

G.Population = function () {
  this.startingPopulation = 5;
  this.entities = [];

  this.dnaPool = [];
  this.init();
};

G.Population.prototype.init = function () {
  this.createEntities();
  this.update = this.update.bind(this);
};
G.Population.prototype.reproduce = function (dna1, dna2) {
  dna1 = dna1.replicate();
  dna2 = dna2.replicate();

  var longer = dna1.genes.length > dna2.genes.length ? dna1 : dna2;
  var shorter = dna1.genes.length <= dna2.genes.length ? dna2 : dna1;

  var childGenes = longer.genes.forEach(function (gene, index) {
    if (Math.random() < 0.5) {
      childGenes.push(gene);
    } else {
      var newGene = shorter.genes[index] ? shorter.genes[index] : gene;
      childGenes.push(newGene);
    }
  });
};
G.Population.prototype.prune = function () {
  var self = this;
  self.dnaPool = self.dnaPool.map(function (dna) {
    return dna.alive;
  });
};
// This function lets you make a new pool of randomly created Dna objects.  It is not the recommended way to run a simulation, and is meant for testing purposes.
G.Population.prototype.createDnaPool = function () {
  for (var i = 0; i < this.startingPopulation; i++) {
    var newDna = new G.Dna();
    newDna.fillGenes();
    this.dnaPool.push(newDna);
  }

  return this.dnaPool;
};

G.Population.prototype.createEntities = function () {
  var self = this;
  for (var i = 0; i < this.startingPopulation; i++) {
    var e = new G.Entity();
    this.entities.push(e);
  }

  return this.entities;
};

G.Population.prototype.update = function (p) {
  this.entities.forEach(function (entity) {
    entity.update(p);
  });
};