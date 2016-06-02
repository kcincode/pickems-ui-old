import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  flashMessages: service(),
  session: service(),
  system: service(),
  isEditing: false,
  actions: {
    removeTeam(team) {
      this.sendAction('removeTeam', team);
    },
    toggleEdit() {
      this.toggleProperty('isEditing');
    },
    cancelEdit() {
      this.get('team').rollbackAttributes();
      this.set('isEditing', false);
    },
    updateTeam() {
      this.sendAction('updateTeam', this.get('team'));
      this.set('isEditing', false);
    }
  }
});
