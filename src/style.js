import _kot from 'internal/_kot';

 /**
  * 
  * Given a section 'styles' in the language definition, a divsenseTree,  and a node,
  *  return the right properties to be added to the node.
  * This function is curried.
  * @TODO finish this
  *
  * @func
  * @memberOf defacto
  * @since v0.1.0
  * @category Function
  * @sig styles -> divsenseTree -> node -> *
  * @param {JSON} styles The styles in the language definition.
  * @param {JSON} divsenseTree The divsense tree to be parsed.
  * @param {uid} node The current node.
  * @return {*} The same tree in a completely different type format,
  *         which is based on 'parsing'.
  * @see choices
  * @example
  *
  *      parse(
  */
export default function(styles, divsenseTree, node){
  return _kot('style');
}
