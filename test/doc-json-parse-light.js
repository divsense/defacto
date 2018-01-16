
const nsf = require('../lib/defactoInternal.js').nsf;

const tst = require('../lib/defactoInternal.js').tst;
const R = require('ramda');
const compose = R.compose;
const yml = require('js-yaml');
const parser = require('./parser-json.js');
const fs = require('fs');

/*
const doc_html_src = compose(
    nsf.setChildNodes("111", ["112", "125"])
    , nsf.setChildNodes("112", ["113", "115"])
    , nsf.setChildNodes("113", ["114"])
    , nsf.setChildNodes("115", ["215"])
    , nsf.setChildNodes("215", ["116"])
    , nsf.setChildNodes("116", ["117", "118"])
    , nsf.setChildNodes("118", ["120"])
    , nsf.setChildNodes("125", ["128", "132"])
    , nsf.setChildNodes("128", ["129"])
    , nsf.setChildNodes("132", ["133"])

    , nsf.makeNode("111", { t: "[", u: {type:"text"}})
    , nsf.makeNode("112", { t: "{", u: {type:"text"}})
    , nsf.makeNode("113", { t: "a", u: {type:"text"}})
    , nsf.makeNode("114", { t: "html", u: {type:"text"}})
    , nsf.makeNode("115", { t: "b", u: {type:"text"}})
    , nsf.makeNode("215", { t: "[", u: {type:"text"}})
    , nsf.makeNode("116", { t: "[", u: {type:"text"}})
    , nsf.makeNode("117", { t: "children", u: {type:"text"}})
    , nsf.makeNode("118", { t: "[", u: {type:"text"}})
    , nsf.makeNode("120", { t: "10", u: {type:"text"}})
    , nsf.makeNode("125", { t: "{", u: {type:"text"}})
    , nsf.makeNode("128", { t: "bool", u: {type:"text"}})
    , nsf.makeNode("129", { t: "true", u: {type:"text"}})
    , nsf.makeNode("132", { t: "obj", u: {type:"text"}})
    , nsf.makeNode("133", { t: "{", u: {type:"text"}})

)();
//*/

const tree = yml.safeLoad(fs.readFileSync('./doc-json-parse-light.yml', 'utf8'));

let quickID = 1; // don't  really care about this being mutable for now
const newKey = () => (quickID++).toString();
/** the tree is always what we start with */
const yml2nsf = (tree) => {
  if( tree === null ) return { nodes: [], childNodes: [], levelIDs: [] };
  else if( typeof tree !== 'object' ){
    return { nodes: [newKey(), tree.toString()], childNodes: [], levelIDs: [] };
  }
  else{
    return R.reduce((acc, pair) => {
      const subTree = yml2nsf(R.nth(1, pair));

      const keyID = newKey();
      const thisLevelNodes = R.append([keyID, R.nth(0, pair)], acc.nodes);
      const nodes = R.concat(thisLevelNodes, subTree.nodes);

      // don't need to concat these as only used from parent
      const thisLevelIDs = R.append(keyID, acc.levelIDs);
      
      const thisLevelChildNodes = (subTree.levelIDs.length > 1) ?
            R.append([keyID, subTree.levelIDs], acc.childNodes) : [];
      const childNodes = R.concat(thisLevelChildNodes, subTree.childNodes);      
      
      return { nodes: nodes, childNodes: childNodes, levelIDs: thisLevelIDs };
      
    }, { nodes: [], childNodes: [], levelIDs: [] }, R.toPairs(tree));
  }
  //  const doc_html_src = compose(...compseArgs); 
};

const nsfReady = (nodes, children) => {
  return R.concat(
    R.map((n) => nsf.makeNode(R.nth(0, n), {t: R.nth(1, n), u: {type:"text"}}), nodes),
    R.map((c) => nsf.setChildNodes(R.nth(0, c), R.nth(1, c)), children)
  );
};

const nsfArrs = yml2nsf(tree);
console.log( nsf.makeNode("133", { t: "{", u: {type:"text"}}));process.exit();
const kot = R.map((n) => nsf.makeNode("133", { t: "{", u: {type:"text"}} ), nsfArrs.nodes);
//const composed = nsfReady(nsfArrs.nodes, nsfArrs.childNodes);
console.log(JSON.stringify(kot, null, 4));
process.exit();

const doc_html_src = compose(...composeArgs);

const doc_html_src_ord = doc_html_src.reverse();
//console.log(JSON.stringify(doc_html_src_ord, null, 2))
const json = parser.parse(tst, doc_html_src_ord);

console.log(JSON.stringify(json, null, 4));
