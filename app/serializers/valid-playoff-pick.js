import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeSingleResponse(store, primaryModelClass, payload) {
    return {
      data: {
        id: 1,
        type: 'valid-playoff-pick',
        attributes: payload
      },
      included: []
    };
  }
});
