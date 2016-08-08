import DS from  'ember-data';
import { buildValidations } from 'ember-cp-validations';
import { fullname, email, password, passwordConfirmation } from 'pickems/utils/user-validations';

const { attr, hasMany } = DS;

const Validations = buildValidations({
  first_name: fullname,
  last_name: fullname,
  email: email,
  password: password,
  passwordConfirmation: passwordConfirmation,
});

export default DS.Model.extend(Validations, {
  username: attr('string'),
  email: attr('string'),
  first_name: attr('string'),
  last_name: attr('string'),
  password: attr('string'),
  passwordConfirmation: attr('string'),
  is_staff: attr('boolean'),

  teams: hasMany('team', { async: true })
});
