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
  this.route('teams', function() {
    this.route('team', { path: ':team' });
    this.route('picks', { path: ':team/picks' });
    this.route('playoff-picks', { path: ':team/playoff-picks' });
  });

  this.route('stats', function() {
    this.route('rankings');
    this.route('weekly');
    this.route('best');

    this.route('playoff', function() {
      this.route('rankings');
    });
  });
  this.route('denied');

  this.route('admin', function() {
    this.route('status', { path: 'status/:status' });
  });
  this.route('playoffs', function() {
    this.route('show', { path: ':team' });
  });
});

export default Router;
