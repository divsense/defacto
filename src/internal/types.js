/* @flow */

//*::

export type dnode = {
  NID: string,
  PID: string,
  CH: Array<NID>,
  Tag: string,
  Text: string,
  Prop: [string, string],
  Props: Array<Prop>
};

// Map dmodel NID dnode
export type dmodel = {
  string, dnode
};

export type dstate = Array<string> ;

export type dstates = Array<dstate> ;

export type dprepRes = {state: dstate, node: dnode}

export type dprepCall = (dnode, dnode) =>  dprepRes;

export type dcomputeCall = (dnode, dnode, ) => {state: dstate, node: dnode} ;



//*/

