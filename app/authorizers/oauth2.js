import Ember from 'ember';
import OAuth2Bearer from 'ember-simple-auth/authorizers/oauth2-bearer';
import ENV from 'pickems/config/environment';

const { isEmpty } = Ember;

export default OAuth2Bearer.extend({
  authorize(data, block) {
    if (!isEmpty(data.access_token)) {
      block('Authorization', `${ENV.api.headerKey} ${data.access_token}`);
    }
  }
});
