import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('page-footer', 'Integration | Component | page footer', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{page-footer}}`);

  assert.equal(this.$('.footer').length, 1, 'it has a footer class');
  assert.equal(this.$('.footer .col-xs-4').length, 1, 'it has a copyright col');
  assert.equal(this.$('.footer .col-xs-8').length, 1, 'it has a status col');
});
