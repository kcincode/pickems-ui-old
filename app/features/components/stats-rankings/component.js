import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  system: service(),
  limit: 25,
  playoff: false
});
