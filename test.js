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

var rc = ICC.create_new_icc_network('root_contoller');

rc.create_value('x_offset', 9);
rc.create_value('y_offset', 6);
rc.create_value('select_track', 3);
rc.create_value('extra', 'this is just some data');

var n = new testobj('n', rc.get_value_objects(['x_offset','y_offset','select_track','extra']));
var m = new testobj('m', rc.get_value_objects(['x_offset','y_offset','select_track','extra']));
var o = new testobj('o', rc.get_value_objects(['extra']));

rc.append_callback([{   identifier        : 'select_track',
                        callback          : n.st_cb,
		                  execution_context : n
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
                        callback          : o.e_cb,     
		                  execution_context : o                 
                    }]);

rc.prepend_callback([{   identifier        : 'x_offset',
                         callback          : o.x_cb,     
		                   execution_context : o                 
                     },
                     {
                         identifier        : 'y_offset',
                         callback          : o.y_cb,     
		                   execution_context : o                 
                     }]);

n.select_track.set(10);
m.x_offset.set(m.x_offset + 1);
n.y_offset.set(m.y_offset + 1);
m.extra.set("newvalue");
