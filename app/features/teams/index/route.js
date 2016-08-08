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

      this.store.find('user', this.get('session.currentUserId')).then((user) => {
        let newTeam = this.controller.get('newTeam');
        newTeam.user = user;
        newTeam.slug = stringSlug(newTeam.name);

        let team = this.store.createRecord('team', newTeam);
        team.save().then(() => {
          this.get('flashMessages').success(`Team ${team.get('name')} created`);
          this.transitionTo('teams.team', team.slug);
        }, (error) => {
          console.error(error);
          this.get('flashMessages').danger('Could not create team');
        });
      });
    }
  }
});
