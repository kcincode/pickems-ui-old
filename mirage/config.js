import ENV from 'pickems/config/environment';

export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  this.urlPrefix = ENV.api.host;
  this.namespace = ENV.api.namespace;
  this.timing = 400;

  this.post('/users');
  this.post('/token', {
    data: {
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwib3JpZ19pYXQiOjE0NzAzNTk4ODIsInVzZXJfaWQiOjMsImVtYWlsIjoidGVzdHVzZXJAZXhhbXBsZS5jb20iLCJleHAiOjE0NzAzNjE2ODJ9.7gwJNz3GhTlabDrjTJkCO82ztwL4lxPujYi8AMle2zw'
    }
  });

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
}
