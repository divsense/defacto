/* @flow */

import * as nsf from './nsf.js';
import * as check from './tst-checks.js';
import * as R from 'ramda';

/*:: import type { dnode, dmodel, dstate, dstates, dprepRes, 
                   dprepCall, dcomputeCall, dnodeType } 
  from './types.js'; */

//export default exports;

/** ===== This represents a "Transformative State Tree" =====
 * These functions are mostly pure. They transform the tree based on state 
 * transitions WITHOUT STORING STATE, but only passing it forward
 * Parents can pass data and their state defined in prep_call to children.
 * Siblings compute based on state and can pass computed values to the next 
 * sibling via compute_call.
 * When all siblings are done, the final computed value gets returned to parent,
 *  which uses it for its own computation.  */

/** @TODO write up
 * @sig DSNode a => a -> b -> a -> c -> d -> e  */
export const traverseDepthPure = ( root /*: dnode */,
                                   data /*: dmodel */,
                                   fromParent /*: dprepRes */,
                                   prep_call /*: dprepCall */,
                                   compute_call /*: dcomputeCall */
                                 ) /*: ?{} */ => 
  {
    const chs = nsf.childNodes(root, data);
    return chs.reduce( (siblings_computed, node) => prepTraverseCompute(
      node, data, siblings_computed,
      fromParent, prep_call, compute_call), null);
  };

/** 
 * @sig dnode n => n, */
export const prepTraverseCompute = ( node /*: dnode */,
                                     data /*: dmodel */,
                                     siblings_computed /*: {} */,
                                     fromParent /*: dprepRes */,
                                     prep_call /*: dprepCall */,
                                     compute_call /*: dcomputeCall */
                                   ) /*: dprepRes */ => 
  {
    const prepRes = prep_call(node, fromParent);
    check.prepResEQfromParent(prepRes, fromParent); // 
    
    const children_computed = traverseDepthPure( node, data, prepRes,
                                                 prep_call, compute_call );
    
    return compute_call(node, fromParent, prepRes,
                        siblings_computed, children_computed);
  };

// Pure Depth First Traversal with Transformative Parse Tree
export const traversePure = (data /*: dmodel */,
                             prep_call /*: dprepCall */,
                             compute_call /*: dcomputeCall */
                            ) /*: dprepRes */ =>
  { 
    return prepTraverseCompute(data[0], data, {}, {}, prep_call, compute_call);
  };

/** 
 * 
 */
export const nextCall = (states /*: dstates */,
                         nodeType /*: dnodeType */
                        )  => (current_state /*: string */,
                               node /*: dnode */
                              ) /*: string */ => 
  {
    const node_type = nodeType(current_state, node);
    
    const next_state = states.find(function (el) {
      return el[0] === current_state && el[1] === node_type;
    });
    
    check.assertNextState(current_state, next_state, node_type);        
    return R.nth(2, next_state);
  };

export const stateMachine = ( states /*: dstates */,
                              nodeType /*: dnodeType */
                            ) /*: {} */ =>
  {
    return {
      states: states,
      nodeType: nodeType, 
      next : nextCall(states, nodeType)
    };
  };

/** @TODO REFACTOR THIS!!!. 
 * Make sure that the object 'obj' passed is instantiated and it has all
 * elements specified in the array 'arr' and that the elements are set to
 * preset or empty string if preset is undefined */
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
