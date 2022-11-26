Unary is less than binary. 

Let's imagine the number system with only one value, not two (0 and 1) like in binary. 
In fact - we all know this system and use it when we were a child and started counting and adding using our fingers. 

I tried to write a library (it is actualy useless and slow) which will count finger-counting-like style.
Any number is just an array. 
I tried not tu use shortcuts and not to use a fact, that computers can count it faster, than by scanning tables.
That's why i haven't written `add` function like: 
    - take numbers
    - convert them to int
    - add two ints
    - convert a result to Unary number. 

I scan tables intentionally to simulate reading each "digit" (i don't know if this digit is 0 or 1 :-D) and create another table, and copy both tables of components of the sum, one "digit" by one. 

I create two identical functions: length and intValue. This is intentional. length and int value is the same in this solution, but I treat it as a nice  coincidence. Maybe, in a future, I add some negative number support and could be that length won't be the same as value any more. 

