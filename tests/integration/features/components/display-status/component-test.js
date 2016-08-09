import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('display-status', 'Integration | Component | display status', {
  integration: true
});

test('it renders a truthful expression', function(assert) {
  this.set('test', true);
  this.set('text', 'this is a test');

  this.render(hbs`{{display-status test=test text=text}}`);

  assert.equal(this.$('.text-success').html(), 'this is a test');
});

test('it renders a falsy expression', function(assert) {
  this.set('test', false);
  this.set('text', 'this is a test');

  this.render(hbs`{{display-status test=test text=text}}`);

  assert.equal(this.$('.text-danger').html(), '<del>this is a test</del>');
});
