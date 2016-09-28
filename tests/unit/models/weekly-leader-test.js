import { moduleForModel, test } from 'ember-qunit';

moduleForModel('weekly-leader', 'Unit | Model | weekly leader', {
  // Specify the other units that are required for this test.
  needs: ['model:team']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
