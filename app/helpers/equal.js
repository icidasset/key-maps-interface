import Ember from "ember";

export function equal(arr) {
  return arr[0] === arr[1];
}

export default Ember.HTMLBars.makeBoundHelper(equal);
