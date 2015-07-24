import Authenticator from "../lib/authenticator";
import Authorizer from "../lib/authorizer";

export default {
  name: "authentication",
  before: "simple-auth",

  initialize: function(registry, application) {
    application.register("authenticator:custom", Authenticator);
    application.register("authorizer:custom", Authorizer);
  }
};
