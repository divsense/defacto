import _kot from 'internal/_kot';


/**
 * Given a section 'choices' in the language definition and a node,
 * return the available choices
 *
 * @func
 * @memberOf defacto
 * @since v0.1.0
 * @category Function
 * @sig uid -> DivsenseTree -> Array
 * @param {uid} nodeId The current node id
 * @param {JSON} divsenseTree This actor's divsense tree content
 *        (@TODO should it just be current, parent and siblings ?)
 * @param {JSON} choices The choices representation
 * @return {Array} Matching Array
 * @see parsing
 * @example
 *
 *      let node-id = "123"
 *      let divsense-tree = {...}
 *      let choices = {...}
 *      choices(node-id, divsense-tree, choices)
 *      //returns [...]
 *
 */
export default function(nodeId, divsenseTree, choices){
  return _kot('choices');
}            
