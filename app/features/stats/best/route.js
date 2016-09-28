import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service } } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  system: service(),

  model() {
    return this.store.findAll('best-pick');
  },

  setupController(controller) {
    this._super(...arguments);

    controller.set('system', this.get('system'));
  }
});
