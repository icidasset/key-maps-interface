import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route("sign_in", { path: "/sign-in" });
  this.route("sign_up", { path: "/sign-up" });
  this.route("sign_out", { path: "/sign-out" });

  // authenticated routes
  this.route("map", { path: "/:slug" }, function() {
    this.route("keys", { path: "/keys" });
    this.route("settings", { path: "/settings" });
    this.route("manage", { path: "/manage" });
  });
});
