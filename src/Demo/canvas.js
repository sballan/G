//This class is used to create a canvas using p5.js.  Feel free to replace it!

G.Canvas = function(p) {
  this.drawFunctions = {};
  var self = this;

  var width = window.innerWidth;
  var height = window.innerHeight;

  function canvas(p) {
    p.setup = function() {
      // Sets the screen to be 640 pixels wide and 360 pixels high
      p.createCanvas(width, height);
    }
    p.draw = function() {

      self.draw()

      // Set the background to black and turn off the fill color
      p.background(0);
      p.noFill();

      // The two parameters of the point() method each specify
      // coordinates.
      // The first parameter is the x-coordinate and the second is the Y
      p.stroke(255);
      p.point(width * 0.5, height * 0.5);
      p.point(width * 0.5, height * 0.25);

      // Coordinates are used for drawing all shapes, not just points.
      // Parameters for different functions are used for different
      // purposes. For example, the first two parameters to line()
      // specify the coordinates of the first endpoint and the second
      // two parameters specify the second endpoint
      p.stroke(0, 153, 255);
      p.line(0, height * 0.33, width, height * 0.33);

      // By default, the first two parameters to rect() are the
      // coordinates of the upper-left corner and the second pair
      // is the width and height
      p.stroke(255, 153, 0);
      p.rect(width * 0.25, height * 0.1, width * 0.5, height * 0.8);
    }
  }
  return new p5(canvas, 'p5-canvas')
}

// This function executes all functions in teh drawFunctions object
G.Canvas.prototype.draw = function() {
  var funcs = this.drawFunctions

  for(var func in funcs) {
    if(typeof funcs[func] === 'function') funcs[func]()
  }
}

// This function takes a function and a name and creates a new key value pair of name and function in the drawFunctions object
G.Canvas.prototype.addFunction = function(func, name) {
  this.drawFunctions[name] = func
}

// This function uses the name parameter to remove the function with that name from the drawFunctions object.
G.Canvas.prototype.removeFunction = function(func, name) {
  this.drawFunctions[name] = null
}
