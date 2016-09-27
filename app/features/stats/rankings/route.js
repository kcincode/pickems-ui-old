import Ember from 'ember';
import ENV from 'pickems/config/environment';
// import fetch from 'ember-network/fetch';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service } } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  system: service(),

  beforeMode() {

  },

  model() {
    // return fetch(`${ENV.api.host}/${ENV.api.namespace}/stats/rankings`, {
    //   type: 'GET',
    //   headers: {
    //     'Authorization': `${ENV.api.headerKey} ${this.get('session').get('session.content.authenticated.access_token')}`
    //   }
    // }).then((response) => {
    //   this.store.push(response.json());
    //   return response.json();
    // });
  },

  setupController(controller) {
    this._super(...arguments);

    controller.set('system', this.get('system'));
  }
});
