import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeSingleResponse(store, primaryModelClass, payload, id) {
    return {
      data: {
        id,
        type: 'playoff-pick',
        attributes: payload
      },
      included: []
    };
  }
});
