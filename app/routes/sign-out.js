import Ember from "ember";
import AuthenticatedRouteMixin from "simple-auth/mixins/authenticated-route-mixin";

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  beforeModel: function(transition) {
    if (this.get("session.isAuthenticated")) {
      transition.send("invalidateSession");
    } else {
      this.transitionTo("index");
    }
  }
});
