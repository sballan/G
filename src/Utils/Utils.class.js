// Look up lodash methods to do these things.

G.Utils.Class = (function(){
  
  let addFunc = function(c, func) {
    old.prototype.[new] = new;
    return old;
  }
  
  let addService = function(c, service) {
    for(var prop in service) {
      c[prop] = service[prop]  
    }
    
    return c;
  }

  return {
    addFunc
  }
  
})()