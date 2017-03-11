import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service } } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  model() {
    return this.store.findAll('team');
  },

  actions: {
    changeTeam(team) {
      this.controller.set('selectedTeam', team);

      if (team) {
        this.transitionTo('playoffs.show', team.get('slug'));
      } else {
        this.transitionTo('playoffs');
      }
    }
  }
});