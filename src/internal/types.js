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

export type dmodel = {
  NID: string,
  Node: dnode
};


//*/

