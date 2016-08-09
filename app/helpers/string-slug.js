import Ember from 'ember';

/**
 * This will convert a string into a url friendly
 * string (Slug).  It replaces all encoded uri components
 * and quotes to dashes
 *
 * @module cpg/helpers/string-slug
 * @param {String|Array} params The string or array to use for slugging
 * @returns {String}
 */
export function stringSlug(params) {
  // get the inputs
  let string = params;
  if (Array.isArray(string)) {
    string = params[0];
  }

  // regex to match all encoded uri components
  let regex = new RegExp(/%[0-9]+/g);

  // replace all encoded characters to - and convert to lowercase
  return encodeURI(string).replace(/\'/g, '').replace(regex, '-').replace(/[-]+/g, '-').toLowerCase();
}

export default Ember.Helper.helper(stringSlug);
