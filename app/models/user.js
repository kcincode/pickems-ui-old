import DS from  'ember-data';
import { buildValidations } from 'ember-cp-validations';
import { fullname, email, password, passwordConfirmation } from 'pickems/utils/user-validations';

const { attr, hasMany } = DS;

const Validations = buildValidations({
  name: fullname,
  email,
  password,
  passwordConfirmation
});

export default DS.Model.extend(Validations, {
  email: attr('string'),
  name: attr('string'),
  password: attr('string'),
  passwordConfirmation: attr('string'),
  is_staff: attr('boolean'),

  teams: hasMany('team', { async: true })
});
