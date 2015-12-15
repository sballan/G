// You should make your creature class inherit from this class in order to let it use G behaviors.
G.Creature = function() {
  this.alive = true;
  this.dna = new G.Dna();
  this.age = 0;
}

G.Creature.prototype = {
  die: function() {
    this.alive = false;
  }
}
