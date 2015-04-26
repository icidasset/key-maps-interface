import Ember from "ember";

export function increment(val) {
  return parseInt(val) + 1;
}

export default Ember.HTMLBars.makeBoundHelper(increment);
