/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: "key-maps-interface",
    environment: environment,
    baseURL: "/",
    locationType: "hash",

    EmberENV: {
      FEATURES: {}
    },

    APP: {
      API_HOST: "http://localhost:3000"
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-eval'",
      'font-src': "'self' data: http://fonts.gstatic.com",
      'connect-src': "'self'",
      'img-src': "'self'",
      'style-src': "'self' fonts.googleapis.com",
      'media-src': "'self'"
    }
  };


  //
  //  {env} Development
  //
  if (environment === "development") {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }


  //
  //  {env} Test
  //
  if (environment === "test") {
    ENV.baseURL = "/";
    ENV.locationType = "none";

    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = "#ember-testing";
  }


  //
  //  {env} Production
  //
  if (environment === "production") {
    ENV.APP.API_HOST = "http://keymaps-api.herokuapp.com";
  }



  //
  //  {lib} Simple auth
  //
  ENV["simple-auth"] = {
    crossOriginWhitelist: [ENV.APP.API_HOST],
    authenticationRoute: "/sign-in",
    authorizer: "authorizer:custom",
    store: "simple-auth-session-store:local-storage"
  };


  //
  //  Other
  //
  ENV.contentSecurityPolicy["connect-src"] += (" " + ENV.APP.API_HOST);


  return ENV;
};
