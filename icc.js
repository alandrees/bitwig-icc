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
*/

var ICC = ICC || {};


//prototype function
ICC.ICC_Controller = function() {
    this._master = None;
    this._enabled_devices = [];
    this._event_callbacks = {'icc_add' : [], 
			     'icc_remove' : [] };
    this._getter_callbacks = {};
    this._setter_callbacks = {};
}

////////////////////
//MEMBER FUNCTIONS//
////////////////////

/** ICC_Controller.add_controller
 *
 * Add a controller to the ICC system
 * 
 * @param controller controller to add to the ICC system
 * 
 * @returns None
 */
ICC.ICC_Controller.prototype.add_controller = function(controller){
    
}

/** ICC_Controller.remove_controller
 *
 * Remove a controller from the ICC system
 * 
 * @param controller controller to remove from the ICC system
 * 
 * @returns None
 */

ICC.ICC_Controller.prototype.remove_controller = function(controller){

}

////////////////////
//HELPER FUNCTIONS//
////////////////////

/** ICC_Controller.decorate_getter
 *
 * Set a variable as a getter (a value to be to be retrieved when the attached function is called)
 * 
 * @param variable
 * 
 * @returns None
 */

ICC.ICC_Controller.prototype.decorate_getter = function(input){
    input.GETTER = true;

    return input;
}

/** ICC_Controller.build_getter
 *
 * Set a variable as a getter (a variable to be retrieved when the attached function is called)
 * 
 * @param variable
 * 
 * @returns None
 */

ICC.ICC_Controller.prototype.decorate_setter = function(input){
    input.SETTER = true;

    return inpute;
}


/** ICC_Controller.build_getter
 *
 * Set a variable as a getter (a variable to be retrieved when the attached function is called)
 * 
 * @param variable
 * 
 * @returns None
 */

ICC.ICC_Controller.prototype.build_setter = function(input){
    input.SETTER = true;

    return input;
}


/** ICC_Controllerbuild_event_receiver
 *
 * Set a variable as a getter (a variable to be retrieved when the attached function is called)
 * 
 * @param variable
 * 
 * @returns None
 */

ICC.ICC_Controller.prototype.build_event_receiver = function(input){
    input.SETTER = true;

    return input;
}


///////////////////
//DEBUG FUNCTIONS//
///////////////////

/** debug_list_connected
 *
 * dumps a listing of the ICC core to the console logging window
 * 
 * @param None
 * 
 * @returns None
 */


ICC.ICC_Controller.prototype.debug_list_connections = function(){

}
