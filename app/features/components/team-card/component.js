import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  classNames: ['card'],
  system: service(),
  changeWeek: 'changeWeek',

  actions: {
    changeWeek(week) {
      this.sendAction('changeWeek', week);
    }
  }
});
