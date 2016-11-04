import Ember from 'ember';
import { stringSlug } from 'pickems/helpers/string-slug';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service } } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  setupController(controller) {
    this._super(...arguments);

    controller.set('newTeam', {});
  },

  actions: {
    createTeam() {
      this.get('flashMessages').clearMessages();

      let newTeam = this.controller.get('newTeam');
      newTeam.user = this.get('session.currentUser');
      newTeam.slug = stringSlug(newTeam.name);
      newTeam.points = 0;
      newTeam.playoffs = 0;
      newTeam.wl = 0.000;

      let team = this.store.createRecord('team', newTeam);
      team.save().then(() => {
        this.get('flashMessages').success(`Team ${team.get('name')} created`);
        this.controller.set('newTeam', {});
        this.transitionTo('teams.team', team.get('slug'));
      }, () => {
        this.get('flashMessages').danger('Could not create team');
      });
    }
  }
});
