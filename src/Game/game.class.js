G.Game = class Game extends Phaser.Game {
  constructor(x, y) {
    let preload = G.Defaults.game.preload,
    create = G.Defaults.game.preload,
    update = G.Defaults.game.update

    super(800, 600, Phaser.AUTO, '', { preload, create, update})
  }



};

