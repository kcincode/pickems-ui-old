import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service }, RSVP } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  model() {
    this.store.unloadAll('team');

    return RSVP.hash({
      teams: this.store.findAll('team')
    });
  },

  setupController(controller) {
    this._super(...arguments);

    controller.set('showTeamSelect', true);
  },

  actions: {
    willTransition() {
      this.refresh();
      return true;
    },

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
