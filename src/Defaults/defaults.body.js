G.Defaults.Body = (()=>{
	var traits = {
      health: {
        maxEnergy: 100,
        energy: 100
      },
      torso: {
        position: null,
        height: 10,
        width: 10,
        force: 20,
        color: 0x444444
      },
      eyes: {
        position: null,
        size: 3,
        color: 0x444444
      },
      mouth: {
        position: null,
        size: 5,
        color: 0x444444
      },
      claws: {
        position: null,
        size: 6,
        color: 0x000000
      },
      tail: {
        position: null,
        size: 3,
        speed: 10,
        color: 0x444444
      }
  }

  return {
  	traits
  }


})()