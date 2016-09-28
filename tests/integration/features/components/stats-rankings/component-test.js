import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('stats-rankings', 'Integration | Component | stats rankings', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('category', 'Gold');
  this.set('data', [
    { rank: 1, team: 'Test Team #1', team_id: 1, team_slug: 'test-team-1', points: 150, wl: '0.940', playoff: 30 },
    { rank: 2, team: 'Test Team #2', team_id: 2, team_slug: 'test-team-2', points: 140, wl: '0.940', playoff: 24 },
    { rank: 3, team: 'Test Team #3', team_id: 3, team_slug: 'test-team-3', points: 130, wl: '0.940', playoff: 18 },
    { rank: 4, team: 'Test Team #4', team_id: 4, team_slug: 'test-team-4', points: 120, wl: '0.940', playoff: 12 },
    { rank: 5, team: 'Test Team #5', team_id: 5, team_slug: 'test-team-5', points: 110, wl: '0.940', playoff: 6 },
    { rank: 6, team: 'Test Team #6', team_id: 6, team_slug: 'test-team-6', points: 100, wl: '0.940', playoff: 0 }
  ]);
  this.set('limit', 25);

  this.render(hbs`{{stats-rankings category=category data=data limit=limit}}`);

  assert.equal(this.$('.card-title').text().trim(), 'Gold Rankings up to week #1');
  assert.equal(this.$('table tbody tr').length, 6, 'It has 6 rows in the table');
});
