/* @flow */

//*::

export type NID = string;
export type PID = string;
export type Prop =  [string, string];

export type dnode = {
  NID: NID,
  PID: PID,
  CH: Array<NID>,
  Tag: string,
  Text: string,
  Prop: Prop,
  Props: Array<Prop>
};

// Map dmodel NID dnode
export type dmodel = { NID: string, Node: dnode };

export type dstate = Array<string> ;

export type dstates = Array<dstate> ;

export type dprepRes = {state: dstate, node: dnode}

export type dprepCall = (dnode, dprepRes) =>  dprepRes ;

export type dcomputeCall = (dnode, dprepRes, dprepRes, {}, ?{}) 
  => {state: dstate, node: dnode} ; 

export type dnodeType = (string, dnode) => string ;

//*/

