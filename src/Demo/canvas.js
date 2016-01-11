//This class is used to create a canvas using p5.js.  Feel free to replace it!

G.Canvas = class Canvas {
  constructor(world) {
    this.world = world

    this.drawFunctions = {};
    this.p5 = undefined;





    this.init()

  }

  init() {
    this.world.width = window.innerWidth;
    this.world.height = window.innerHeight;

    var self = this;



    var canvas = function(p) {
      var width =  self.world.width;
      var height =  self.world.height;

      p.setup = function() {

        console.log("width and height", width, height)
        p.createCanvas(width, height);
      }

      p.draw = function() {
        // Executes all the functions in the drawFunctions objet

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

        var dep = {p: p}
        self.draw(dep)
      }
    }

    self.p5 =  new p5(canvas, 'p5-canvas')

    var update = self.world.update  //.bind(self.world.population);
    self.addFunction('worldUpdate', update, self.world)
  }

  // This function executes all functions in teh drawFunctions object
  draw(dep) {
    var funcs = this.drawFunctions

    for(var func in funcs) {
      if(typeof funcs[func] === 'function') funcs[func](dep)
    }
  }

  // This function takes a function and a name and creates a new key value pair of name and function in the drawFunctions object
  addFunction(name, func, thisArg) {
    var self = this;
    if(thisArg) func = func.bind(thisArg)

    self.drawFunctions[name] = func
  }

  // This function uses the name parameter to remove the function with that name from the drawFunctions object.
  removeFunction(name, func) {
    this.drawFunctions[name] = null
  }

}
