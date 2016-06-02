import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { buildValidations } from 'ember-cp-validations';
import { teamname, is_paid } from 'pickems/utils/team-validations';

const Validations = buildValidations({
  name: teamname,
  is_paid: is_paid
});

export default Model.extend({
  name: attr('string'),
  is_paid: attr('boolean'),
  owner: belongsTo('user')
});
