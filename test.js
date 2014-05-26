/**
 * Copyright 2014 Alan Drees
 *   
 * Purpose:
 *   Test code to ensure that the ICC controller behaves as expected
 * 
 * Requires:
 *
 */

function test_contoller(icc_values){
    for(var i in icc_values){
       if(typeof this[i] === 'undefined'){
          this[i] = icc_values[i];
       }
    }
}

test_controller.prototype.w_cb = function(value) {
       console.log('w callback');
    
       console.log(this);
    
       console.log(w_cb.value_object.get());
}   

test_controller.prototype.x_cb = function(value) {
       console.log('x callback');
    
       console.log(this.zf1());
    
       console.log(x_cb.value_object.get());
};

test_controller.prototype.y_cb = function(value) {
       console.log('y callback');
    
       console.log(this.zf1());
    
       console.log(y_cb.value_object.get());
};

test_controller.prototype.z_cb = function(value) {
       console.log('z callback');
    
       console.log(this);
    
       console.log(z_cb.value_object.get());
}   

var a = new ICC.ICC_Controller('root_contoller');
a.create_value('x_offset', 9);
a.create_value('y_offset', 6);
a.create_value('select_track', 3);
a.create_value('extra', 'this is just some data');

var n = new test_controller(a.get_value_objects(['w','x','y','z']));

a.add_callback([{
                   identifier: 'w',
                   callback: n.w_cb
                   },
                   {
                   identifier: 'x',
                   callback: n.x_cb                      
                   },
                   {
                   identifier: 'y',
                   callback: n.y_cb                      
                   },
                   {
                   identifier: 'z',
                   callback: n.z_cb                      
                   }                
]);



var arr = a.get_value_objects(['w','x','y','z']);

w_cb.value_object = arr.w;
n.value_object = arr.x;
n.value_object = arr.y;
z_cb.value_object = arr.z;

for(i in arr){
    console.log("update " + arr[i]._identifier + ":");
    arr[i].set(arr[i].get() + 1)
    
}
