import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('register');
  this.route('rules');
  this.route('contact');
  this.route('storylines');
  this.route('teams');
  this.route('picks', { path: '/picks/:slug' });
});

export default Router;
