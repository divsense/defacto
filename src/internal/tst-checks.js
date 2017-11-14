/** Error checking helper for tst.js
 *  This let's tst.js be as clean as possible */

exports.prepResEQfromParent = (p, f) => {
  if(p === f)
    throw new Error("Do not mutate fromParent inside of 'prep_call' and create " +
                        "a new object instead. Otherwise parent's next state won't " +
                        "be transitioned properly");
};

exports.assertNextState = (cs, ns, nt) => {
  if(!ns) throw new Error("There is no state for 'current_state' : " +
                          cs + " 'and node_type' : " + nt);
};

