// home controller routes
var express = require('express');
var router = express.Router();

let admin = require('../models/Admin');

const Evento = require('../models/Event');

// get /api/home/
router.get('/', (req, res) => {
  
});

// post /api/home/
router.post('/nevento', (req, res) => {
  const b = req.body;

  let evento = new Evento(b.titulo,b.cuerpo,b.inicio,b.final,b.localizacion,b.user);

  console.log(evento.getData());
  evento.uploadEvent();

  res.send(evento);
});

// put /api/home/
router.put('/', (req, res) => {
  res.send('PUT response');
});

// delete /api/home/
router.delete('/', (req, res) => {
  res.send('DELETE response');
});

module.exports = router; 