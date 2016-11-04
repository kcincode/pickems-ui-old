import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { isEmpty, inject: { service } } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  model() {
    return this.store.query('storyline', { include: 'user' });
  },

  organizeStorylines(storylines) {
    let data = {};

    storylines.forEach((storyline) => {
      if (isEmpty(data[storyline.get('week')])) {
        data[storyline.get('week')] = [];
      }

      data[storyline.get('week')].push(storyline);
    });

    return data;
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('storylines', this.organizeStorylines(model));
    controller.set('isAdmin', this.get('session.currentRole') === 'admin');
  },

  isAdmin() {
    return this.controller.get('isAdmin');
  },

  actions: {
    deleteStoryline(storyline) {
      if (this.isAdmin()) {
        this.get('flashMessages').clearMessages();
        storyline.destroyRecord().then(() => {
          this.get('flashMessages').success('Deleted storyline');
          this.refresh();
        }, () => {
          this.get('flashMessages').danger('Could not delete storyline');
        });
      }
    },
    cancelEditing(storyline) {
      if (this.isAdmin()) {
        storyline.rollbackAttributes();
        storyline.set('isEditing', false);
      }
    },
    saveStoryline(storyline) {
      if (this.isAdmin()) {
        this.get('flashMessages').clearMessages();
        storyline.save().then(() => {
          this.get('flashMessages').success('Storyline saved');
          storyline.set('isEditing', false);
        }, () => {
          this.get('flashMessages').danger('Could not save storyline');
        });
      }
    }
  }
});
