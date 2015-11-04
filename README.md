To achieve  framerate of 60fps for Pizza.html

The framerate before optimization : 30fps

Category		Stage 1 time	Stage 2 time	Stage 3 time
Scripting		14.89ms 		0.58ms (0.63)	0.65ms(0.71)
Rendering		14.57ms 		2.40ms 	(3.15)	2.10ms(2.10)
Painting		3.62ms 			4.43ms (6.47)	0.34ms(0.70)

Stage 1 optimization
Stage 1 was mainly concentrated on reducing the scripting time.
- I first reduced the number of pizza to be looped through at a time. Since not all of the 200 pizzas were not going to be displayed on the screen at a given time, i reduced it to 50, since that seemed like a safe number for lenghty mobile devices also.

Stage 2 optimization
- I replaced document.querySelector() with document.getElementsByClassName() or document.getElementById() depending on what suits best in that part of code
- There was way too many number of accesses (for every scroll) to DOM element in order to get the elements with class 'mover', I reduced it by declaring a global array variable and assigning it all the elements with 'mover' class when 'DOMContentLoaded' is invoked.
- Since the variable 'phase' was only holding one of the 5 values, I declared an array (phaseArray) and initialized each of the array element to one of the 5 possibilities (number % 5 is any number between 0 and 4). Now 'phaseArray' value is calculated only 5 times and the time is further reduced by calculating the 'scroller' only once per scroll as opposed to length of the pizzas earlier.
- Replaced the 'items[i].style.left' with 'items[i].style.transform'. Now the calculations involve 'phase' value of each element assigned when 'DOMContentLoaded' was invoked.

Stage 3 Optimization
- Applied 'backface-visibility: hidden' style to the 'mover' class (pizzas)
- In changePizzaSizes() function moved the calculation of new width outside the for loop since the calculations render the same value everytime.

