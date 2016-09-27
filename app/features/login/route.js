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
  system: service(),

  model() {
    return this;
  },

  actions: {
    authenticate() {
      this.get('flashMessages').clearMessages();

      let credentials = {
        email: this.get('currentModel.email'),
        password: this.get('currentModel.password')
      };

      this.get('session').authenticate('authenticator:pickems', credentials.email, credentials.password).then(() => {
        this.set('system.week', this.get('session.session.content.authenticated.data.current_week'));
      }).catch(() => {
        this.get('flashMessages').danger('Invalid email and/or password');
      });
    }
  }
});
