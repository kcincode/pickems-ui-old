import Ember from 'ember';

export function htmlNewlines(params) {
  let [text] = params;

  // replace new lines with 2 breaks
  return Ember.String.htmlSafe(text.replace(/(?:\r\n|\r|\n)/g, '<br/>'));
}

export default Ember.Helper.helper(htmlNewlines);
