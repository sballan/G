// Actions that the body can perform - eg, eat, attack, etc.
G.Body.prototype.eat = function(food) {
  if(food.category === 'foodItem') {

  	var biteSize = this.traits.mouth.size

  	food.removeChunks(biteSize)
  	this.traits.health.energy += biteSize

  } else if (food.category === 'body') {

  }
}
