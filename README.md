bitwig-icc
=============

Inter-controller communication framework for Bitwig Studio.

Originally ported from my code written to facilitate the AbletonPlus module, much of it is now re-written to be more dynamic and easier to use.

Use the following to  demonstrate the callbackability:
```javascript
var a = new ICC.ICC_Controller('root_contoller');
a.create_value('w', 10);
a.create_value('x', 20);
a.create_value('y', 30);
a.create_value('z', 40);
function w_cb() {
    console.log('w callback');
}

function x_cb() {
    console.log('x callback');
}

function y_cb() {
    console.log('y callback');
}

function z_cb() {
    console.log('z callback');
}

a.add_callback([{
                identifier: 'w',
                callback: w_cb
                },
                {
                identifier: 'x',
                callback: x_cb                      
                },
                {
                identifier: 'y',
                callback: y_cb                      
                },
                {
                identifier: 'z',
                callback: z_cb                      
                }                
]);



var arr = a.get_value_objects(['w','x','y','z']);
var arr2 = a.get_value_objects(['w','x','y','z']);
for(i in arr){
    arr[i].set(arr[i].get() + 1)
    console.log(arr[i].get());   
}
```
