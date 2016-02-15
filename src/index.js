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


G.Settings = {}   


G.Entity = function() {}

G.Gene = function() {}


G.Population = function() {}

G.Dna = function() {}

// These are part of the Demo and can should be modified if you wish to make your own simulation
G.Canvas = function() {}

G.World = function() {}

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
    },

  }

  this.states = [];
  this.state = 'searchingFood';
  this.timeStartedState = new p5().millis()

  this.position = new p5.Vector(100, 100)
  this.velocity = new p5.Vector(0, 0)
  this.acceleration = new p5.Vector(0, 0)

  this.viewDistance = 100;
  this.maxspeed = 1
  this.maxforce = 0.05

  this.init()
}

G.Brain = function() {}

G.Food = function() {}
