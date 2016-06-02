import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import { email, password } from '../../utils/user-validations';
import { buildValidations } from 'ember-cp-validations';

const { inject: { service } } = Ember;

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
  actions: {
    authenticate: function() {
      let credentials = {
        email: this.get('currentModel.email'),
        password: this.get('currentModel.password')
      };

      this.get('session').authenticate('authenticator:pickems', credentials.email, credentials.password).catch(() => {
        this.get('flashMessages').danger('Invalid email and/or password');
      });

      // this.get('session').authenticate('authenticator:pickems', credentials).then(() => {
      //   this.transitionToRoute('index');
      // }, () => {
      //   this.get('flashMessages').danger('Invalid email and/or password');
      // });
    }
  }
});
