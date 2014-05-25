/**
 * Copyright 2014 Alan Drees
 *   
 * Purpose:
 *   Inter-controller communication code rewritten for Bitwig Studio
 *   Original: https://github.com/alandrees/RemoteScripts/ 
 *
 * Includes:
 *   None
 *
 * Dependencies
 *   None
 *
 * Namespace
 *   ICC
 */

//NOTES

/*two different method of approaching this problem:

1. Use the build functions to be able to do something like object.value = ICC.build_setter(function(){writeln('boo');});
2. Have the control surface classes maintain an internal list of getter, setter and callback functions, 
   and the build_* functions use magic to set the internal values of those variables

getter and setter functions should act as a push/pull event system.  Where as setter is a push event (and clients need to update their references),
a getter is a pull event where a client polls the 'source' for the given value.

passing object inststances maintained by the ICC class, getters and setters can use references to update variables, and signals (or design considerations) to let the clients
know that the value has been updated, or to update the value

May 24 2014:

How this is going to be used (deprecated):

adding a controller:
1: the ICC network will be initalized
2: A controller object having been designed to work with ICC
3: The controller object gets passed to the ICC system (via the register_controller) function.
   - checks a controller-maintained list of values to load, and loads those values into the object (this check is also done any time a controller is added, and conversely, removed)
   - checks a controller-maintained list of values which the controller provides, and adds entries into the ICC_Controller structure to allow other controllers to bind to
   - executes all of the already-bound objects icc_add functions (to update their internal references incase an object provides anything it might be looking for)
   - then adds the icc_add and icc_remove functions to the internal add and remove lists
   - then adds the controller as a reference to the managed controllers list

removing a controller:
After adding a controller:
1: Controller calls ICC_Controller.remove_controller(this)
2: 



Moving onward:

1. Values are created and destroyed by the ICC controller

*/

var ICC = ICC || {};


//constructor function
ICC.ICC_Controller = function(id) {
    if (typeof id === 'undefined') { throw "Controller requires identifier"; }

    this._id = id;
    
    this._events = {};
    this._values = {};
}

////////////////////
//MEMBER FUNCTIONS//
////////////////////

/** ICC_Controller.prototype.create_value
 * 
 * Create a value for which controllers can bind to
 *
 * @param identifier identifier for controllers to identify it by
 * @param init_value inital value to give the value
 * 
 * @returns None
 */

ICC.ICC_Controller.prototype.create_value = function(identifier, init_value){
    if (typeof identifier === 'undefined') { throw "Value requires identifier"; }
    if (typeof init_value === 'undefined') { init_value = 0; }

    if(typeof this._values[identifier] === 'undefined'){
	this._values[identifier] = new ICC.ICC_Value(identifier, init_value, this);
    }else{
	throw "Value Exists";
    }

    

    if(typeof this._events[identifier] === 'undefined'){
	this._events[identifier] = [];
    }else{
	throw "Callback Exists"
    }
}


/** ICC_Controller.prototype.remove_value
 * 
 * Remove a value from the ICC management system
 *
 * @param identifier identifier for the value to remove from the system
 *
 * @returns None
 */


ICC.ICC_Controller.prototype.remove_value = function(identifier){
    if (typeof this_values[identifier] !== 'undefined'){
	delete this._values[identifier]
    }   
}

/**\fn ICC_Controller.add_callback
 * 
 * Adds a callback to the callback list for a given ID
 * 
 * @param parameter_list array of objects which have the event identifier and callback
 *
 * @returns None
 */

ICC.ICC_Controller.prototype.add_callback = function(parameter){

    for(var i in parameter){
	if (typeof parameter[i].callback === 'function'){
	       
	    if (typeof this._events[parameter[i].identifier] === 'undefined')
	    {

		this._events[parameter[i].identifier] = [];
	    }
	    
	    this._events[parameter[i].identifier][this._events[parameter[i].identifier].length] = parameter[i].callback;
	}
    }
}


/**\fn ICC_Controller.get_value_objects
 * 
 * Retrives the value objects specified in the parameter_list array
 * 
 * @param parameter_list array of identifier to get objects for
 *
 * @returns (array or mixed type) if multiple identifiers passed, an  array containing an 'identifier' and 'obj' properties is returned, otherwise just the value object
 */

ICC.ICC_Controller.prototype.get_value_objects = function(parameter){

    if ( typeof parameter === 'undefined' ) { parameter = {}; }

    var return_array = {};

    for(var i in parameter){
	if (typeof this._values[parameter[i]] !== undefined) {
	    return_array[parameter[i]] = this._values[parameter[i]];
	}
    }

    if(parameter.length === 1){
	for(var i in return_array){
	    return return_array[i];
	}
    }else{
	return return_array;
    }
}


/**\fn ICC.ICC_Controller.prototype.fire_event
 * 
 * Fires a callback event if it's found in the list
 *
 * @param identifier event identifier to fire
 * 
 * @returns (boolean)True if found, false if no identifier found
 */

ICC.ICC_Controller.prototype.fire_event = function(identifier){
    if ( typeof identifier === 'undefined' ) { throw "No Identifier Specified"; }

    if ( typeof this._events[identifier] === 'undefined' ){
	return false;
    }else{
	for(var i in this._events[identifier]){
	    if ( typeof this._events[identifier][i] === 'function' ){
		this._events[identifier][i]();
	    }
	}
    }

    return true;
}
