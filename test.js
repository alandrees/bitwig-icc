/**
 * Copyright 2014 Alan Drees
 *   
 * Purpose:
 *   Test code to ensure that the ICC controller behaves as expected
 * 
 * Requires:
 *
 */

function testobj(id, icc_values){
    this.identifier = id;
 
    for(var i in icc_values){
       
	if(typeof this[i] === 'undefined'){
          this[i] = icc_values[i];
       }
    }
}

testobj.prototype.st_cb = function(value) {
     console.log('select_track callback fired (' + this.identifier + ')!'); 
}

testobj.prototype.x_cb = function(value) {
    console.log('x callback fired (' + this.identifier + ')!');
};

testobj.prototype.y_cb = function(value) {
    console.log('y callback fired (' + this.identifier + ')!');
};

testobj.prototype.e_cb = function(value) {
    console.log('extra callback fired (' + this.identifier + ')!');
}

var a = new ICC.ICC_Controller('root_contoller');

a.create_value('x_offset', 9);
a.create_value('y_offset', 6);
a.create_value('select_track', 3);
a.create_value('extra', 'this is just some data');

var n = new testobj('n', a.get_value_objects(['x_offset','y_offset','select_track','extra']));
var m = new testobj('m', a.get_value_objects(['x_offset','y_offset','select_track','extra']));

a.add_callback([{   identifier        : 'select_track',
                    callback          : n.st_cb,
		    execution_context : n
                },
                {
                    identifier        : 'x_offset',
                    callback          : n.x_cb,
		    execution_context : n
                },
                {
                    identifier        : 'y_offset',
                    callback          : n.y_cb,     
		    execution_context : n                 
                },
                {
                    identifier        : 'extra',
                    callback          : n.e_cb,     
		    execution_context : n                 
                },
		{   identifier        : 'select_track',
                    callback          : m.st_cb,
		    execution_context : m
                },
                {
                    identifier        : 'x_offset',
                    callback          : m.x_cb,     
		    execution_context : m                 
                },
                {
                    identifier        : 'y_offset',
                    callback          : m.y_cb,     
		    execution_context : m                 
                },
                {
                    identifier        : 'extra',
                    callback          : m.e_cb,     
		    execution_context : m                 
                }
               ]);

n.select_track.set(10);
m.x_offset.set(m.x_offset + 1);
n.y_offset.set(m.y_offset + 1);
m.extra.set("newvalue");
