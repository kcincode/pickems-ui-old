import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ENV from 'pickems/config/environment';
import fetch from 'ember-network/fetch';

const { inject: { service } } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: service(),
  currentUser: service(),
  beforeModel() {
    if (this.get('session').get('isAuthenticated')) {
      return fetch(`${ENV.api.host}/${ENV.api.namespace}/users/current`, {
        type: 'GET',
        headers: {
          'Authorization': `JWT ${this.get('session').get('session.content.authenticated.data.access_token')}`
        }
      }).then((raw) => {
        return raw.json().then((data) => {
          // console.log('data', JSON.stringify(data));
          // modify type to singular
          data.data.type = 'user';
          let currentUser = this.store.push(data);
          this.set('session.currentUser', currentUser);
        });
      }).catch((error) => {
        console.error(error);
        this.get('session').invalidate();
      });
    }
  }
});
