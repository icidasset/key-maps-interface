import Ember from "ember";

export default Ember.Route.extend({
  setupController: function(controller) {
    controller.set("errors", null);
  },

  beforeModel: function() {
    if (this.get("session.isAuthenticated")) {
      this.transitionTo("index");
    }
  }
});
