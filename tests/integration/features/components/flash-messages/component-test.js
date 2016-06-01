import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('flash-messages', 'Integration | Component | flash messages', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{flash-messages}}`);

  assert.equal(this.$().text().trim(), '');
});
