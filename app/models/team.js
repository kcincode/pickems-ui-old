import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  name: attr('string'),
  slug: attr('string'),
  paid: attr('boolean'),
  points: attr('number'),
  playoffs: attr('number'),
  wl: attr('string'),

  user: belongsTo('user', { async: true })
});
