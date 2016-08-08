import ENV from 'pickems/config/environment';
import fetch from 'ember-network/fetch';

export default function currentUser(store, session) {
  return fetch(`${ENV.api.host}/${ENV.api.namespace}/users/current`, {
    type: 'GET',
    headers: {
      'Authorization': `JWT ${session.get('session.content.authenticated.data.access_token')}`
    }
  }).then((raw) => {
    return raw.json().then((data) => {
      // console.log('data', JSON.stringify(data));
      // modify type to singular
      data.data.type = 'user';
      let currentUser = store.push(data);
      session.set('currentUser', currentUser);
    });
  }).catch((error) => {
    console.error(JSON.stringify(error));
    session.invalidate();
  });
}
