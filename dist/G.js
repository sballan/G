'use strict';

var _get = function get(_x9, _x10, _x11) { var _again = true; _function: while (_again) { var object = _x9, property = _x10, receiver = _x11; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x9 = parent; _x10 = property; _x11 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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
  Service: {
    undefined: undefined
  },
  Game: undefined,
  Dna: undefined

};

console.log(G);
//var simulation = (() => {
//
//	var game = new Game();
//
//
//
//
//
//
//
//	return {
//		game
//	}
//
//})();

G.Body = function Body() {
  _classCallCheck(this, Body);

  this.traits = G.Defaults.Body().traits;
};
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

G.Game = function (preload, create, update) {
  var x = arguments.length <= 3 || arguments[3] === undefined ? 800 : arguments[3];
  var y = arguments.length <= 4 || arguments[4] === undefined ? 600 : arguments[4];

  this.preload = preload || G.Service.Game.preload;
  this.create = create || G.Service.Game.create;
  this.update = update || G.Service.Game.update;

  return new Phaser.Game(x, y, Phaser.Auto, '', preload, create, update);
};

_.merge(G.Game, G.Service.Game);

G.Service.Game = (function () {
  var properties = {
    width: 800,
    height: 600
  };

  var preload = function preload() {};

  var create = function create() {};

  var update = function update() {};

  return {
    properties: properties,
    preload: preload,
    create: create,
    update: update
  };
})();
G.Game.World = function () {
  var width = arguments.length <= 0 || arguments[0] === undefined ? 800 : arguments[0];
  var height = arguments.length <= 1 || arguments[1] === undefined ? 600 : arguments[1];

  return new Phaser.Game(width, height);
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