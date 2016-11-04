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
    if (parseInt(model.team.get('user.id')) !== parseInt(this.get('session.currentUser.id'))) {
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

    updatePlaymaker(type) {
      this.toggleProperty(`currentModel.picks.${type}.playmaker`);
      this.send('updatePicks');
    },

    updatePicks(type = null, value = null) {
      if (type) {
        this.set(`currentModel.picks.${type}.selected`, value);
      }

      // get the picks data for pick #1
      let pick1 = this.get('currentModel.picks.pick1.selected');
      if (pick1) {
        pick1.playmaker = this.get('currentModel.picks.pick1.playmaker');
      }

      // get the picks data for pick #2
      let pick2 = this.get('currentModel.picks.pick2.selected');
      if (pick2) {
        pick2.playmaker = this.get('currentModel.picks.pick2.playmaker');
      }

      // setup the post data
      let data = {
        team: this.get('currentModel.team.slug'),
        week: this.get('currentModel.picks.week'),
        pick1: pick1 ? pick1 : { id: null, type: null, text: null, playmaker: null },
        pick2: pick2 ? pick2 : { id: null, type: null, text: null, playmaker: null }
      };

      let _this = this;
      return Ember.$.ajax({
        url: `${ENV.api.host}/${ENV.api.namespace}/picks`,
        method: 'POST',
        data,
        headers: {
          'Authorization': `${ENV.api.headerKey} ${this.get('session').get('session.content.authenticated.access_token')}`
        },
        success() {
          // _this.get('flashMessages').success('Updated picks');
          _this.refresh();
        },
        error() {
          _this.get('flashMessages').danger(`Could not update ${type}`);
        }
      });
    }
  }
});
