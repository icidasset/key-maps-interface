import Ember from "ember";
import UnauthenticatedRouteMixin from "simple-auth/mixins/unauthenticated-route-mixin";

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  model: function() {
    return this.store.createRecord("user");
  },

  beforeModel: function() {
    if (this.get("session.isAuthenticated")) {
      this.transitionTo("index");
    }
  }
});
