import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('display-stat-playmaker', 'Integration | Component | display stat playmaker', {
  integration: true
});

test('it renders truthful', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('playmaker', true);
  this.set('text', 'Player-ABBR-POS');

  this.render(hbs`{{display-stat-playmaker playmaker=playmaker text=text}}`);

  assert.equal(this.$('.text-primary').html(), 'Player-ABBR-POS', 'it has the correct text and class');
});

test('it renders falsy', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  this.set('playmaker', false);
  this.set('text', 'Player-ABBR-POS');

  this.render(hbs`{{display-stat-playmaker playmaker=playmaker text=text}}`);

  assert.equal(this.$('.text-primary').html(), undefined, 'it does not have the highlight color');
  assert.equal(this.$().text().trim(), 'Player-ABBR-POS', 'it has the correct normal text');
});

