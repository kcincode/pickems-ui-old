import { moduleForModel, test } from 'ember-qunit';

moduleForModel('valid-playoff-pick', 'Unit | Serializer | valid playoff pick', {
  // Specify the other units that are required for this test.
  needs: ['serializer:valid-playoff-pick']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
