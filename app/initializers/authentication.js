import Authenticator from "../lib/authenticator";
import Authorizer from "../lib/authorizer";

export default {
  name: "authentication",
  before: "simple-auth",

  initialize: function(container) {
      container.register("authenticator:custom", Authenticator);
      container.register("authorizer:custom", Authorizer);
  }
};
