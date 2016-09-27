import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'pickems/config/environment';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
  host: ENV.api.host,
  namespace: ENV.api.namespace,
  authorizer: 'authorizer:oauth2',

  pathForType(type) {
    if (type == 'best-pick') {
      return 'stats/best';
    }

    return type;
  },

  handleResponse(status) {
    if (status === 401 || status === 403) {
      if (this.get('session.isAuthenticated')) {
        this.get('session').invalidate();
      }

      return true;
    } else {
      return this._super(...arguments);
    }
  }
});
