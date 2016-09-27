import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  week: attr('number'),
  pick1: attr('string'),
  pick1_playmaker: attr('boolean'),
  pick1_points: attr('number'),
  pick2: attr('string'),
  pick2_playmaker: attr('boolean'),
  pick2_points: attr('number'),
  total: attr('number')
});
