let admin = require('firebase-admin');
let serviceAccount = require('./admin-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://final-5e3bc.firebaseio.com/'
});

module.exports = admin;