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

    // Fill with states
    var dataArray = states.map(function(string) {
      var data = []
      for(var i = 0; i < string.length; i++) {
        data.push(string.charCodeAt(i));
      }
      return data
    })

    //fill with random numbers
    for(var i = 0; i < 10; i++) {
      var data = []
      for( var j = 0; j < 10; j++) {
        data.push(Math.floor(Math.random() * 100))
      }
      dataArray.push(data)
    }


    return dataArray
  },
  bodyView: function() {

  }



}
