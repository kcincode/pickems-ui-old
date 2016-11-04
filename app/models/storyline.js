import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  week: attr('number'),
  story: attr('string'),

  user: belongsTo('user', { async: true })
});
