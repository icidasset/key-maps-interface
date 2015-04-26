import Ember from "ember";
import Base from "simple-auth/authorizers/base";

export default Base.extend({
  authorizationPrefix: "Bearer ",
  tokenPropertyName: "token",
  authorizationHeaderName: "Authorization",


  authorize: function(jqXHR) {
    var token = this.buildToken();

    if (this.get("session.isAuthenticated") && !Ember.isEmpty(token)) {
      if (this.authorizationPrefix) {
        token = this.authorizationPrefix + token;
      }

      jqXHR.setRequestHeader(this.authorizationHeaderName, token);
    }
  },


  buildToken: function() {
    return this.get("session." + this.tokenPropertyName);
  }

});
