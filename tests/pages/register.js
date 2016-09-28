import PageObject, {
  clickable,
  fillable,
  // text,
  visitable
} from 'pickems/tests/page-object';

export default PageObject.create({
  visit: visitable('/register'),

  email: fillable('#email'),
  name: fillable('#name'),
  password: fillable('#password'),
  passwordConfirmation: fillable('#passwordConfirmation'),

  submit: clickable('#register-btn')
});
