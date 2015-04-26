import Ember from "ember";
import AuthenticatedRouteMixin from "simple-auth/mixins/authenticated-route-mixin";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    return this.getModel();
  },

  getModel: function() {
    var m = this.modelFor("map");
    if (m) return m.get("map_items");
    else return null;
  },

  resetModel: function() {
    this.set("controller.model", this.getModel());
  }
});
