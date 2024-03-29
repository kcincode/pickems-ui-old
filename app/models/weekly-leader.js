import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  week: attr('number'),
  points: attr('number'),

  team: belongsTo('team')
});
