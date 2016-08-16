import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('stats-menu', 'Integration | Component | stats menu', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{stats-menu}}`);

  assert.equal(this.$('.card-title').length, 1, 'it has a title');
  assert.equal(this.$('.list-group a').length, 3, 'it has 3 links');
});
