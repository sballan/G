G.Setup = {
  defaultDna: function() {
    var states = [
      'SearchingFood',
      'SearchingPrey',
      'SearchingMate',

      'PursuingFood',
      'PursuingPrey',
      'PursuingMate',

      'Eating',
      'Attacking',
      'Reproducing',
      'Avoiding'
    ]

    var dataArray = states.map(function(string) {
      var data = []
      for(var i = 0; i < string.length; i++) {
        data.push(string.charCodeAt(i));
      }
      return data
    })

    return dataArray
  }



}
