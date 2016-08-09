import Ember from 'ember';
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import ENV from 'pickems/config/environment';

const { isEmpty, RSVP } = Ember;

export default OAuth2PasswordGrant.extend({
  serverTokenEndpoint: `${ENV.api.host}/${ENV.api.namespace}/${ENV.api.auth}`,

  restore(data) {
    return new RSVP.Promise((resolve, reject) => {
      const now                 = (new Date()).getTime();
      const refreshAccessTokens = this.get('refreshAccessTokens');
      if (!isEmpty(data['data']['expires_at']) && data['data']['expires_at'] < now) {
        if (refreshAccessTokens) {
          this._refreshAccessToken(data['data']['expires_in'], data['data']['refresh_token']).then(resolve, reject);
        } else {
          reject();
        }
      } else {
        if (isEmpty(data['data']['access_token'])) {
          reject();
        } else {
          this._scheduleAccessTokenRefresh(data['data']['expires_in'], data['data']['expires_at'], data['data']['refresh_token']);
          // console.log('data', JSON.stringify(data));
          resolve(data);
        }
      }
    });
  }

});
