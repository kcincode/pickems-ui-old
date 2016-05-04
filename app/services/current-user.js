import Ember from 'ember';
import ENV from 'pickems/config/environment';

const { inject: { service }, RSVP, isEmpty } = Ember;

export default Ember.Service.extend({
  session: service(),
  store: service(),
  user: null,
  loadCurrentUser() {
    if (this.get('session.isAuthenticated')) {
      return new RSVP.Promise((resolve) => {
        return $.get(`${ENV.api.host}/${ENV.api.namespace}/users/current`).then((user) => {
          this.set('user', user);
          resolve();
        }, () => {
          this.get('session').invalidate();
        });
      });
    }
  }
});
