var express = require('express');
var bodyParser = require('body-parser');
var homeController = require('./controllers/homeController.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/home', homeController);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running');
});