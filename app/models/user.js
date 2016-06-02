import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { buildValidations } from 'ember-cp-validations';
import { fullname, email, password, passwordConfirmation } from 'pickems/utils/user-validations';

const Validations = buildValidations({
  name: fullname,
  email: email,
  password: password,
  passwordConfirmation: passwordConfirmation,
});

export default Model.extend(Validations, {
  name: attr('string'),
  email: attr('string'),
  password: attr('string'),
  passwordConfirmation: attr('string'),
  admin: attr('boolean'),
});
