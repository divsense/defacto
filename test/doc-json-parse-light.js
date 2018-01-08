
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

const tree = yml.safeLoad(fs.readFileSync('./test/doc-json-parse-light.yml', 'utf8'));

const yml2nsf = (nsfArr, tree) => {

  if( tree === null ) return nsfArr;
  else if( typeof tree !== 'object' ){
    nsfArr.push(nsf.makeNode( (nsfArr.count+1).toString(), { t: tree 
  }
  else{
    return R.reduce(() => {
      
    }, nsfArr, argsArr);
  }
  
  console.log(JSON.stringify(composeArgs, null, 2));
  process.exit();
  //  const doc_html_src = compose(...compseArgs);
  
};

  const doc_html_src = compose(...compseArgs);

  process.exit();

const doc_html_src_ord = doc_html_src.reverse();
//console.log(JSON.stringify(doc_html_src_ord, null, 2))
const json = parser.parse(tst, doc_html_src_ord);

console.log(JSON.stringify(json, null, 4))
