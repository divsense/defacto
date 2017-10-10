import _kot from 'internal/_kot';


/**
 * (Example: examples/parsing.js)
 * 
 * This function is curried. In other words you can pass only parsing
 *  and then apply it to any other divsenseTree you desire.
 * @TODO finish this
 * 
 *
 * @func
 * @memberOf defacto
 * @since v0.1.0
 * @category Function
 * @sig a -> b -> *
 * @param {Object} parsing The parsing language definition
 * @param {Object} divsenseTree The divsense tree to be parsed.
 * @return {String} The same tree in a completely different type format,
 *         as String, which is based on 'parsing'.
 * @see choices
 * @example
 *   import parse from parse.js
 *   parse(a,b)
 */
export default function(parsing, divsenseTree){
  return _kot('parsing');
}      
