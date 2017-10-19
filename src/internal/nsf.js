//
// Divsense Nodes Storage Format
//
const R = require('ramda');

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
