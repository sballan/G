G.Food = function() {
  var maxSize = 30;
  var minSize = 2;

  this.category = 'food';
  this.size = new p5().random(minSize, maxSize);
}
