G.Defaults.Dna = ((dataSize = 10)=> {
  let states = [
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
  ];

  let defaultDna = function() {
    let dataArray = states.map((string) => {
      let data = [];
      for(let i = 0; i < string.length; i++) {
        data.push(string.charCodeAt(i));
      }
      return data
    });
    //fill with random numbers
    for(let i = 0; i < dataSize; i++) {
      let data = [];
      for(let j = 0; j < dataSize; j++) {
        data.push(Math.floor(Math.random() * 100))
      }
      dataArray.push(data)
    }
    return dataArray
  };

  return {
    states,
    defaultDna
  }
})();
