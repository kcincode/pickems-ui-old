import Ember from 'ember';
import ENV from 'pickems/config/environment';
import fetch from 'ember-network/fetch';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service } } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  system: service(),

  model() {
    return fetch(`${ENV.api.host}/${ENV.api.namespace}/stats/weekly`, {
      type: 'GET',
      headers: {
        'Authorization': `JWT ${this.get('session').get('session.content.authenticated.data.access_token')}`
      }
    }).then((response) => {
      return response.json();
    });
  },

  setupController(controller) {
    this._super(...arguments);

    controller.set('system', this.get('system'));
  }
});
