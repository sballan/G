G is a Genetic Algorithm library that provides extensible classes for use in any program.  It also contains a default class that can be used, modified, or simply used as an example.

*Dependencies:*
- p5.js

G provides several layers of abstraction/modularity to make it easy to modify for use in any project.  

G is a fully function simulation, but it can be easily modified to run your own simulations.  You can leave most of this framework intact; you will only need to replace the files in the 'Demo' folder; this includes the Body, Canvas, and World objects.  You may replace any number of these as you wish.

The Entity class and the Dna class are the fundamental parts of any G project.  The Body class is used in the Demo to determine the Entity's fitness, but any other method can be used if so desired.  In the Demo, the Body is where all the code is written for the creatures that appear in the simulation.  

The Body has a Brain property, which is used to store the code that is called when the Body is in any given state.  This is simply a design choice I made for the demo; I found it easier to divide my code between a Body and Brain class.  You may want to write a new Brain class to create new behaviors for the various Body states.

In short: The Entity class is meant to be used in all cases.  The Entity class will simply call update() functions, being agnostic of what sort of updates these are.  The Body class has been written specifically for the Demo simulation, and the Brain class can be thought of as a piece of the Body class.

The Setup class is used to store default values, functions, and data for testing and for program creation.

#### Entity ####

##### Properties: ######

- `alive`: Signifies whether the Entity will continue to be considered a part of the population

- `fitness`:  The level of fitness used to determine whether or not this entity will reproduce.

- `body`:  *(optional)*  In the demonstration, the body is used to determine what the effects of the genes will be on the fitness of the entity.  You may replace this property with one that suites your needs.

##### Methods:#####
- `reproduce`: *(parameter: `entity`)* Given another entity, this function combines the genes of this and the other entity to create a new one.  The implementation of the reproduction is completed in the Demo, and can be easily replaced.

- `die`: Sets the `alive` property to `false`, effectively removing this Entity from the Population.

- `update`: *(parameter: `p`)* This method is called once every tick, or in the case of the Demo, once every frame.  It calls the `body`'s `update` method as well.  `p` can be any data you'd like to pass down the update chain; in the case of the Demo, it is used to pass the p5 drawing context.

### Demo ###

#### Body ####

##### Properties: ######
- `category`: For use when iterating through all the items in an array that might contain Bodies and other objects.

- `brain`: An instance of the Brain class. The Brain contains the details of implementation for the various states.  The Body will call the Brain method that corresponds to the state it is currently in once per frame.

- `dna`: An instance of the Dna class.  Is used to determine the Body's behavior.

- `states`: An array of all possible states this Body can be in.

- `state`: The state the Body is currently in.  A state is basically a collection of methods that are called together; for instance, a certain set of methods may be called when the Body is in the 'searching' state.

- `position`: A `p5.Vector` object that represents the Body's location in 2D space.

- `velocity`: A `p5.Vector` object that represents the Body's current velocity.

- `acceleration`: A `p5.Vector` object that represents the Body's current acceleration.

- `maxspeed`: A number representing the maximum speed this Body will move at, no matter the current velocity.

- `maxforce`: The maximum force this Body will allow to operate on it.


##### Methods:#####

- `init`: Called when a new Body object is initialized.  Create a new Brain object, creates a new Dna Object, fills the Dna with default genes, and decodes the Dna by using it to overwrite certain properties.

- `applyForce`: A helper function that is used to add a force vector to the current acceleration vector.

- `seek`: *(parameter: `target`)* Is used to apply a force to the Body in the direction of an intended target.  `target` is a `p5.Vector`.  Returns a new `p5.Vector`.



Body Properties:
- Position
- Velocity
- Max Speed
- Max force

We apply various forces to the Body, weighting these forces according to genetic rules.  These forces will determine the next position the Body will move to.

#Body Navigation Functions:#
- Avoid
- Seek
