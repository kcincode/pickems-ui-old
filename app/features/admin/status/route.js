import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { inject: { service } } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  beforeModel() {
    if (this.get('session.currentRole') !== 'admin') {
      this.get('flashMessages').danger('You do not have acces to admin features');
      return this.transitionTo('index');
    }
  },

  model(params) {
    this.set('status', params.status);
    this.set('paid', (this.get('status') === 'unpaid') ? false : null);

    if (params.status === 'unpaid') {
      return this.store.query('admin-team', { paid: false });
    }

    return this.store.findAll('admin-team');
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('status', this.get('status'));

    controller.set('displayedTeams', this.filterPaidOnTeams(model, this.get('paid')));
  },

  filterPaidOnTeams(model, paid) {
    return model.filter((team) => {
      return paid === null || team.get('paid') === paid;
    });
  },

  actions: {
    togglePaid(adminTeam) {
      this.get('flashMessages').clearMessages();

      adminTeam.toggleProperty('paid');
      adminTeam.save().then(() => {
        this.refresh();
        this.get('flashMessages').success('Team updated');
      }, () => {
        this.get('flashMessages').danger('Team could NOT be updated');
      });
    }
  }
});
