import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import fetch from 'ember-network/fetch';
import ENV from 'pickems/config/environment';

const { inject: { service }, RSVP } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  system: service(),

  model(params) {
    return RSVP.hash({
      team: this.store.query('team', { slug: params.team }).then((teams) => {
        return teams.get('firstObject');
      }),
      picks: fetch(`${ENV.api.host}/${ENV.api.namespace}/picks?week=${this.get('system.selectedWeek')}&team=${params.team}`, {
        type: 'GET',
        headers: {
          'Authorization': `JWT ${this.get('session').get('session.content.authenticated.data.access_token')}`
        }
      }).then((response) => response.json())
    });
  },

  setupController(controller, model) {
    this._super(...arguments);

    controller.set('system', this.get('system'));
    this.controllerFor('teams').set('selectedTeam', model.team);
  },

  resetController() {
    this.controllerFor('teams').set('selectedTeam', null);
  },

  actions: {
    changeWeek(week) {
      this.set('system.selectedWeek', week);
      this.refresh();
    },
    filterPicks(term) {
      if (term.length > 1) {
        return fetch(`${ENV.api.host}/${ENV.api.namespace}/picks-filter?term=${term}`, {
          type: 'GET',
          headers: {
            'Authorization': `JWT ${this.get('session').get('session.content.authenticated.data.access_token')}`
          }
        }).then((response) => {
          return response.json();
        });
      }
    },

    updatePick(type, value) {
      this.set(`currentModel.picks.${type}.selected`, value);
      let week = this.get('currentModel.picks.week');
      let number = type === 'pick1' ? 1 : 2;
      let teamId = this.get('currentModel.team.id');
      let playmaker = this.get('currentModel.picks.${type}.playmaker');

      let _this = this;
      return Ember.$.ajax({
        url: `${ENV.api.host}/${ENV.api.namespace}/team-picks`,
        method: 'POST',
        data: {
          team: teamId,
          week: week,
          number: number,
          value: JSON.stringify(value),
          playmaker: playmaker
        },
        headers: {
          'Authorization': `JWT ${this.get('session').get('session.content.authenticated.data.access_token')}`
        },
        success() {
          console.log('refresh')
          _this.refresh();
        },
        error() {
          _this.get('flashMessages').danger(`Could not update ${type}`);
        }
      });
    }
  }
});
