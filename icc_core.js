/**
 * Copyright 2014 Alan Drees
 *   
 * Purpose:
 *   Inter-controller communication code.  Core functionality, helper functions.
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

var ICC = ICC || {}; //icc namespace

ICC.icc_list = {}; //list of instances of ICC, indexed by their identifier, allowing for multiple ICC networks


/*************/
/* functions */
/*************/

/**\fn create_new_icc_network
 *
 * Create a new icc controller object
 *
 * @Param identifier id to refer to the ICC object
 *
 * @returns None
 */

ICC.create_new_icc_network = function(identifier){
    ICC.icc_list[identifier] = new ICC.ICC_Controller(identifier);

    return ICC.icc_list[identifier];
}




