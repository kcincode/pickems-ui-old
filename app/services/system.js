import Ember from 'ember';
import ENV from 'pickems/config/environment';

export default Ember.Service.extend({
  env: ENV,
  week: 1,
  selectedWeek: 1,
});
