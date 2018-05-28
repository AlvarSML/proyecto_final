const express = require('express');
const bodyParser = require('body-parser');
const homeController = require('./controllers/homeController.js');
const registerController = require('./controllers/registerController.js');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/home', homeController);
app.use('/', registerController);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running');
});