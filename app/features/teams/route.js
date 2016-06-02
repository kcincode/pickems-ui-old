import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import {stringSlugify} from 'pickems/helpers/string-slugify';

const { RSVP, inject: { service }, isEmpty } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service(),
  model() {
    return RSVP.hash({
      teams: this.get('session.currentUser.teams'),
      newTeam: {}
    });
  },
  actions: {
    clearFilter() {
      this.controller.set('filter', null);
    },
    toggleCreateTeam() {
      this.controller.set('model.newTeam', {});
      this.controller.toggleProperty('showCreateTeam');
    },
    createTeam() {
      let newTeam = this.controller.get('model.newTeam');
      this.get('flashMessages').clearMessages();

      newTeam.slug = stringSlugify([newTeam.name]);

      let team = this.store.createRecord('team', newTeam);
      team.save().then(() => {
        this.get('flashMessages').clearMessages();
        this.get('flashMessages').success(`Team '${team.get('name')}' created`);
        this.send('toggleCreateTeam');

        this.refresh();
      }, (reason) => {
        if (reason.errors.slug[0]) {
          this.get('flashMessages').danger(`There is already a team named '${team.get('name')}'`);
        } else {
          this.get('flashMessages').danger('Could not create team');
        }
        team.destroyRecord();
      });
    },
    removeTeam(team) {
      if (confirm('Are you sure you want to delete this team?')) {
        let teamName = team.get('name');
        team.destroyRecord().then(() => {
          this.get('flashMessages').clearMessages();
          this.get('flashMessages').success(`Team '${teamName}' deleted`);
        });
      }
    },
    updateTeam(team) {
      this.get('flashMessages').clearMessages();

      // re-generate the slug
      team.set('slug', stringSlugify([team.get('name')]));

      team.save().then(() => {
        this.get('flashMessages').success('Team information saved');
      });
    },
    markPaid(team) {
      team.paid = true;
      team.save().then(() => {
        this.get('flashMessages').clearMessages();
        this.get('flashMessages').success(`Team '${team.get('name')}' marked as paid`);
      });
    },
  }
});
