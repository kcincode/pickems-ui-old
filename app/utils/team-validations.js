import { validator } from 'ember-cp-validations';

export const teamname = [
  validator('presence', true)
];

export const is_paid = [
  validator('presence', true),
  validator('format', { type: 'boolean' })
];

export default {
  teamname, is_paid
};
