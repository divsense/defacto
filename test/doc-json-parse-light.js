
const nsf = require('../lib/defactoInternal.js').nsf;

const tst = require('../lib/defactoInternal.js').tst;
const R = require('ramda');
const compose = R.compose;
const yml = require('js-yaml');
const parser = require('./parser-json.js');
const fs = require('fs');
const util = require('util');

const tree = yml.safeLoad(fs.readFileSync('./doc-json-parse-light.yml', 'utf8'));


const nsfArrs = nsf.yml2nsf(tree);
//console.log(util.inspect(nsfArrs, false, null));process.exit();
const composeArgs = nsf.nsfReady(nsfArrs.nodes, nsfArrs.childNodes);
//console.log(composeArgs[0]());
const doc_html_src = R.compose(...composeArgs)();

//console.log(util.inspect(doc_html_src, false, null));process.exit();

const doc_html_src_ord = doc_html_src.reverse();
//console.log(JSON.stringify(doc_html_src, null, 2));process.exit();
const json = parser.parse(tst, doc_html_src_ord);

//console.log(util.inspect(json, {depth:null, breakLength:1}));
console.log(JSON.stringify(json,null, 3));
