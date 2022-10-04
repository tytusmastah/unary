Unary is less than binary. 

Let's imagine the number system with only one value, not two (0 and 1) like in binary. 
In fact - we all know this system and use it when we were a child and started counting and adding using our fingers. 

I tried to write a library (it is actualy useless and slow) which will count finger-counting-like style.
Any number is just an array. 
I tried not tu use shortcuts and not to use a fact, that computers can count it faster, than by scanning tables.
That's why i don't wrote `add` function like: 
    - take numbers
    - convert them to int
    - add two ints
    - convert a result to Unary number. 

Instead of it I'm using table scanning. 
