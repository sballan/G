G.Game = function(preload, create, update, x=800, y=600) {

    this.preload = preload || G.Service.Game.preload;
    this.create = create || G.Service.Game.create;
    this.update = update || G.Service.Game.update;

	
	var game = new Game.Phaser(x, y, Phaser.Auto, '', preload, create, update);

  }



};

//Consider Using lodash here.
G.Utils.addService(G.Game, G.Service.Game)
