import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { isEmpty } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
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
  }
});
