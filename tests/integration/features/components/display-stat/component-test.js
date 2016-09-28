import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('display-stat', 'Integration | Component | display stat', {
  integration: true
});

test('it renders', function(assert) {
  // TODO implement tests
  assert.expect(0);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{display-stat}}`);

  // assert.equal(this.$().text().trim(), '');
});
