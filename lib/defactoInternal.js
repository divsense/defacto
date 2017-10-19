(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ramda"));
	else if(typeof define === 'function' && define.amd)
		define("defactoInternal", ["ramda"], factory);
	else if(typeof exports === 'object')
		exports["defactoInternal"] = factory(require("ramda"));
	else
		root["defactoInternal"] = factory(root["ramda"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_10__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tst__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "tst", function() { return __WEBPACK_IMPORTED_MODULE_0__tst__["default"]; });
/**
 * 
 * Refer to this for different es6 export/import options: 
 * http://stackoverflow.com/questions/25494365/es6-javascript-module-export-options
 * 
 * Refer to this for how the exporting functionality works:
 *  http://stackoverflow.com/questions/29722270/import-modules-from-files-in-directory
 * 
 */

//export {default as nsf} from './nsf';



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nsf_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nsf_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__nsf_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tst_checks_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tst_checks_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__tst_checks_js__);



//export default exports;

/** ===== This represents a "Transformative State Tree" =====
 * These functions are mostly pure. They transform the tree based on state transitions
 *  without storing state but only passing it forward
 * Parents can pass data and their state defined in prep_call to children.
 * Siblings compute based on state and can pass computed values to the next sibling via compute_call.
 * When all siblings are done, the final computed value gets returned to parent,
 *  which uses it for its own computation.  */

/** @TODO write up
 * @sig DSNode a => a -> b -> a -> c -> d -> e  */
const traverseDepthPure = (root, data, fromParent, prep_call, compute_call) => {
  const chs = __WEBPACK_IMPORTED_MODULE_0__nsf_js__["childNodes"](root, data);
  return chs.reduce( function(siblings_computed, node, i){
    return prepTraverseCompute(node, data, siblings_computed, fromParent, prep_call, compute_call);
  }, null);
};
/* unused harmony export traverseDepthPure */


const prepTraverseCompute = (node, data, siblings_computed, fromParent, prep_call, compute_call) => {
  const prepRes = prep_call(node, fromParent);
  __WEBPACK_IMPORTED_MODULE_1__tst_checks_js__["prepResEQfromParent"](prepRes, fromParent);
  
  const children_computed = traverseDepthPure( node, data, prepRes, prep_call, compute_call );
  
  return compute_call(node, fromParent, prepRes, siblings_computed, children_computed);
};
/* unused harmony export prepTraverseCompute */


// Pure Depth First Traversal with Transformative Parse Tree
const traversePure = (data, prep_call, compute_call ) => {
  if( !prep_call || !compute_call )
    return false;
  if( !Array.isArray( data ) )
    throw "Array expected";
  
  return prepTraverseCompute(data[0], data, {}, {}, prep_call, compute_call);
};
/* unused harmony export traversePure */


const stateMachine = function stateMachine(states, nodeType) {
  if (!Array.isArray(states)) throw new Error("'states' should be an Array of [currentState, nodeType, nextState] items");
  if (!(typeof nodeType === 'function')) throw new Error("'nodeType' should be a function");
  
  return {
    states: states,
    nodeType: nodeType, 
    next : function(current_state, node) {
      if (!(typeof current_state === 'string'))
        throw new Error("'current_state' should be a string");
      
      var node_type = nodeType(current_state, node);
      
      var next_state = states.find(function (el) {
        return el[0] === current_state && el[1] === node_type;
      });
      
      if (!next_state)
        throw new Error("There is no state for 'current_state' : " +
                        current_state + " 'and node_type' : " + node_type);
      
      return next_state[2];
    }
  };
};
/* unused harmony export stateMachine */

/** Make sure that the object 'obj' passed is instantiated and it has all
    elements specified in the array 'arr' and that the elements are set to
    preset or empty string if preset is undefined */
const ensureAll = function(obj, arr, preset){
  obj = obj || {};
  return arr.reduce((o, str) => {
    if(!preset)
      o[str] = o[str] || '';
    else
      o[str] = o[str] || preset;
    
    return o;
  }, obj);
};
/* unused harmony export ensureAll */


const mmapToMap = function(data){
  var m = new Map();
  
  if( Array.isArray( data ) ){
    for(var i = 0; i < data.length; i++ ){
      m.set(data[i]._id, data[i]);
    }
  }else
    throw new Error("An mmap is always an Array");
  return m;
};
/* unused harmony export mmapToMap */


const fastFind = function( data, nodeId ){
  if(data instanceof Map)
    return data.get(nodeId);
  else throw new Error("The func fastFind only expects a Map. Please use mmapToMap" +
                       "to convert to Map first and keep the data locally");
};
/* unused harmony export fastFind */



/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

//
// Divsense Nodes Storage Format
//
const R = __webpack_require__(10);

var BRANCH_CLASS = 0;
var BRANCH_NODES = 1;
var BRANCH_ID = 2;

var NO_ORDER = 0;
var LEVEL_ORDER = 1;
var DEPTH_FIRST = 2;

var isProp = function( node_props, filter_props ){

  if( node_props && filter_props ){
    return node_props.some(function(a){
      var p =  filter_props[ a[0] ];
      return ( p && p[ a[1] ] );
    });
  }

  return false;
};

var isOpt = function( node, opt, prop ){
  return isProp( node.u, opt[prop].u ) || isProp( node.k, opt[prop].k );
};

var findById = function( data ){
  return function( id ){
    for(var i = 0; i < data.length; i++ ){
      if( data[i]._id === id ){
        return data[i];
      }
    }
  };
};

// This traverses the Array every time it needs to find something.
// @todo build similar using fastFind
var childNodes = function( node, data ){

  return ( (node.a || [] ).concat( (node.b || []) ) )
    .reduce( function(m,b){
      return m.concat( b[1] );
    }, [])
    .map( findById(data) );

};

var traverseLevelOrder = function( root, data, options, level, callback ){

  var chs = childNodes( root, data );

  var res = chs.some( function(n){
    return !!callback( null, n, level );
  });

  if( !res ){
    res = chs.some( function(n){
      return traverseLevelOrder( n, data, options, (level + 1), callback );
    });
  }

  return res;
};

var traverseDepthFirst = function( root, data, options, level, callback ){

  var chs = childNodes( root, data );

  return chs.some( function(n){

    var res, ll;

    if( options.pass && isOpt( n, options, "pass" ) ){
      res = traverseDepthFirst( n, data, options, level, callback );
    }
    else if( !options.take || isOpt( n, options, "take" ) ){
      if( !callback( null, n, level ) ){
        res = traverseDepthFirst( n, data, options, level + 1, callback );
      }
    }

    return res;

  });


};

var props = function( obj ){
  return Object.keys( obj ).reduce(function(m,a){
    m.push( [ a, obj[ a ] ] );
    return m;
  }, []);
};

var makeNode = function( id, params ){

  return function(set){

    set = set || [];

    var s = {_id: id};

    if( params.t ) s.t = params.t;

    if( params.u ) s.u = props( params.u );

    if( params.k ) s.k = props( params.k );

    set.push( s );
    return set;
  };
};

var setChildNodes = function( parentId, cids, side, branchName ){

  return function(set){

    side = side || "a";
    branchName = branchName || "children-mmap";

    var node = R.find(function(e){return e._id === parentId;}, set);

    if( node ){

      node[ side ] = node[ side ] || [];

      node[ side ].push( [ branchName, cids] );

      cids.forEach( function(id){

        var node = R.find(function(e){return e._id === id;}, set);
        if( node ){
          node.p = parentId;
        }

      });
    }

    return set;
  };
};

exports.findIndex = function( data, options ){

  if( Array.isArray( data ) ){
    if( options.byId ){
      for(var i = 0; i < data.length; i++ ){
        if( data[i]._id === options.byId ){
          return i;
        }
      }
    }
  }
};

exports.has = function( key, value, prop ){
  return prop.some( function(p){ return (p[0] === key && p[1] === value); });
};

exports.childNodes = childNodes;

exports.makeNode = makeNode;
exports.setChildNodes = setChildNodes;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

/** Error checking helper for tst.js
 *  This let's tst.js be as clean as possible */

exports.prepResEQfromParent = (p, f) => {
  if(p === f)
    throw new Error("Do not mutate fromParent inside of 'prep_call' and create " +
                        "a new object instead. Otherwise parent's next state won't " +
                        "be transitioned properly");
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=defactoInternal.js.map