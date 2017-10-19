(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("defacto", [], factory);
	else if(typeof exports === 'object')
		exports["defacto"] = factory();
	else
		root["defacto"] = factory();
})(this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/**
 * Doesn't do anything yet
 *
 * @private
 * @param {String} value The value to be returned
 * @return {String} The same value to be returned
 */

/* harmony default export */ __webpack_exports__["a"] = (function(value){
  return value + '_kot';
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__choice__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "choice", function() { return __WEBPACK_IMPORTED_MODULE_0__choice__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__keynode__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "keynode", function() { return __WEBPACK_IMPORTED_MODULE_1__keynode__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__parse__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return __WEBPACK_IMPORTED_MODULE_2__parse__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__template__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "template", function() { return __WEBPACK_IMPORTED_MODULE_3__template__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__style__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "style", function() { return __WEBPACK_IMPORTED_MODULE_4__style__["a"]; });
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_internal_kot__ = __webpack_require__(0);



/**
 * Given a section 'choices' in the language definition and a node,
 * return the available choices
 *
 * @func
 * @memberOf defacto
 * @since v0.1.0
 * @category Function
 * @sig uid -> DivsenseTree -> Array
 * @param {uid} nodeId The current node id
 * @param {JSON} divsenseTree This actor's divsense tree content
 *        (@TODO should it just be current, parent and siblings ?)
 * @param {JSON} choices The choices representation
 * @return {Array} Matching Array
 * @see parsing
 * @example
 *
 *      let node-id = "123"
 *      let divsense-tree = {...}
 *      let choices = {...}
 *      choices(node-id, divsense-tree, choices)
 *      //returns [...]
 *
 */
/* harmony default export */ __webpack_exports__["a"] = (function(nodeId, divsenseTree, choices){
  return Object(__WEBPACK_IMPORTED_MODULE_0_internal_kot__["a" /* default */])('choices');
});            


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_internal_kot__ = __webpack_require__(0);



/**
 (Example: ramda/src/internal/_clone)

 * Keynode specifications
 *
 * @func
 * @memberOf defacto
 * @since v0.1.0
 * @category Function
 * @sig String -> String -> String
 * @param {String} node The node text
 * @param {JSON} keynodes The keynodes representation
 * @return {*} Matching node
 * @see parsing
 * @example
 *
 *      let node-text = "if"
 *      keynode(node-text, keynodes)
 *      //returns true
 *
 */
/* harmony default export */ __webpack_exports__["a"] = (function(nodeText, keynodes){
  return Object(__WEBPACK_IMPORTED_MODULE_0_internal_kot__["a" /* default */])('parsing');
});        


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_internal_kot__ = __webpack_require__(0);



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
/* harmony default export */ __webpack_exports__["a"] = (function(parsing, divsenseTree){
  return Object(__WEBPACK_IMPORTED_MODULE_0_internal_kot__["a" /* default */])('parsing');
});      


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_internal_kot__ = __webpack_require__(0);



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
/* harmony default export */ __webpack_exports__["a"] = (function(templateId, template){
  return Object(__WEBPACK_IMPORTED_MODULE_0_internal_kot__["a" /* default */])('templates');
});            


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_internal_kot__ = __webpack_require__(0);


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
/* harmony default export */ __webpack_exports__["a"] = (function(styles, divsenseTree, node){
  return Object(__WEBPACK_IMPORTED_MODULE_0_internal_kot__["a" /* default */])('style');
});


/***/ })
/******/ ]);
});
//# sourceMappingURL=defacto.js.map