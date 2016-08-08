import { stringSlug } from 'pickems/helpers/string-slug';
import { module, test } from 'qunit';

module('Unit | Helper | string slug');

// Replace this with your real tests.
test('it works', function(assert) {
  assert.equal(stringSlug('this is a title'), 'this-is-a-title');
  assert.equal(stringSlug('ThiS iS A tITle'), 'this-is-a-title');
  assert.equal(stringSlug('ThiS\' iS A  tITle'), 'this-is-a-title');
  assert.equal(stringSlug('ThiS" iS A  tITle'), 'this-is-a-title');
});
