G.Game = function(preload, create, update, x=800, y=600) {

    preload = preload || G.Defaults.game.preload;
    create = create || G.Defaults.game.preload;
    update = || G.Defaults.game.update;

	
	var game = new Game.Phaser(x, y, Phaser.Auto, '', preload, create, update);

  }



};

