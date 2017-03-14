import Ember from 'ember';
import fetch from 'ember-network/fetch';
import ENV from 'pickems/config/environment';

const { inject: { service }, RSVP, isEmpty } = Ember;

export default Ember.Route.extend({
  session: service(),
  system: service(),

  model(params) {
    return RSVP.hash({
      team: this.store.query('team', { slug: params.team }).then((teams) => {
        return teams.get('firstObject');
      }),
      picks: this.store.find('playoff-pick', params.team),
      validPicks: this.store.queryRecord('valid-playoff-pick', {})
    });
  },

  setupController(controller, model) {
    this._super(...arguments);

    this.controllerFor('playoffs').set('selectedTeam', model.team);
    controller.set('system', this.get('system'));
    controller.set('selected', {});
  },

  resetController(controller, isExiting) {
    if (isExiting) {
      this.controllerFor('playoffs').set('selectedTeam', null);
      controller.set('selected', {});
    }
  },

  actions: {
    filterPicks(position, term) {
      // if 3 or more characters are entered
      if (term.length > 2) {
        return fetch(`${ENV.api.host}/${ENV.api.namespace}/playoff-picks-filter?term=${term}&position=${position}`, {
          type: 'GET',
          headers: {
            'Authorization': `${ENV.api.headerKey} ${this.get('session').get('session.content.authenticated.access_token')}`
          }
        }).then((response) => {
          return response.json();
        });
      }
    },
    updatePicks(type = null, value = null) {
      this.get('flashMessages').clearMessages();

      let team = this.controller.get('model.team');
      let data = this.controller.get('model.picks');

      // clear playmakers if they exist
      if (data.get(type)) {
        let playmakers = data.get('playmakers');
        if (!isEmpty(playmakers)) {
          playmakers = playmakers.split(',');
          let oldId = data.get(type).id;
          playmakers.removeObject(oldId);
          data.set('playmakers', playmakers.join(','));
        }
      }

      // set the new data
      data.set(type, value);

      let json = JSON.parse(JSON.stringify(data));
      Object.keys(json).forEach((property) => {
        if (json[property] == '[object Object]') {
          json[property] = JSON.parse(JSON.stringify(data.get(property))).id;
        }
      });

      Ember.$.ajax({
        url: `${ENV.api.host}/${ENV.api.namespace}/playoff-picks/${team.get('slug')}`,
        type: 'PATCH',
        headers: {
          'Authorization': `${ENV.api.headerKey} ${this.get('session').get('session.content.authenticated.access_token')}`
        },
        data: json
      }).then(() => {
        this.get('flashMessages').success('Playoff picks saved.');
        this.refresh();
      }, () => {
        this.get('flashMessages').danger('Could not save playoff picks.');
      });
    }
  }
});
