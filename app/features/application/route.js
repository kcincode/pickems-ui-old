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
    if (this.get('session.isAuthenticated')) {
      this.set('session.currentRole', this.get('session.session.content.authenticated.role'));
      this.set('session.currentUser', this.store.find('user', this.get('session.session.content.authenticated.user_id'))).catch(() => {
        this.get('session').invalidate();
      });
    }
  },

  beforeModel() {
    // set the current week
    this.set('system.week', parseInt(this.get('session.session.content.authenticated.current_week')));
    this.set('system.hasPlayoffsStarted', this.get('session.session.content.authenticated.hasPlayoffsStarted'));
    this.setupUserId();
  },

  actions: {
    willTransition() {
      this.set('system.showAdminMenu', false);
    }
  }
});
