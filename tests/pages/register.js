import PageObject, {
  clickable,
  fillable,
  // text,
  visitable
} from 'pickems/tests/page-object';

export default PageObject.create({
  visit: visitable('/register'),

  email: fillable('#email'),
  first_name: fillable('#first_name'),
  last_name: fillable('#last_name'),
  password: fillable('#password'),
  passwordConfirmation: fillable('#passwordConfirmation'),

  submit: clickable('#register-btn')
});
