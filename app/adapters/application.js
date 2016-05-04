import JSONAPIAdapter from 'ember-data/adapters/json-api';
import ENV from 'pickems/config/environment';

export default JSONAPIAdapter.extend({
  host: ENV.api.host,
  namespace: ENV.api.namespace,
  urlForCreateRecord(modelName/*, snapshot*/) {
    switch(modelName) {
      case 'user':
      case 'users':
        return this._super.apply(this, arguments).replace('users', 'register');
      default:
        return this._super(...arguments);
    }
  }
});
