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
        this.set('session.currentRole', this.get('session.session.content.authenticated.role'));
        this.set('session.currentUser', this.store.find('user', this.get('session.session.content.authenticated.user_id'))).catch(() => {
          this.get('session').invalidate();
        });
        this.set('system.week', parseInt(this.get('session.session.content.authenticated.current_week')));
      }).catch(() => {
        this.get('flashMessages').danger('Invalid email and/or password');
      });
    }
  }
});
