import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  flashMessages: service(),
  session: service(),
  model() {
    return this.store.createRecord('user');
  },
  deactivate() {
    let model = this.controllerFor('register').get('model');
    console.log('model', model);
    if ( (model.get('isNew') || model.get('isDirty')) && (!model.get('isSaving')) ) {
      model.rollbackAttributes();
    }
  },
  actions: {
    register() {
      this.get('currentModel').save().then(() => {
        // Successful Save
        this.transitionTo('login');
        this.get('flashMessages').success('Registered! Please login now');
      }).catch((resp) => {
        // Error(s) while saving
        const { errors } = resp;
        this.get('flashMessages').danger(errors.mapBy('detail').join(', '));
      });
    }
  }
});
