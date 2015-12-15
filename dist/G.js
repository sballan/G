'use strict';

var G = {};

G.Settings = {};

G.Gene = function () {};

G.Population = function () {};

G.Dna = function () {};

G.Creature = function () {};

// These are part of the Demo and can should be modified if you wish to make your own simulation
G.Canvas = function () {};

G.World = function () {};

G.Body = function () {};

G.Brain = function () {};

// You should make your creature class inherit from this class in order to let it use G behaviors.
G.Creature = function () {
  this.alive = true;
  this.body = new G.Body();
};

G.Creature.prototype = {
  setPosition: function setPosition() {
    var self = this;
    var args = Array.prototype.slice.call(arguments);
    self.body.setPosition.apply(self.body, args);
  },
  distanceTo: function distanceTo(vector) {
    return this.body.distanceTo(vector);
  },
  calcStep: function calcStep(end) {
    return this.body.calcStep(end);
  },
  moveToward: function moveToward(end) {
    this.body.moveToward(end);
  },
  moveAway: function moveAway(end) {
    this.body.moveAway(end);
  },
  die: function die() {
    this.alive = false;
  },
  update: function update() {
    this.body.update();
  }

};

// This class is used by the Creature class; you may write you own Body class to replace this one if you wish.
G.Body = function () {
  this.dna = new G.Dna();
  this.brain = null;
  this.position = new p5.Vector(0, 0);
  this.rotation = 0;

  this.currentStep = 5;
  this.maxStep = 10;
  this.minStep = 1;

  this.init();
};

G.Body.prototype = {
  init: function init() {
    this.defaultDna();
    this.brain = new G.Brain(this.dna);
  },
  setPosition: function setPosition() {
    var self = this;
    var args = Array.prototype.slice.call(arguments);

    new p5.Vector().set.apply(self.position, args);
  },

  distanceTo: function distanceTo(vector) {
    return this.position.dist(vector);
  },
  // Accepts a p5.Vector
  calcStep: function calcStep(end) {
    var step = this.currentStep;
    var start = this.position;
    var distance = start.dist(end);

    return p5.Vector.lerp(start, end, step / distance);
  },
  // Can accept a p5.Vector or a Creature
  moveToward: function moveToward(end) {
    var self = this;
    var endPoint;

    if (end instanceof p5.Vector) endPoint = end;else endPoint = end.body.position;

    var newPoint = self.calcStep(endPoint);
    self.setPosition(newPoint);
  },
  moveAway: function moveAway(end) {
    var self = this;
    var endPoint;

    if (end instanceof p5.Vector) endPoint = end;else endPoint = end.body.position;

    var newPoint = self.calcStep(endPoint);
    self.position.sub(newPoint);
  },

  update: function update() {
    this.brain.update();
  },

  defaultDna: function defaultDna() {
    var dataArray = G.Setup.defaultDna();
    this.dna.fillGenesFromArray(dataArray);

    return this.dna;
  }

};

// The Brain class looks at a Creature's Dna and uses it to determine what to do next.

G.Brain = function (dna) {
  this.dna = dna;
  this.states = [];
  this.state = 'SearchingFood';
  this.timeStartedState = null;

  this.init();
};

G.Brain.prototype = {
  init: function init() {
    this.decodeDna();
  },
  searchFood: function searchFood() {},
  decodeDna: function decodeDna() {
    this.decodeStates();
  },
  decodeStates: function decodeStates() {
    var states = this.dna.genes.map(function (gene, index) {
      return String.fromCharCode.apply(null, gene.data);
    });
    this.states = states.slice(0, 10);
    return this.states;
  }

};

//This class is used to create a canvas using p5.js.  Feel free to replace it!

G.Canvas = function (p) {
  this.drawFunctions = {};
  var self = this;

  var width = window.innerWidth;
  var height = window.innerHeight;

  function canvas(p) {
    p.setup = function () {
      p.createCanvas(width, height);
    };

    p.draw = function () {
      // Executes all the functions in the drawFunctions objet
      self.draw();

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
    };
  }
  return new p5(canvas, 'p5-canvas');
};

// This function executes all functions in teh drawFunctions object
G.Canvas.prototype.draw = function () {
  var funcs = this.drawFunctions;

  for (var func in funcs) {
    if (typeof funcs[func] === 'function') funcs[func]();
  }
};

// This function takes a function and a name and creates a new key value pair of name and function in the drawFunctions object
G.Canvas.prototype.addFunction = function (func, name) {
  this.drawFunctions[name] = func;
};

// This function uses the name parameter to remove the function with that name from the drawFunctions object.
G.Canvas.prototype.removeFunction = function (func, name) {
  this.drawFunctions[name] = null;
};

G.Setup = {
  defaultDna: function defaultDna() {
    var states = ['SearchingFood', 'SearchingPrey', 'SearchingMate', 'PursuingFood', 'PursuingPrey', 'PursuingMate', 'Eating', 'Attacking', 'Reproducing', 'Avoiding'];

    var dataArray = states.map(function (string) {
      var data = [];
      for (var i = 0; i < string.length; i++) {
        data.push(string.charCodeAt(i));
      }
      return data;
    });

    return dataArray;
  }

};

// The World class is designed to be used with p5.js and with the other classes in the Demo folder.  Feel free to write your own World class.

G.World = function (p) {};

G.Dna = function () {
  this.genes = [];
  this.alive = true;
  this.infoDetail = 10;
  this.fitness = 0;
};

G.Dna.prototype = {
  createGene: function createGene() {
    var newGene = new G.Gene();
    for (var i = 0; i < this.infoDetail; i++) {
      newGene.createData();
    }
    this.genes.push(newGene);

    return this;
  },
  fillGenes: function fillGenes() {
    this.genes = [];

    for (var i = 0; i < this.infoDetail; i++) {
      this.createGene();
    }
  },
  fillGenesFromArray: function fillGenesFromArray(arr) {
    var self = this;

    var genes = arr.map(function (data) {
      return new G.Gene(data);
    });

    self.genes = genes;
    return self.genes;
  },
  mutateGenes: function mutateGenes(genes) {
    return genes.map(function (gene) {
      return gene.mutate();
    });
  },
  replicate: function replicate() {
    return this.mutateGenes(this.genes);
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
  this.creatures = [];

  this.dnaPool = [];
};

G.Population.prototype = {
  reproduce: function reproduce(dna1, dna2) {
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
  },
  prune: function prune() {
    var self = this;
    self.dnaPool = self.dnaPool.map(function (dna) {
      return dna.alive;
    });
  },
  // This function lets you make a new pool of randomly created Dna objects.  It is not the recommended way to run a simulation, and is meant for testing purposes.
  createDnaPool: function createDnaPool() {
    for (var i = 0; i < this.startingPopulation; i++) {
      var newDna = new G.Dna();
      newDna.fillGenes();
      this.dnaPool.push(newDna);
    }

    return this.dnaPool;
  },

  update: function update() {
    this.creatures.forEach(function (creature) {
      creature.update();
    });
  }
};