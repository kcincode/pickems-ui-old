import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import ENV from 'pickems/config/environment';

const { RSVP, inject: { service } } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  system: service(),

  model(params) {
    // generate the picks urls
    let teamPicksUrl = `${ENV.api.host}/${ENV.api.namespace}/picks/${params.team}`;
    let picksUrl = `${ENV.api.host}/${ENV.api.namespace}/picks?week=1&team=${params.team}`;

    return RSVP.hash({
      team: this.store.query('team', { slug: params.team }).then((teams) => {
        return teams.get('firstObject');
      }),
      teamPicks: fetch(teamPicksUrl, {
        type: 'GET',
        headers: {
          'Authorization': `${ENV.api.headerKey} ${this.get('session').get('session.content.authenticated.access_token')}`
        }
      }).then((response) => response.json()),
      picks: fetch(picksUrl, {
        type: 'GET',
        headers: {
          'Authorization': `${ENV.api.headerKey} ${this.get('session').get('session.content.authenticated.access_token')}`
        }
      }).then((response) => response.json())
    });
  },

  setupController(controller) {
    this._super(...arguments);

    controller.set('system', this.get('system'));
    this.controllerFor('teams').set('showTeamSelect', false);
  },

  resetController() {
    this.controllerFor('teams').set('showTeamSelect', true);
  }
});
