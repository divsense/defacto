
const nsf = require('../lib/defactoInternal.js');
const tst = require('../src/internal/tst.js').tst;
const parser = require('./parser-json.js');

const doc_html_src = compose(
    nsf.setChildNodes("111", ["112", "125"])
    , nsf.setChildNodes("112", ["113", "115"])
    , nsf.setChildNodes("113", ["114"])
    , nsf.setChildNodes("115", ["215"])
    , nsf.setChildNodes("215", ["116"])
    , nsf.setChildNodes("116", ["117", "118"])
    , nsf.setChildNodes("118", ["119", "121", "122", "123", "124"])
    , nsf.setChildNodes("119", ["120"])
    , nsf.setChildNodes("125", ["126", "128", "130", "132", "134", "136"])
    , nsf.setChildNodes("126", ["127"])
    , nsf.setChildNodes("128", ["129"])
    , nsf.setChildNodes("130", ["131"])
    , nsf.setChildNodes("132", ["133"])
    , nsf.setChildNodes("134", ["135"])
    , nsf.setChildNodes("136", ["137"])


    , nsf.makeNode("111", { t: "[", u: {type:"text"}})
    , nsf.makeNode("112", { t: "{", u: {type:"text"}})
    , nsf.makeNode("113", { t: "a", u: {type:"text"}})
    , nsf.makeNode("114", { t: "html", u: {type:"text"}})
    , nsf.makeNode("115", { t: "b", u: {type:"text"}})
    , nsf.makeNode("215", { t: "[", u: {type:"text"}})
    , nsf.makeNode("116", { t: "[", u: {type:"text"}})
    , nsf.makeNode("117", { t: "children", u: {type:"text"}})
    , nsf.makeNode("118", { t: "[", u: {type:"text"}})
    , nsf.makeNode("119", { t: "\"", u: {type:"text"}})
    , nsf.makeNode("120", { t: "10", u: {type:"text"}})
    , nsf.makeNode("121", { t: "11", u: {type:"text"}})
    , nsf.makeNode("122", { t: "true", u: {type:"text"}})
    , nsf.makeNode("123", { t: "false", u: {type:"text"}})
    , nsf.makeNode("124", { t: "null", u: {type:"text"}})
    , nsf.makeNode("125", { t: "{", u: {type:"text"}})
    , nsf.makeNode("126", { t: "nr", u: {type:"text"}})
    , nsf.makeNode("127", { t: "12", u: {type:"text"}})
    , nsf.makeNode("128", { t: "bool", u: {type:"text"}})
    , nsf.makeNode("129", { t: "true", u: {type:"text"}})
    , nsf.makeNode("130", { t: "f", u: {type:"text"}})
    , nsf.makeNode("131", { t: "false", u: {type:"text"}})
    , nsf.makeNode("132", { t: "obj", u: {type:"text"}})
    , nsf.makeNode("133", { t: "{", u: {type:"text"}})
    , nsf.makeNode("134", { t: "a", u: {type:"text"}})
    , nsf.makeNode("135", { t: "[", u: {type:"text"}})
    , nsf.makeNode("136", { t: "\"", u: {type:"text"}})
    , nsf.makeNode("137", { t: "11", u: {type:"text"}})

)();

const doc_html_src_ord = doc_html_src.reverse();
//console.log(JSON.stringify(doc_html_src_ord, null, 2))
const json = parser.parse(tst, doc_html_src_ord);

console.log(JSON.stringify(json, null, 4))
