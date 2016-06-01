import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('page-header', 'Integration | Component | page header', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{page-header}}`);

  assert.equal(this.$('.main-menu').length, 1, 'it has a main menu class');
  assert.equal(this.$('.main-menu .navbar').length, 1, 'it has a navbar');
  assert.equal(this.$('.main-menu .nav.navbar-nav').length, 2, 'it has a two navbar sections');
});
