import Ember from 'ember';
import ENV from 'pickems/config/environment';
import fetch from 'ember-network/fetch';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  session: service(),

  model() {
    let url = `${ENV.api.host}/${ENV.api.namespace}/teams/home`;

    return fetch(url, {
      type: 'GET'
    }).then((response) => response.json());
  },

  setupController(controller) {
    controller.set('session', this.get('session'));
  }
});
