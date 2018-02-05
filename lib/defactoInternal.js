(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ramda"));
	else if(typeof define === 'function' && define.amd)
		define("defactoInternal", ["ramda"], factory);
	else if(typeof exports === 'object')
		exports["defactoInternal"] = factory(require("ramda"));
	else
		root["defactoInternal"] = factory(root["ramda"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

//
// Divsense Nodes Storage Format
//
const R = __webpack_require__(1);

var BRANCH_CLASS = 0;
var BRANCH_NODES = 1;
var BRANCH_ID = 2;

var NO_ORDER = 0;
var LEVEL_ORDER = 1;
var DEPTH_FIRST = 2;

var isProp = function (node_props, filter_props) {

  if (node_props && filter_props) {
    return node_props.some(function (a) {
      var p = filter_props[a[0]];
      return p && p[a[1]];
    });
  }

  return false;
};

var isOpt = function (node, opt, prop) {
  return isProp(node.u, opt[prop].u) || isProp(node.k, opt[prop].k);
};

var findById = function (data) {
  return function (id) {
    for (var i = 0; i < data.length; i++) {
      if (data[i]._id === id) {
        return data[i];
      }
    }
  };
};

// This traverses the Array every time it needs to find something.
// @todo build similar using fastFind
var childNodes = function (node, data) {

  return (node.a || []).concat(node.b || []).reduce(function (m, b) {
    return m.concat(b[1]);
  }, []).map(findById(data));
};

var traverseLevelOrder = function (root, data, options, level, callback) {

  var chs = childNodes(root, data);

  var res = chs.some(function (n) {
    return !!callback(null, n, level);
  });

  if (!res) {
    res = chs.some(function (n) {
      return traverseLevelOrder(n, data, options, level + 1, callback);
    });
  }

  return res;
};

var traverseDepthFirst = function (root, data, options, level, callback) {

  var chs = childNodes(root, data);

  return chs.some(function (n) {

    var res, ll;

    if (options.pass && isOpt(n, options, "pass")) {
      res = traverseDepthFirst(n, data, options, level, callback);
    } else if (!options.take || isOpt(n, options, "take")) {
      if (!callback(null, n, level)) {
        res = traverseDepthFirst(n, data, options, level + 1, callback);
      }
    }

    return res;
  });
};

var props = function (obj) {
  return Object.keys(obj).reduce(function (m, a) {
    m.push([a, obj[a]]);
    return m;
  }, []);
};

var makeNode = function (id, params) {

  return function (set) {

    set = set || [];

    var s = { _id: id };

    if (params.t) s.t = params.t;

    if (params.u) s.u = props(params.u);

    if (params.k) s.k = props(params.k);

    set.push(s);
    return set;
  };
};

var setChildNodes = function (parentId, cids, side, branchName) {

  return function (set) {

    side = side || "a";
    branchName = branchName || "children-mmap";

    var node = R.find(function (e) {
      return e._id === parentId;
    }, set);

    if (node) {

      node[side] = node[side] || [];

      node[side].push([branchName, cids]);

      cids.forEach(function (id) {

        var node = R.find(function (e) {
          return e._id === id;
        }, set);
        if (node) {
          node.p = parentId;
        }
      });
    }

    return set;
  };
};

exports.findIndex = function (data, options) {

  if (Array.isArray(data)) {
    if (options.byId) {
      for (var i = 0; i < data.length; i++) {
        if (data[i]._id === options.byId) {
          return i;
        }
      }
    }
  }
};

exports.has = function (key, value, prop) {
  return prop.some(function (p) {
    return p[0] === key && p[1] === value;
  });
};

let quickID = 1; // don't  really care about this being mutable for now
const newKey = () => (quickID++).toString();
/** the tree is always what we start with */
const yml2nsf = tree => {
  if (tree === null) return { nodes: [], childNodes: [], levelIDs: [] };else if (typeof tree !== 'object') {
    const keyID = newKey();
    return { nodes: [[keyID, tree.toString()]], childNodes: [], levelIDs: [keyID] };
  } else {
    return R.reduce((acc, pair) => {
      const subTree = yml2nsf(R.nth(1, pair));

      const keyID = newKey();
      const key = R.nth(0, pair).replace(/ *`[^)]*` */g, "");
      const thisLevelNodes = R.append([keyID, key], acc.nodes);
      const nodes = R.concat(thisLevelNodes, subTree.nodes);

      // don't need to concat these as only used from parent
      const thisLevelIDs = R.append(keyID, acc.levelIDs);

      const thisLevelChildNodes = subTree.levelIDs.length > 0 ? R.append([keyID, subTree.levelIDs], acc.childNodes) : [];
      const childNodes = R.concat(thisLevelChildNodes, subTree.childNodes);

      return { nodes: nodes, childNodes: childNodes, levelIDs: thisLevelIDs };
    }, { nodes: [], childNodes: [], levelIDs: [] }, R.toPairs(tree));
  }
};

const nsfReady = (nodes, children) => {
  return R.concat(R.map(c => setChildNodes(R.nth(0, c), R.nth(1, c)), children), R.map(n => makeNode(R.nth(0, n), { t: R.nth(1, n), u: { type: "text" } }), nodes));
};

exports.nsfReady = nsfReady;
exports.yml2nsf = yml2nsf;
exports.childNodes = childNodes;
exports.makeNode = makeNode;
exports.setChildNodes = setChildNodes;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/** Error checking helper for tst.js
 *  This let's tst.js be as clean as possible */

exports.prepResEQfromParent = (p, f) => {
  if (p === f) throw new Error("Do not mutate fromParent inside of 'prep_call' and create " + "a new object instead. Otherwise parent's next state won't " + "be transitioned properly");
};

exports.assertNextState = (cs, ns, nt) => {
  if (!ns) throw new Error("There is no state for 'current_state' : " + cs + " 'and node_type' : " + nt);
};

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nsf__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nsf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__nsf__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "nsf", function() { return __WEBPACK_IMPORTED_MODULE_0__nsf__; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tst__ = __webpack_require__(10);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "tst", function() { return __WEBPACK_IMPORTED_MODULE_1__tst__; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tst_checks__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tst_checks___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__tst_checks__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "tstChecks", function() { return __WEBPACK_IMPORTED_MODULE_2__tst_checks__; });
/**
 * 
 * Refer to this for different es6 export/import options: 
 * http://stackoverflow.com/questions/25494365/es6-javascript-module-export-options
 * 
 * Refer to this for how the exporting functionality works:
 *  http://stackoverflow.com/questions/29722270/import-modules-from-files-in-directory
 * 
 */










/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nsf_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nsf_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__nsf_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tst_checks_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tst_checks_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__tst_checks_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ramda___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ramda__);




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
 * @sig DSNode a => a -> b -> c -> d -> e -> fe  */
const traverseDepthPure = (root /*: dnode */
, data /*: dmodel */
, fromParent /*: dprepRes */
, prep_call /*: dprepCall */
, compute_call /*: dcomputeCall */
) => /*: dprepRes */{
  const chs = __WEBPACK_IMPORTED_MODULE_0__nsf_js__["childNodes"](root, data);
  return chs.reduce((siblings_computed, node) => prepTraverseCompute(node, data, siblings_computed, fromParent, prep_call, compute_call), null);
};
/* harmony export (immutable) */ __webpack_exports__["traverseDepthPure"] = traverseDepthPure;


/** 
 * @sig dnode n => n, */
const prepTraverseCompute = (node /*: dnode */
, data /*: dmodel */
, siblings_computed /*: {} */
, fromParent /*: dprepRes */
, prep_call /*: dprepCall */
, compute_call /*: dcomputeCall */
) => /*: dprepRes */{
  const prepRes = prep_call(node, fromParent);
  __WEBPACK_IMPORTED_MODULE_1__tst_checks_js__["prepResEQfromParent"](prepRes, fromParent); // 

  const children_computed = traverseDepthPure(node, data, prepRes, prep_call, compute_call);

  return compute_call(node, fromParent, prepRes, siblings_computed, children_computed);
};
/* harmony export (immutable) */ __webpack_exports__["prepTraverseCompute"] = prepTraverseCompute;


// Pure Depth First Traversal with Transformative Parse Tree
const traversePure = (data /*: dmodel */
, prep_call /*: dprepCall */
, compute_call /*: dcomputeCall */
) => /*: dprepRes */{
  return prepTraverseCompute(data[0], data, {}, {}, prep_call, compute_call);
};
/* harmony export (immutable) */ __webpack_exports__["traversePure"] = traversePure;


/** 
 * 
 */
const nextCall = (states /*: dstates */
, nodeType /*: dnodeType */
) => (current_state /*: string */
, node /*: dnode */
) => /*: string */{
  const node_type = nodeType(current_state, node);

  const next_state = states.find(function (el) {
    return el[0] === current_state && el[1] === node_type;
  });

  __WEBPACK_IMPORTED_MODULE_1__tst_checks_js__["assertNextState"](current_state, next_state, node_type);
  return __WEBPACK_IMPORTED_MODULE_2_ramda__["nth"](2, next_state);
};
/* harmony export (immutable) */ __webpack_exports__["nextCall"] = nextCall;


const stateMachine = (states /*: dstates */
, nodeType /*: dnodeType */
) => /*: {} */{
  return {
    states: states,
    nodeType: nodeType,
    next: nextCall(states, nodeType)
  };
};
/* harmony export (immutable) */ __webpack_exports__["stateMachine"] = stateMachine;


/** @TODO REFACTOR THIS!!!. 
 * Make sure that the object 'obj' passed is instantiated and it has all
 * elements specified in the array 'arr' and that the elements are set to
 * preset or empty string if preset is undefined */
const ensureAll = (obj /*: null | { [string]: mixed } */
, arr /*: Array<string> */
, preset /*: mixed */
) => /*: any */{
  return __WEBPACK_IMPORTED_MODULE_2_ramda__["reduce"]((o, str) => {
    if (!preset) o[str] = o[str] || '';else o[str] = o[str] || preset;

    return o;
  }, obj, arr);
};
/* harmony export (immutable) */ __webpack_exports__["ensureAll"] = ensureAll;


const mmapToMap = function (data /*: mixed */) {
  return new Map(data.map(i => [i._id, i]));
};
/* harmony export (immutable) */ __webpack_exports__["mmapToMap"] = mmapToMap;


const fastFind = function (data /*: Map */, nodeId /*: string */) {
  return data.get(nodeId);
};
/* harmony export (immutable) */ __webpack_exports__["fastFind"] = fastFind;


/***/ })
/******/ ]);
});
//# sourceMappingURL=defactoInternal.js.map