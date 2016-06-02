/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'pickems',
    podModulePrefix: 'pickems/features',
    environment: environment,
    baseURL: '/',
    nflYear: 2015,
    contactUrl: 'https://www.facebook.com/groups/FantasyPickems/',
    paypalEmail: 'rimlerm@gmail.com',
    weeks: {
      reg: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      post: [18, 19, 20, 22],
    },
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.api = {
      host: 'http://localhost:4000',
      namespace: 'api',
      auth: 'token',
      refresh: 'auth/token-refresh'
    }

    ENV['ember-simple-auth'] = {
      authenticationRoute: 'login',
      routeIfAlreadyAuthenticated: 'storylines',
      routeAfterAuthentication: 'storylines'
    };

    ENV['ember-cli-mirage'] = {
      enabled: false
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    ENV.api = {
      host: 'http://localhost:4000',
      namespace: 'api',
      auth: 'token',
      refresh: 'auth/token-refresh'
    }

    ENV['ember-simple-auth'] = {
      authorizer: 'authorizer:token'
    };

    ENV['ember-simple-auth-token'] = {
      refreshAccessTokens: true,
      timeFactor: 1000,
      refreshLeeway: 300,
      serverTokenEndpoint: `${ENV.api.host}/${ENV.api.namespace}/${ENV.api.auth}`,
      serverTokenRefreshEndpoint: `${ENV.api.host}/${ENV.api.namespace}/${ENV.api.refresh}`,
      identificationField: 'email'
    };

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
