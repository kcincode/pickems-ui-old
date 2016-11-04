import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  session: service(),
  system: service(),
  classNames: ['main-menu'],
  showAdminMenu: false,

  actions: {
    logout() {
      this.get('session').invalidate();
    }
  }
});
