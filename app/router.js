import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('register');
  this.route('rules');
  this.route('contact');
  this.route('storylines');
  this.route('teams');
});

export default Router;
