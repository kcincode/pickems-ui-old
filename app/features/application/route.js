import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { inject: { service } } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: service(),
  system: service(),

  sessionAuthenticated() {
    this._super(...arguments);
    this.setupUserId();
  },

  setupUserId() {
    this.set('session.currentUserId', this.get('session.session.content.authenticated.user_id'));
  },

  beforeModel() {
    // set the current week
    this.set('system.week', parseInt(this.get('session.session.content.authenticated.current_week')));
    this.setupUserId();
  }
});
