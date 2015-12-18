G is a Genetic Algorithm library that provides extensible classes for use in any program.  It also contains a default class that can be used, modified, or simply used as an example.

*Dependencies:*
- p5.js

G provides several layers of abstraction/modularity to make it easy to modify for use in any project.  

G is a fully function simulation, but it can be easily modified to run your own simulations.  You can leave most of this framework intact; you will only need to replace the files in the 'Demo' folder; this includes the Body, Canvas, and World objects.  You may replace any number of these as you wish.

The Creature class and the Dna class are designed to be agnostic of what sort of Body they are given, just be sure to replace all of Body's methods.  Your Body class should expose the methods to that the Creature class expects, and should call the appropriate Dna methods.  

The Body class is also meant to be agnostic of what sort of Brain it is given - in other words, you may use the Body class for any sort of simulation that involves a moving body (with a position, a velocity, etc) so long as you provide an appropriate Brain class.  The Brain class is used exclusively by the Body to interpret the Dna and act upon it.

In other words: The Creature class is meant to be used in all cases.  The creature class will simply call update() functions, being agnostic of what sort of updates these are.  The Body class is meant to be used in cases where there is a body that has a position (one that probably is to be represented graphically), and is meant to be agnostic of the implementation of these characteristics.  The Brain provided is meant to be used specifically with the p5.js framework, and implements the various functions that will determine the position of a body and it's other behaviors.




The Setup class is used to store default values, functions, and data for testing and for program creation.

#### Entity ####

##### Properties: ######

- `alive`: Signifies whether the Entity will continue to be considered a part of the population

- `fitness`:  The level of fitness used to determine whether or not this entity will reproduce.

- `body`:  *(optional)*  In the demonstration, the body is used to determine what the effects of the genes will be on the fitness of the entity.  You may replace this property with one that suites your needs.

##### Methods:#####

- `die`: Sets the `alive` property to `false`, effectively removing this Entity from the Population.

- `update`: This method is called once every tick, or in the case of the Demo, once every frame.  It calls the `body`'s `update` method as well.




Body Properties:
- Position
- Velocity
- Max Speed
- Max force

We apply various forces to the Body, weighting these forces according to genetic rules.  These forces will determine the next position the Body will move to.

#Body Navigation Functions:#
- Avoid
- Seek
