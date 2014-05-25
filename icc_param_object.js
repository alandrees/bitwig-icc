/**
 * Copyright 2014 Alan Drees
 *   
 * Purpose:
 *   Implements the object which represents the inter-controller communication values
 *  
 * Requires:
 *   None
 */

/***********/
/* objects */
/***********/

//prototype function

var ICC = ICC || {};

//constructor
ICC.ICC_Value = function(identifier, value, parent){

    if(typeof value === 'undefined'){value = 0;}

    this._parent = parent;
    this._identifier = identifier;
    this._value = value;
}

/**\fn ICC_Value.set
 *
 * Sets the value and fires the notification callback(s)
 * 
 * @param new_value new value for the object
 * 
 * @returns None
 */

ICC.ICC_Value.prototype.set = function(new_value){

    if(typeof new_value !== 'undefined'){
	this._value = new_value;
	
	if(this._parent.fire_event(this._identifier) === false){
	    throw "Object updated but no notification callback found.";
	}
	
    }
}

/**\fn ICC_Value.get
 * 
 * Get the value of the object
 *
 * @param None 
 * 
 * @returns (mixed type) Value of the object
 */

ICC.ICC_Value.prototype.get = function(){
    return this._value;
}

