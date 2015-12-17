G.Setup = {
  defaultDna: function() {
    var states = [
      'searchingFood',
      'searchingPrey',
      'searchingMate',

      'pursuingFood',
      'pursuingPrey',
      'pursuingMate',

      'eating',
      'attacking',
      'reproducing',
      'avoiding'
    ]

    var dataArray = states.map(function(string) {
      var data = []
      for(var i = 0; i < string.length; i++) {
        data.push(string.charCodeAt(i));
      }
      return data
    })

    return dataArray
  },
  bodyView: function() {
    
  }



}
