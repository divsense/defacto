const _kot = require('./_kot');


/**
 * Given a section 'choices' in the language definition and a node,
 * return the available choices
 *
 * @func
 * @memberOf defacto
 * @since v0.1.0
 * @category Function
 * @sig templateID -> JSON -> Array
 * @param {uid} templateId The current template id
 * @param {JSON} template This template to be converted to Divsense Tree
 * @return {JSON} Template as Divsense Tree JSON
 * @see parsing
 * @example
 *
 *      let templateId = "123"
 *      let template = {...}
 *      template(templateId, template)
 *      //returns {...}
 *
 */
export default function(templateId, template){
  return _kot('templates');
};            
