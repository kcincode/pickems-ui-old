import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  valid: attr('boolean'),
  reason: attr('string'),
  playmakers: attr('string'),
  qb1: attr('string'),
  qb2: attr('string'),
  rb1: attr('string'),
  rb2: attr('string'),
  rb3: attr('string'),
  wrte1: attr('string'),
  wrte2: attr('string'),
  wrte3: attr('string'),
  wrte4: attr('string'),
  wrte5: attr('string'),
  k1: attr('string'),
  k2: attr('string')
});
