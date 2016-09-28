import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import fetch from 'ember-network/fetch';
import ENV from 'pickems/config/environment';

const { inject: { service }, RSVP, isEmpty } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  system: service(),

  model(params) {
    let selectedWeek = this.get('system.selectedWeek');
    if (isEmpty(selectedWeek)) {
      selectedWeek = this.get('system.week');
    }

    // generate the picks url
    let picksUrl = `${ENV.api.host}/${ENV.api.namespace}/picks?week=${selectedWeek}&team=${params.team}`;

    return RSVP.hash({
      team: this.store.query('team', { slug: params.team }).then((teams) => {
        return teams.get('firstObject');
      }),
      picks: fetch(picksUrl, {
        type: 'GET',
        headers: {
          'Authorization': `${ENV.api.headerKey} ${this.get('session').get('session.content.authenticated.access_token')}`
        }
      }).then((response) => response.json())
    });
  },

  afterModel(model) {
    // if the user is not the current user access denied
    if (parseInt(model.team.get('user.id')) !== parseInt(this.get('session.currentUserId'))) {
      return this.transitionTo('denied');
    }
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
      // if 2 or more characters are entered
      if (term.length > 1) {
        return fetch(`${ENV.api.host}/${ENV.api.namespace}/picks-filter?term=${term}`, {
          type: 'GET',
          headers: {
            'Authorization': `${ENV.api.headerKey} ${this.get('session').get('session.content.authenticated.access_token')}`
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
          week,
          number,
          value: JSON.stringify(value),
          playmaker
        },
        headers: {
          'Authorization': `${ENV.api.headerKey} ${this.get('session').get('session.content.authenticated.access_token')}`
        },
        success() {
          _this.refresh();
        },
        error() {
          _this.get('flashMessages').danger(`Could not update ${type}`);
        }
      });
    }
  }
});
