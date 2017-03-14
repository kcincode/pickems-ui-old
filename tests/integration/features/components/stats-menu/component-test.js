import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('stats-menu', 'Integration | Component | stats menu', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{stats-menu}}`);

  assert.equal(2, this.$('.card-title').length, 'it has two titles');
  assert.equal(4, this.$('.list-group a').length, 'it has 4 links');
});
