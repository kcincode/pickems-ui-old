import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
  qb: attr(),
  rb: attr(),
  wrte: attr(),
  k: attr()
});
