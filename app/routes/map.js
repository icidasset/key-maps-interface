import Ember from "ember";
import AuthenticatedRouteMixin from "simple-auth/mixins/authenticated-route-mixin";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    var m = this.getModel(params);
    if (m) return m;
    else return null;
  },

  getModel: function(params) {
    return this.store.all("map").filter(function(m) {
      return m.get("slug") === params.slug;
    })[0];
  }
});
