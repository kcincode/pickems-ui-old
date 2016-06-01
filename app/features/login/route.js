import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import { email, password } from '../../utils/user-validations';
import { buildValidations } from 'ember-cp-validations';

const { computed, inject: { service } } = Ember;

const Validations = buildValidations({
  'model.email': email,
  'model.password': password
});

export default Ember.Route.extend(Validations, UnauthenticatedRouteMixin, {
  flashMessages: service(),
  session: service(),

  model() {
    return this;
  },

  setupController(controller) {
    this._super(...arguments);

    controller.set('submitBtnText', 'SIGN IN');
    controller.set('submitDisabled', computed('submitBtnText', {
      get() {
        return (this.get('submitBtnText') === 'SIGN IN') ? false : true;
      }
    }));
  },
  actions: {
    authenticate: function() {
      let credentials = {
        grant_type: 'password',
        identification: this.get('currentModel.email'),
        password: this.get('currentModel.password')
      };

      this.get('session').authenticate('authenticator:jwt', credentials).then(() => {
        this.transitionToRoute('index');
      }, () => {
        this.get('flashMessages').danger('Invalid email and/or password');
      });
    }
  }
});
