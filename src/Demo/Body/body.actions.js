// Actions that the body can perform - eg, eat, attack, etc.
G.Body.prototype.eat = function(food) {
	console.log('In Eat function')
  if(food.category === 'foodItem') {
  	console.log("eating")
  	var biteSize = this.traits.mouth.size

  	food.removeChunks(biteSize)
  	this.traits.health.energy += biteSize

  } else if (food.category === 'body') {

  }
}
