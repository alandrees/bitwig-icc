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
ICC.ICC_Value = function(identifier){
    this._identifier = identifier;
    this._value = 0;
    this._update_callbacks = [];
    this._disconnect_callbacks = [];
    this._connect_callbacks = [];
}

/**\fn ICC_Value.update_value
 *
 * Updates a value and fires the notification callbacks
 * 
 * @param new_value new value for the object
 * 
 * @returns None
 */

ICC.ICC_Value.prototype.update_value = function(new_value){
    this._value = new_value;
    this.execute_registered_callbacks();
}


/**\fn ICC_Value.execute_registered_callbacks
 * 
 * Executes all of the connected callbacks for a value object
 *
 * @param None
 *
 * @retucrns None
 */

ICC.ICC_Value.prototype.execute_registered_callbacks = function(){

    for(var i = 0; i < this._update_callbacks.length; i++){
	this._update_callbacks[i]();
    }
}

/**\fn ICC_Value.add_callback
 * 
 * Adds a callback to the callback list
 *
 * @param cb callback to be added to the value object
 *
 * @returns True if it's added, False otherwise
 */

ICC.ICC_Value.prototype.add_callback = function(cb){
    if( (typeof cb === 'function') ){
	this._update_callbacks.push(cb);
	return true;
    }
    else
    {
	return false;
    }
}


/**\fn ICC_Value.remove_callback
 * 
 * Removes a callback from the callback list
 *
 * @param cb callback to be removed to the value object
 *
 * @returns True if it's successfully removed, False otherwise
 */

ICC.ICC_Value.prototype.remove_callback = function(cb){
    if(typeof cb === 'function'){
	for(var i = 0; i < this._update_callbacks.length; i++){
	    if ( cb === this._update_callbacks[i] ){
		this._update_callbacks.splice(i, 1);
		return false;
	    }
	}
    }

    return false;
}
