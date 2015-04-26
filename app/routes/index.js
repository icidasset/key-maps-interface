import Ember from "ember";

export default Ember.Route.extend({
  afterModel: function() {
    if (this.get("session.isAuthenticated")) {
      var ac = this.controllerFor("application");
      var header_component = ac.get("header_component");
      if (header_component) header_component.send("reset");
    }
  }
});
