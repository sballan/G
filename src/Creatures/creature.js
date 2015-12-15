// You should make your creature class inherit from this class in order to let it use G behaviors.
G.Creature = function() {
  this.alive = true;
  this.body = new G.Body();
  this.age = 0;
}

G.Creature.prototype = {
  setPosition: function() {
    var self = this;
    var args = Array.prototype.slice.call (arguments)
    self.body.setPosition.apply(self.body, args)
  },
  distanceTo: function(vector) {
    return this.body.distanceTo(vector)
  },
  calcStep: function(end) {
    return this.body.calcStep(end)
  },
  moveToward: function(end) {
    this.body.moveToward(end)
  },
  moveAway: function(end) {
    this.body.moveAway(end)
  },
  die: function() {
    this.alive = false;
  },
  update: function() {
    this.body.update()
  }

}
