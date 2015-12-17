This is a Genetic Algorithm library that provides extensible classes for use in any program.  It also contains a default class that can be used, modified, or simply used as an example.

*Dependencies:*
- p5.js

G is a fully function simulation, but it can be easily modified to run your own simulations.  You can leave most of this framework intact; you will only need to replace the files in the 'Demo' folder; this includes the Body, Canvas, and World objects.  You may replace any number of these as you wish.

The Creature class and the Dna class are designed to be agnostic of what sort of Body they are given, just be sure to replace all of Body's methods.  Your Body class should expose the methods to that the Creature class expects, and should call the appropriate Dna methods.  The Brain class is used exclusively by the Body to interpret the Dna; if you modify the Body class you will need to modify the Brain class (or make a new class) accordingly.

The Setup class is used to store default values, functions, and data for testing and for program creation.


*Body Properties:*
- Position
- Velocity
- Max Speed
- Max force

We apply various forces to the Body, weighting these forces according to genetic rules.  These forces will determine the next position the Body will move to.

*Body Navigation Functions:*
- Avoid
- Seek
