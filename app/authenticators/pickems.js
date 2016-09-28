import Ember from 'ember';
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from 'pickems/config/environment';

const { isEmpty, RSVP } = Ember;

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: `${ENV.api.host}/${ENV.api.namespace}/${ENV.api.auth}`,

  restore(data) {
    return new RSVP.Promise((resolve, reject) => {
      if (isEmpty(data.access_token)) {
        reject();
      } else {
        // console.log('data', JSON.stringify(data));
        resolve(data);
      }
    });
  }

});
