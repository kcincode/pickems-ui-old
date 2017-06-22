/* eslint-env node */

module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'pickems',
    podModulePrefix: 'pickems/features',
    environment,
    rootURL: '/',
    nflYear: 2016,
    contactUrl: 'https://www.facebook.com/groups/FantasyPickems/',
    paypalEmail: 'rimlerm@gmail.com',
    locationType: 'auto',
    'ember-simple-auth': {
      authorizer: 'authorizer:token',
      authenticationRoute: 'login',
      routeIfAlreadyAuthenticated: 'storylines',
      routeAfterAuthentication: 'storylines'
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
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
      host: 'http://localhost:8000',
      namespace: 'api',
      auth: 'token',
      refresh: 'refresh',
      headerKey: 'Bearer'
    };

    ENV['ember-cli-mirage'] = {
      enabled: false
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    ENV.api = {
      host: 'http://localhost:8000',
      namespace: 'api',
      auth: 'token',
      refresh: 'refresh',
      headerKey: 'Bearer'
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
    ENV.api = {
      host: 'https://pickems-api.herokuapp.com',
      namespace: 'api',
      auth: 'token',
      refresh: 'refresh',
      headerKey: 'Bearer'
    };

    ENV['ember-simple-auth-token'] = {
      refreshAccessTokens: true,
      timeFactor: 1000,
      refreshLeeway: 300,
      serverTokenEndpoint: `${ENV.api.host}/${ENV.api.namespace}/${ENV.api.auth}`,
      serverTokenRefreshEndpoint: `${ENV.api.host}/${ENV.api.namespace}/${ENV.api.refresh}`,
      identificationField: 'email'
    };
  }

  return ENV;
};
