// home controller routes
const express = require('express');
const router = express.Router();
const admin = require('../models/Admin');
const Evento = require('../models/Event');

/**
 * Router de las peticiones post a /home/nevento
 * devuelve true/false segun si se ha podido subir
 */
router.post('/nevento', (req, res, next) => {
  const b = req.body;
  let evento = new Evento(b.titulo, b.cuerpo, b.inicio, b.final, b.localizacion, b.user);
  console.log(evento.getData());
  res.send(evento.uploadEvent()),
  next();
});


module.exports = router; 