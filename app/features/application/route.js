import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { inject: { service } } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: service(),
  system: service(),

  beforeModel() {
    // set the current week
    this.set('system.week', this.get('session.session.content.authenticated.data.current_week'));
  }
});
