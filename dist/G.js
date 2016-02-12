'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x7, _x8, _x9) { var _again = true; _function: while (_again) { var object = _x7, property = _x8, receiver = _x9; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x7 = parent; _x8 = property; _x9 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var G = {
  Defaults: {
    Body: undefined
  },
  Body: undefined,
  Sprite: {
    Creature: undefined
  },
  Game: undefined,
  Dna: undefined

};

G.Settings = {};

G.Entity = function () {};

G.Gene = function () {};

G.Population = function () {};

G.Dna = function () {};

// These are part of the Demo and can should be modified if you wish to make your own simulation
G.Canvas = function () {};

G.World = function () {};

G.Body = function () {
  this.category = 'body';
  this.ID = Math.floor(Math.random() * 1000000);
  this.timeBorn = new p5().millis();
  this.brain = undefined;
  this.dna = undefined;
  this.ancestors = [];

  this.traits = {
    health: {
      maxEnergy: 100,
      energy: 100
    },
    torso: {
      position: null,
      height: 10,
      width: 10,
      force: 20,
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
      speed: 10,
      color: 0x444444
    }

  };

  this.states = [];
  this.state = 'searchingFood';
  this.timeStartedState = new p5().millis();

  this.position = new p5.Vector(100, 100);
  this.velocity = new p5.Vector(0, 0);
  this.acceleration = new p5.Vector(0, 0);

  this.viewDistance = 100;
  this.maxspeed = 1;
  this.maxforce = 0.05;

  this.init();
};

G.Brain = function () {};

G.Food = function () {};

var simulation = (function () {

  var game = new Game();

  return {
    game: game
  };
})();
G.Defaults.Body = (function () {
  var traits = {
    health: {
      maxEnergy: 100,
      energy: 100
    },
    torso: {
      position: null,
      height: 10,
      width: 10,
      force: 20,
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
      speed: 10,
      color: 0x444444
    }
  };

  return {
    traits: traits
  };
})();
G.Defaults.Dna = (function () {
  var dataSize = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];

  var states = ['searchingFood', 'searchingPrey', 'searchingMate', 'pursuingFood', 'pursuingPrey', 'pursuingMate', 'eating', 'attacking', 'reproducing', 'avoiding'];

  var defaultDna = function defaultDna() {
    var dataArray = states.map(function (string) {
      var data = [];
      for (var i = 0; i < string.length; i++) {
        data.push(string.charCodeAt(i));
      }
      return data;
    });
    //fill with random numbers
    for (var i = 0; i < dataSize; i++) {
      var data = [];
      for (var j = 0; j < dataSize; j++) {
        data.push(Math.floor(Math.random() * 100));
      }
      dataArray.push(data);
    }
    return dataArray;
  };

  return {
    states: states,
    defaultDna: defaultDna
  };
})();

G.Body = function Body() {
  _classCallCheck(this, Body);

  this.traits = G.Defaults.Body().traits;
};
// The Brain class looks at a Creature's Dna and uses it to determine what to do next.

G.Brain = function (body) {

  this.timeStartedState = new p5().millis();
  console.dir(p5);

  // These should be hash maps that use the Body.ID property for lookup
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

G.Brain.prototype.searchingFood = function (dep) {
  var body = dep.body;
  var self = this;

  var surroundings = body.lookAround(dep);
  // console.log(surroundings)
  if (surroundings.closestFoodItem) {
    self.memory.target = surroundings.closestFoodItem;
    console.info("surroundings: ", surroundings);
    console.info("self is", self.memory);
    body.setState('pursuingFood');
  } else {
    body.searching(dep);
  }
};

G.Brain.prototype.pursuingFood = function (dep) {
  var body = dep.body;
  if (p5.Vector.dist(body.position, this.memory.target.position) < 15) {
    body.velocity.mult(0.3);
  }

  if (p5.Vector.dist(body.position, this.memory.target.position) < 2) {
    body.velocity.set(0, 0);
    body.acceleration.set(0, 0);
    body.setState('eating');
    return;
  }

  if (this.memory.target) {
    console.log("pursuing food");
    var force = body.seek(this.memory.target.position);
    body.applyForce(force);
  } else {
    this.memory.target = null;
    body.setState('searchingFood');
    console.info("didn't pursue food");
  }
};

G.Brain.prototype.eating = function (dep) {
  var body = dep.body;

  if (this.memory.target) {

    body.eat(this.memory.target);
  } else {
    this.memory.target = null;
    body.setState('searchingFood');
    console.info("didn't pursue food");
  }
};

G.Brain.prototype.update = function (world) {};

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

      var dep = { p: p };
      self.draw(dep);
    };
  }
  this.p5 = new p5(canvas, 'p5-canvas');
  this.init();
};

G.Canvas.prototype.init = function () {
  var self = this;

  var update = self.world.update; //.bind(self.world.population);
  self.addFunction('worldUpdate', update, self.world);
};

// This function executes all functions in teh drawFunctions object
G.Canvas.prototype.draw = function (dep) {
  var funcs = this.drawFunctions;

  for (var func in funcs) {
    if (typeof funcs[func] === 'function') funcs[func](dep);
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

G.Food = function (num) {
  this.foodItems = [];
  this.batchSize = 5 || num;

  // In milliseconds
  this.lastFoodTime = undefined;
  this.foodInterval = 10000;
};

G.Food.prototype.makeFood = function (dep) {
  this.lastFoodTime = new Date();

  for (var i = 0; i < this.batchSize; i++) {
    var foodItem = new G.Food.foodItem();

    var x = new p5().random(0, dep.world.width);
    var y = new p5().random(0, dep.world.height);

    foodItem.position = new p5.Vector(x, y);

    this.foodItems.push(foodItem);
  }
};

G.Food.prototype.update = function (dep) {
  dep.food = this;

  var self = this;

  var interval = new Date() - self.lastFoodTime;

  if (!self.lastFoodTime || self.foodInterval < interval) {
    console.log("Got to food interval");
    self.makeFood(dep);
  }

  this.foodItems.forEach(function (foodItem) {
    foodItem.update(dep);
  });
};

G.Food.prototype.changeIntervalSeconds = function (num) {
  this.changeIntervalMillis(num * 1000);
};

G.Food.prototype.changeIntervalMillis = function (num) {
  this.foodInterval = num;
};

G.Food.foodItem = function () {
  this.category = 'foodItem';
  this.ID = Math.floor(Math.random() * 1000000);
  this.position = undefined;
  this.percentEaten = 0.0;
  this.color = [138, 195, 121];

  var maxSize = 20;
  var minSize = 1;

  this.size = new p5().random(minSize, maxSize);
  this.totalChunks = this.size * this.size;
  this.energy = this.size;
};

G.Food.foodItem.prototype.render = function (p) {
  var self = this;
  p.push();
  p.stroke.apply(p, _toConsumableArray(self.color));
  p.fill.apply(p, _toConsumableArray(self.color));
  p.rect(self.position.x, self.position.y, self.size, self.size);
  p.pop();
};

G.Food.foodItem.prototype.removeChunks = function (num) {
  var self = this;
  self.totalChunks -= num;
  self.size = Math.sqrt(self.totalChunks);
  self.energy = size;
};

G.Food.foodItem.prototype.update = function (dep) {
  var self = this;
  var food = dep.world.food;

  if (self.energy < 1) {
    for (var i = 0; i < food.length; i++) {
      if (food[i].ID === self.ID) {
        food.splice(i, 1);
        break;
      }
    }
  }

  self.render(dep.p);
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

  this.width = undefined;
  this.height = undefined;
};

G.World.prototype.addPopulation = function (population) {
  this.population = population;
};

G.World.prototype.addFood = function (food) {
  this.food = food;
};

G.World.prototype.addItem = function (item) {
  this.items.push(item);
};

G.World.prototype.getAll = function () {
  var bodies = this.population.entities.map(function (entity) {
    return entity.body;
  });

  return [].concat(bodies, this.food.foodItems);
};

G.World.prototype.update = function (dep) {
  dep.world = this;

  this.population.update(dep);
  this.food.update(dep);
};

G.Game = (function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  function Game(x, y) {
    _classCallCheck(this, Game);

    var preload = G.Defaults.game.preload,
        create = G.Defaults.game.preload,
        update = G.Defaults.game.update;

    _get(Object.getPrototypeOf(Game.prototype), 'constructor', this).call(this, 800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
  }

  return Game;
})(Phaser.Game);

G.Game.World = (function (_Phaser$World) {
  _inherits(World, _Phaser$World);

  function World() {
    var width = arguments.length <= 0 || arguments[0] === undefined ? 800 : arguments[0];
    var height = arguments.length <= 1 || arguments[1] === undefined ? 600 : arguments[1];

    _classCallCheck(this, World);

    _get(Object.getPrototypeOf(World.prototype), 'constructor', this).call(this, width, height);
  }

  return World;
})(Phaser.World);

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
  this.category = 'entity';
};

G.Entity.prototype = {
  reproduce: function reproduce(entity) {
    //Event emitter to Population, sending this entity and another entity, and telling them both to reproduce.  Or maybe, sending this body and another body and then calling their reproduce functions, passing in a reference to the Population itself so that the offspring can be added to the gene-pool.
  },
  die: function die() {
    this.alive = false;
  },
  update: function update(dep) {
    this.body.update(dep);
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

G.Population.prototype.update = function (dep) {
  this.entities.forEach(function (entity) {
    entity.update(dep);
  });
};

G.Dna = function Dna() {
  _classCallCheck(this, Dna);

  this.genes = [];
};
G.Gene = (function () {
  function Gene() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var infoDetail = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];

    _classCallCheck(this, Gene);

    this._mutationRate = 0.1;
    this._mutationAmount = 3;
    this.data = data;
    this.infoDetail = infoDetail;
  }

  // Private Fields

  _createClass(Gene, null, [{
    key: '_createGeneDatum',
    value: function _createGeneDatum() {
      var data = Math.random() * 100;
      return Math.floor(data);
    }
  }, {
    key: '_createGeneData',
    value: function _createGeneData() {
      var num = arguments.length <= 0 || arguments[0] === undefined ? 10 : arguments[0];

      var data = [];

      for (var i = 0; i < num; i++) {
        data.push(this._createGeneDatum());
      }

      return data;
    }
  }, {
    key: 'mutate',
    value: function mutate(gene) {
      var polarity = Math.random() < 0.5 ? -1 : 1;

      //Change existing values
      gene.forEach(function (d) {
        if (Math.random() < this._mutationRate) {
          return d + polarity * this._mutationAmount;
        }
      });

      // add/remove value
      if (Math.random() < this._mutationRate * (this._mutationAmount * this._mutationRate)) {
        var index = Math.floor(Math.random() * gene.data.length);

        if (polarity < 0) {
          gene.data.splice(index, 1);
        } else {
          // Maybe use createData here?
          gene.data.push(gene.data[index]);
        }
      }
      return gene;
    }
  }, {
    key: 'createGene',
    value: function createGene() {
      var data = this._createGeneData(this.infoDetail);
      return new G.Gene(data);
    }
  }]);

  return Gene;
})();

G.Sprite = (function (_Phaser$Sprite) {
  _inherits(Sprite, _Phaser$Sprite);

  function Sprite() {
    _classCallCheck(this, Sprite);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(Sprite.prototype), 'constructor', this).apply(this, args);
  }

  return Sprite;
})(Phaser.Sprite);
G.Sprite.Creature = (function (_G$Sprite) {
  _inherits(Creature, _G$Sprite);

  function Creature() {
    _classCallCheck(this, Creature);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _get(Object.getPrototypeOf(Creature.prototype), 'constructor', this).apply(this, args);

    this.dna = undefined;
  }

  return Creature;
})(G.Sprite);
// Actions that the body can perform - eg, eat, attack, etc.
G.Body.prototype.eat = function (food) {
  console.log('In Eat function');
  if (food.category === 'foodItem') {
    console.log("eating");
    var biteSize = this.traits.mouth.size;

    food.removeChunks(biteSize);
    this.traits.health.energy += biteSize;
  } else if (food.category === 'body') {}
};

G.Body.prototype.decodeDna = function () {
  this.decodeStates();
  this.decodeMovement();
  this.decodeTraits();
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

G.Body.prototype.decodeTraits = function () {
  var self = this;

  var traits = {
    health: {},
    torso: {},
    eyes: {},
    mouth: {},
    claws: {},
    tail: {}
  };

  decodeHealth(traits);
  decodeTorso(traits);
  decodeEyes(traits);
  decodeMouth(traits);
  decodeClaws(traits);
  decodeTail(traits);

  self.traits = traits;

  return traits;

  // Private Functions
  function decodeHealth(traits) {
    traits.health.maxEnergy = self.dna.genes[10].data[2];
    return traits;
  }

  function decodeTorso(traits) {
    traits.torso.position = self.dna.genes[11].data[0];
    traits.torso.height = self.dna.genes[11].data[1] % 15 + 15;
    traits.torso.width = self.dna.genes[11].data[2] % 15 + 15;
    traits.torso.force = self.dna.genes[11].data[3];
    traits.torso.color = self.dna.genes[11].data[4];
  }

  function decodeEyes(traits) {
    traits.eyes.position = self.dna.genes[12].data[0];
    traits.eyes.size = self.dna.genes[12].data[1];
    traits.eyes.color = self.dna.genes[12].data[2];
  }

  function decodeMouth(traits) {
    traits.mouth.position = self.dna.genes[13].data[0];
    traits.mouth.size = self.dna.genes[13].data[1] % 6 + 10;
    traits.mouth.color = self.dna.genes[13].data[2];
  }

  function decodeClaws(traits) {
    traits.claws.position = self.dna.genes[14].data[0];
    traits.claws.size = self.dna.genes[14].data[1];
    traits.claws.color = self.dna.genes[14].data[2];
  }

  function decodeTail(traits) {
    traits.tail.position = self.dna.genes[15].data[0];
    traits.tail.size = self.dna.genes[15].data[1];
    traits.tail.color = self.dna.genes[15].data[2];
  }
};

// This class is used by the Creature class; you may write you own Body class to replace this one if you wish.
G.Body.prototype.init = function () {
  var self = this;

  self.dna = new G.Dna();
  var dataArray = G.Setup.defaultDna();
  self.dna.fillGenesFromArray(dataArray);

  self.decodeDna();

  self.brain = new G.Brain(self);
};

G.Body.prototype.setState = function (state) {
  if (this.states.indexOf(state) > 0) {
    this.state = state;
  } else {
    console.error("You tried to set an invalid state: ", state);
  }
};

G.Body.prototype.render = function (p) {
  var self = this;

  p.push();
  // Body
  p.stroke(255, 153, 100);
  p.fill(255, 153, 100);
  p.ellipse(self.position.x, self.position.y, self.traits.torso.width, self.traits.torso.height);

  p.push();
  // Mouth
  p.stroke(0, 0, 0);
  p.fill(0, 0, 0);
  p.ellipse(self.position.x, self.position.y - 5, self.traits.mouth.size, self.traits.mouth.size);
  p.pop();
  p.pop();
};

// Can accept a p5.Vector or a Creature
G.Body.prototype.update = function (dep) {
  // Attach the body to the depency dep
  dep.body = this;
  dep.brain = this.brain;

  if (dep.brain.memory.target && dep.brain.memory.target.energy < 1) {
    dep.brain.memory.target = null;
  }

  this.brain.update(dep);
  this.brain[this.state](dep);

  // Update velocity
  this.velocity.add(this.acceleration);

  // Limit speed
  this.velocity.limit(this.maxspeed);

  // Add velocity to current position
  this.position.add(this.velocity);

  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);

  this.render(dep.p);
};

G.Body.prototype.applyForce = function (force) {
  this.acceleration.add(force);
};

G.Body.prototype.searching = function (dep) {
  var world = dep.world;
  var body = dep.body;
  var memory = dep.brain.memory;

  if (!memory.target) {
    var x = new p5().random(0, world.width);
    var y = new p5().random(0, world.height);
    memory.target = {};
    memory.target.position = new p5.Vector(x, y);
  }

  if (p5.Vector.dist(body.position, memory.target.position) < 2) {
    memory.target = null;
    return;
  }

  var force = body.seek(memory.target.position);

  body.applyForce(force);
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

// returns an array of
G.Body.prototype.lookAround = function (dep) {
  var self = this;

  var surroundings = {
    bodies: [],
    food: [],
    closestBody: undefined,
    closestFoodItem: undefined
  };

  var bodyDistance = 9999999999;
  var foodDistance = 9999999999;

  var items = dep.world.getAll();
  //console.log(items)

  for (var i = 0; i < items.length; i++) {
    var data = self.checkDistance(items[i]);
    if (!data) continue;
    console.log("There is an item");

    var item = data.item;
    var targetDistance = data.targetDistance;

    if (item.category === 'body') {
      if (!surroundings.closestBody || targetDistance < bodyDistance) {
        surroundings.closestBody = item;
        bodyDistance = targetDistance;
      }
      surroundings.bodies.push(self.seeBody(item));
    } else if (item.category === 'foodItem') {
      if (!surroundings.closestFoodItem || targetDistance < foodDistance) {
        surroundings.closestFoodItem = item;
        foodDistance = targetDistance;
      }
      console.log("see food");
      surroundings.food.push(self.seeFoodItem(item));
    }
  }

  return surroundings;
};

G.Body.prototype.checkDistance = function (item) {
  var self = this;
  var data = {};
  data.item = item;
  data.targetDistance = p5.Vector.dist(self.position, item.position);

  if (data.targetDistance <= self.viewDistance) {
    //  console.log("return data", data)
    return data;
  } else {
    return false;
  }
};

// This function should assess the Body that it's looking at, and put it in the correct place in the Brain's memory.
G.Body.prototype.seeBody = function (body) {
  var self = this;

  var data = {
    body: body
  };

  // isFamily: self.checkFamily(body),
  // isFriend: self.checkFriend(body),
  // isEnemy: self.checkEnemy(body)
  return data;
};

G.Body.prototype.seeFoodItem = function (foodItem) {
  var self = this;

  // For use in future processing, perhaps of size and color of food.
  var data = {
    foodItem: foodItem
  };

  return foodItem;
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