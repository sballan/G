G.Game = function(preload, create, update, x=800, y=600) {

    this.preload = preload || G.Service.Game.preload;
    this.create = create || G.Service.Game.create;
    this.update = update || G.Service.Game.update;

	
	return new Phaser.Game(x, y, Phaser.Auto, '', preload, create, update);
};

_.merge(G.Game, G.Service.Game);
