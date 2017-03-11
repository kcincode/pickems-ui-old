import Ember from 'ember';

const { computed, inject: { service }, isEmpty } = Ember;

export default Ember.Component.extend({
  system: service(),

  selected: computed('pick', {
    get() {
      let pick = this.get('pick');
      if (!isEmpty(pick)) {
        return { text: pick.text };
      }

      return null;
    }
  }),

  shouldShowPlaymakerCheck: computed('playmakers', 'pick', {
    get() {
      let playmakers = this.get('playmakers');
      if (isEmpty(playmakers)) {
        return true;
      }

      playmakers = playmakers.split(',');
      let pick = this.get('pick');
      if (pick && playmakers.indexOf(pick.id) !== -1) {
        return true;
      }

      if (playmakers.length < 2) {
        return true;
      }

      return false;
    }
  }),

  isPlaymaker: computed('pick', 'playmakers', {
    get() {
      let playmakers = this.get('playmakers');

      if (isEmpty(playmakers)) {
        return false;
      }

      playmakers = playmakers.split(',');
      return playmakers.indexOf(this.get('pick.id')) !== -1;
    }
  }),

  actions: {
    updatePick(val) {
      this.sendAction('update', val);
    },

    updatePlaymaker(val) {
      let playmakers = this.get('playmakers');

      if (isEmpty(playmakers)) {
        playmakers = [val];
      } else {
        playmakers = playmakers.split(',');

        if (playmakers.length < 2) {
          if (playmakers.indexOf(val) === -1) {
            // add the playmaker
            playmakers.addObject(val);
          } else {
            // remove the playmaker
            playmakers.removeObject(val);
          }
        } else {
          // remove the playmaker
          playmakers.removeObject(val);
        }
      }

      // make the request
      this.sendAction('playmaker', playmakers.join());
    }
  }
});
