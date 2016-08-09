import DS from 'ember-data';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  name: attr('string'),
  slug: attr('string'),
  paid: attr('boolean'),

  user: belongsTo('user', { async: true })
});
