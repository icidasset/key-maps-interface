import Ember from "ember";
import ApplicationRouteMixin from "simple-auth/mixins/application-route-mixin";

export default Ember.Route.extend(ApplicationRouteMixin, {
  model: function() {
    return this.getModel();
  },

  getModel: function() {
    if (this.get("session.isAuthenticated")) {
      return this.store.find("map");
    }
  },

  actions: {
    sessionAuthenticationSucceeded: function() {
      var route = this;

      this.getModel().then(function(model) {
        route.controller.set("model", model);
      });

      this._super();
    },

    sessionInvalidationSucceeded: function() {
      if (this.controller) {
        this.controller.set("model", null);
      }

      this._super();
    }
  }
});
