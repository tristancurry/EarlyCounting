/*
When attempting to create another copy of the image to make a faded-out, deselected version, the copy and the original
appeared to be the same object. Further research indicates that copies of such objects copy only the pointers and
not the data itself so any changes to one object are seen by the other. Doing a "deep copy" (1:1 pixel copy) is a solution
but appears to be quite resource intensive to do. The alternative workaround was to load the image again into the copy
prior to colour manipulation.

Displaying a second apple didn't seem to work (well, it deleted the first apple). This was despite explicitly hard-coding
all the variables and declaring the apples completely independently. The problem turned out to be that the button class variables
wwere declared in the Buttons tab but above the class declaration. Therefore, they were treated as global variables rather
than class variables so both objects had the same size, location and state.

Reseting the display with a new set (with one more apple wasn't working using the "NumberSet apples=new NumberSet(total+1, false);"
comman to reinitialise the class instance. It turns out that this was due to attemppting to declare that variable again rather
than just reinstantiating it. The command "apples=new NumberSet(total+1, false);" works

When triggering audio, there is a 0.5-1s lag. Not sure if this is an intractable issue with minim.
*/
