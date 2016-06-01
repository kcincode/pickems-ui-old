import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from 'pickems/config/environment';

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: `${ENV.api.host}/${ENV.api.namespace}/${ENV.api.auth}`
});
