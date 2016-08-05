import { test } from 'qunit';
import moduleForAcceptance from 'pickems/tests/helpers/module-for-acceptance';
import page from 'pickems/tests/pages/register';

moduleForAcceptance('Acceptance | register user');

test('entering correct information successfully creates a user', function(assert) {
  page.visit()
    .email('testuser@example.com')
    .first_name('Test')
    .last_name('User')
    .password('testing1')
    .passwordConfirmation('testing1')
    .submit();

  andThen(function() {
    assert.equal(currentURL(), '/login', 'it navigates back to login when registration is complete');
    assert.equal(find('.alert.alert-success').length, 1, 'it has the success message');
    assert.equal(find('.alert.alert-success').text().trim(), 'Registered! Please login now', 'it has the correct text in the message');
  });
});
