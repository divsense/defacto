/* @flow */

import * as nsf from './nsf.js';
import * as c from './tst-checks.js';
/*:: import type dnode from './types.js'; */

//export default exports;

/** ===== This represents a "Transformative State Tree" =====
 * These functions are mostly pure. They transform the tree based on state transitions
 *  without storing state but only passing it forward
 * Parents can pass data and their state defined in prep_call to children.
 * Siblings compute based on state and can pass computed values to the next sibling via compute_call.
 * When all siblings are done, the final computed value gets returned to parent,
 *  which uses it for its own computation.  */

/** @TODO write up
 * @sig DSNode a => a -> b -> a -> c -> d -> e  */
export const traverseDepthPure = (root /*: dnode */, data /*: dnode */,
                                  fromParent, prep_call, compute_call) => {
  const chs = nsf.childNodes(root, data);
  return chs.reduce( function(siblings_computed, node, i){
    return prepTraverseCompute(node, data, siblings_computed, fromParent, prep_call, compute_call);
  }, null);
};

export const prepTraverseCompute = (node, data, siblings_computed, fromParent, prep_call, compute_call) => {
  const prepRes = prep_call(node, fromParent);
  c.prepResEQfromParent(prepRes, fromParent);
  
  const children_computed = traverseDepthPure( node, data, prepRes, prep_call, compute_call );
  
  return compute_call(node, fromParent, prepRes, siblings_computed, children_computed);
};

// Pure Depth First Traversal with Transformative Parse Tree
export const traversePure = (data /*: Array<number> */,
                             prep_call /*: Function */,
                             compute_call /*: Function */ ) => {
  if( !prep_call || !compute_call )
    return false;
  
  return prepTraverseCompute(data[0], data, {}, {}, prep_call, compute_call);
};

export const stateMachine = function stateMachine(states, nodeType) {
  if (!Array.isArray(states)) throw new Error("'states' should be an Array of [currentState, nodeType, nextState] items");
  if (!(typeof nodeType === 'function')) throw new Error("'nodeType' should be a function");
  
  return {
    states: states,
    nodeType: nodeType, 
    next : function(current_state, node) {
      if (!(typeof current_state === 'string'))
        throw new Error("'current_state' should be a string");
      
      var node_type = nodeType(current_state, node);
      
      var next_state = states.find(function (el) {
        return el[0] === current_state && el[1] === node_type;
      });
      
      if (!next_state)
        throw new Error("There is no state for 'current_state' : " +
                        current_state + " 'and node_type' : " + node_type);
      
      return next_state[2];
    }
  };
};
/** Make sure that the object 'obj' passed is instantiated and it has all
    elements specified in the array 'arr' and that the elements are set to
    preset or empty string if preset is undefined */
export const ensureAll = function(obj, arr, preset){
  obj = obj || {};
  return arr.reduce((o, str) => {
    if(!preset)
      o[str] = o[str] || '';
    else
      o[str] = o[str] || preset;
    
    return o;
  }, obj);
};

export const mmapToMap = function(data){
  var m = new Map();
  
  if( Array.isArray( data ) ){
    for(var i = 0; i < data.length; i++ ){
      m.set(data[i]._id, data[i]);
    }
  }else
    throw new Error("An mmap is always an Array");
  return m;
};

export const fastFind = function( data, nodeId ){
  if(data instanceof Map)
    return data.get(nodeId);
  else throw new Error("The func fastFind only expects a Map. Please use mmapToMap" +
                       "to convert to Map first and keep the data locally");
};
