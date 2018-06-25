const express = require('express');
const bodyParser = require('body-parser');
const homeController = require('./controllers/homeController.js');
const usersController = require('./controllers/usersController');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/home', homeController);
app.use('/', usersController);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running');
});