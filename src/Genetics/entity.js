// You should make your creature class inherit from this class in order to let it use G behaviors.
G.Entity = function() {
  this.alive = true;
  this.fitness = undefined;

  // A reference to the Entities in the population this Entity is a part of.
  this.entities = undefined;

  this.body = new G.Body();
}

G.Entity.prototype = {
  reproduce: function(entity) {
    //Event emitter to Population, sending this entity and another entity, and telling them both to reproduce.  Or maybe, sending this body and another body and then calling their reproduce functions, passing in a reference to the Population itself so that the offspring can be added to the gene-pool.
  },
  die: function() {
    this.alive = false;
  },
  update: function(p) {
    this.body.update(p)
    this.fitness = this.body.fitness
  }

}
