/**
   parser functions
   Convert a Divsense map to a json file
*/

exports.parse = function(tst, src){
    let mMap = tst.mmapToMap(src);
    
    // for now use text to decide node type. could use an actual type property later
    // nodes for xml are either attributes, text or element
    let node_type = (current_state, node)  => {
        if(    current_state === '[-"'   || current_state === '{-key-"'  || current_state === '{' ||
               current_state === 'term'  || current_state === 'string'   ||
               current_state === 'value' || current_state === 'ignore')
            return '_';
        
        switch(node.t){
        case '[' :
        case '{' :
        case '"' :
        case 'true' :
        case 'false' :
        case 'null' :
            return node.t; break;
        default:
            return '_'; break;
        }
    }

    // underscore '_'  stands for anything, dash '-'  is reserved as the separator
    let states = [
        ['[',         '[',      '['],      // array followed array means another array started
        ['[',         '{',      '{'],      // array followed by object means an object just started
        ['[',         '"',      '"'],      // array followed by double quote means, surely a string item for the array is coming next
        ['"',         '_',      'string'], // double quote followed by '_', value is a definite string (doesn't matter of parent is array or object
        ['[',         'true',   'term'],   // array followed by true, a boolean true item is next
        ['[',         'false',  'term'],   // array followed by false, a boolean false item is next
        ['[',         'null',   'term'],   // array followed by null, a boolean false item is next
        ['[',         '_',      'value'],  // array followed by anything, an array item that needs to be analyzed is coming next
        ['{',         '_',      '{-key'],  // object followed by '_', object key
        ['{-key',     '"',      '"'],      // object key followed by '"', object value is string and starts next
        ['{-key',     '[',      '['],      // object key followed by '[', object value is an array
        ['{-key',     '{',      '{'],      // object key followed by '{', object value is an object
        ['{-key',     'true',   'term'],   // object followed by 'true', boolean true is value
        ['{-key',     'false',  'term'],   // object followed by 'false', boolean false is value
        ['{-key',     'null',   'term'],   // object followed by 'null', null is value
        ['{-key',     '_',      'value'],  // object followed by '_', value needs to be analyzed (could be number), otherwise string
        ['term',      '_',      'ignore'], // term (terminal node) followed by anything should be ignored
        ['string',    '_',      'ignore'], // string followed by anything should be ignored for now as well
        ['value',     '_',      'ignore'], // value followed by anything should be ignored for now as well
        ['ignore',    '_',      'ignore'], // value followed by anything should be ignored for now as well
    ];

    let computations = {
        '['(node, parent, prep, sib, ch){
            // children items are already an array. Just push to siblings items
            sib.items.push(ch.items)
            return sib
        },            
        '{'(node, parent, prep, sib, ch){
            // children items are to be transformed into an object
            // from an array of key value tuples to object key val: [{key,val}...] -> {key:val,...}
            let obj = ch.items.reduce( (acc, item) => {
                acc[item.key] = item.val;
                return acc;
            }, {});
            
            sib.items.push(obj)
            return sib
        },        
        '{-key'(node, parent, prep, sib, ch){
            sib.items.push({key:node.t, val:ch.items[0]})
            return sib
        },      
        '"'(node, parent, prep, sib, ch){
            sib.items.push(ch.items[0])
            return sib
        },      
        'string'(node, parent, prep, sib, ch){
            sib.items.push(node.t)
            return sib
        },      
        'term'(node, parent, prep, sib, ch){
            switch(node.t){
               case "true": sib.items.push(true); break;
               case "false": sib.items.push(false); break;
               case "null": sib.items.push(null); break;
            }
            return sib
        },      
        'ignore'(node, parent, prep, sib, ch){
            return sib
        },
        'value'(node, parent, prep, sib, ch){
            // value can be a number or a string
            let val = (isNaN(node.t)) ? node.t : Number(node.t);
            sib.items.push(val)
            return sib
        }
    }

    let state_machine = tst.stateMachine(states, node_type);

    // this gets called at each traversal step
    let prep_call = (node, fromParent) => {
        //let {_id, p, t, a:[ [, cm] = [] ] = [] } = node;

        let {state = node.t} = fromParent;
        let nextState = state_machine.next(state, node);
        return {state:nextState, node:node}
    };

    // this gets called after the children of this node finally have a computed value which was passed to this function
    let compute_call = (node, fromParent, fromPrep, siblings_computed, children_computed) => {
        // only items array is really needed and each parent will decide how to reduce it
        let siblings = tst.ensureAll(siblings_computed, ['items'], []);
        let children = tst.ensureAll(children_computed, ['items'], []);

        return computations[fromPrep.state](node, fromParent, fromPrep, siblings, children)
    };
      
    // The callback's return value will be used to be passed along to the node's children, so information that the
    // children need about this node, should be returned from the callback function
    var out = tst.traversePure(src, prep_call, compute_call); // 

    return out.items[0];

}


