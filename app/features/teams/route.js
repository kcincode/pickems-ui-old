import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service }, RSVP, computed } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  currentUserId: computed.alias('session.session.content.authenticated.data.user_id'),

  model() {
    return RSVP.hash({
      teams: this.store.query('team', { user: this.get('currentUserId') }),
      users: this.store.findAll('user')
    });
  },

  actions: {
    changeTeam(team) {
      this.controller.set('selectedTeam', team);

      if (team) {
        this.transitionTo('teams.team', team.get('slug'));
      } else {
        this.transitionTo('teams.index');
      }
    }
  }
});
