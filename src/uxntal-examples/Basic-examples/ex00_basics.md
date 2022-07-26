# Uxn and Uxntal basics

## The Uxn VM

- The Uxn VM has 32KB of memory. This memory contains everything, including the program itself.
- In hexadecimal notation, "hex" for short, the memory runs from address 0x0000 to address 0xffff. 
- Because it is a stack machine, it has a separate stack and any operation you do takes values from the stack and/or puts values on the stack.
- The first 256 bytes ( 0000 to 00ff ) are called the "zero page" and are used for global variables. 
- The main program starts at `|0100` which indicates address 256 and ends at `BRK`, which is an instruction to stop the VM

## The Uxntal language 

Consider the following very simple Java program

    public class SimpleCalc {
        public static void main(String[] args) {
            char x=6;
            char y=7;
            char res = (char)(x*y); // Java does all maths in 'int' so you need to cast to 'char'
            System.out.print(res); // this will print '*', the character with ASCII code 42
        }
    }

In Uxntal, the same program looks like this:

    |0100 ( every program starts at address 256 )

    #06 ( put 6 on the stack as a single-byte constant (char in Java/C) constant )
    #07 ( put 7 on the stack as a single-byte constant (char in Java/C) constant )
    MUL ( multiply the value on the top of the stack, 6, with the value below that, 7, and put the result on the stack )
    #18 DEO ( prints '*' in the terminal, because 42 is the ASCII code for '*' )
    ( DEO means 'device output' and #18 is the output port for the terminal, like System.out in Java )

    BRK ( end of the main program )

This is very different from Java: there are no classes and there are not even variables. Also, Uxntal uses hexadecimal notation instead of decimal notation. 

We can make it a bit more clear by writing it in pseudo-code:

    program main:
        6 
        7
        *
        print
    end program

Because Uxntal is a stack-based language, anything you type will either be a value that goes on the stack, or an operation that works on values on the stack. So typing  `#06` (6) will put that on the stack, and the same for `#07`. Typing `MUL` (multiply,*) will do a multiplication of the two values on the stack, and put the result on the stack. So 6 and 7 are gone and replaced by 42 (`#2a` in hex). 

To print this value, we need to tell Uxn which output port to use, which is like choosing `System.out` or `System.err` in Java. In Uxn, the text output port, to print something on a command line terminal, is `#18` so we put that on the stack. Then the `DEO` (device output) operation takes these two values, `#2a` and `#18`, and the result is that it prints a '*'.

We could do it a bit more Java-like like this:

    |0000 ( this is optional but indicates that these variables are in the "zero-page memory" )
    @x $1 @y $1 @res $1 ( allocate three single-byte variables )

    |0100 ( main )

    #06 .x STZ ( this is like x=6 in Java )
    #07 .y STZ ( y=7 )
    .x LDZ ( put 6 on the stack as a 2-byte constant )
    .y LDZ ( put 7 on the stack as a 2-byte constant )
    MUL ( multiply the value on the top of the stack, 6, with the value below that, 7 )
    .res STZ
    ( the four lines above are equivalent to res = x*y in Java )
    .res LDZ
    #18 DEO ( prints '*' in the terminal, because 42 is the ASCII code for '*' )
    ( this is equivalent to  System.out.print(res) )

    BRK ( end main )

In Java, this is closer to

    public class SimpleCalc {
        public static char x,y,res; // x, y and res are class globals
        public static void main(String[] args) {
            x=6;
            y=7;
            res = (char)(x*y); 
            System.out.print(res); 
        }
    }

Now, if we wanted the multiplicate as a separate method we would do

    public class SimpleCalc {
        public static char x,y,res; 
        public static void main(String[] args) {
            x=6;
            y=7;
            res = mul(x,y);
            System.out.print(res); 
        }
        static char mul(char x, char y) {
            return (char) (x*y);
        }
    }

In Uxntal this is done like this:


    |0000 ( this is optional but indicates that these variables are in the "zero-page memory" )
    @x $1 @y $1 @res $1 ( allocate three single-byte variables )

    |0100 ( main )

    #06 .x STZ ( this is lile x=6 in Java )
    #07 .y STZ ( y=7 )
    .x LDZ ( put 6 on the stack as a 2-byte constant )
    .y LDZ ( put 7 on the stack as a 2-byte constant )
    ;mul JSR2 ( multiply the value on the top of the stack, 6, with the value below that, 7 )
    .res STZ
    ( the four lines above are equivalent to res = mul(x,y) in Java )
    .res LDZ
    #18 DEO ( prints '*' in the terminal, because 42 is the ASCII code for '*' )
    ( this is equivalent to  System.out.print(res) )

    BRK ( end main )

    @mul
        MUL
        JMP2r

We can define a function with `@mul` and call it with `;mul JSR2`. The `JMP2r` instruction is the equivalent of `return` in Java.
Because Uxntal is a stack language, when we call the function, it will use the values on the stack and return the result to the stack. We could do this via registers too:

    |0000 ( this is optional but indicates that these variables are in the "zero-page memory" )
    @x $1 @y $1 @res $1 ( allocate three single-byte variables )

    |0100 ( main )

    #06 .x STZ ( this is lile x=6 in Java )
    #07 .y STZ ( y=7 )

    ;mul JSR2 ( multiply the value on the top of the stack, 6, with the value below that, 7 )

    ( the line above is equivalent to res = mul(x,y) in Java )
    .res LDZ
    #18 DEO ( prints '*' in the terminal, because 42 is the ASCII code for '*' )
    ( this is equivalent to  System.out.print(res) )

    BRK ( end main )

    @mul
        .x LDZ ( put 6 on the stack as a 2-byte constant )
        .y LDZ ( put 7 on the stack as a 2-byte constant )    
        MUL
        .res STZ
        JMP2r

The closest Java program is now like this:

    public class SimpleCalc {
        public static char x,y,res;
        public static void main(String[] args) {
            x=6;
            y=7;
            mul(); // will read x and y and set res
            System.out.print(res); 
        }
        // This method uses global variables 
        static void mul() {
            res = (char)(x*y);
        }
    }

    