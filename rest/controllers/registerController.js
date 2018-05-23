// home controller routes
const express = require('express');
const router = express.Router();
const admin = require('../models/Admin');
const User = require('../models/User');

/**
 * Router de las peticiones post a /home/nevento
 * devuelve true/false segun si se ha podido subir
 */
router.post('/', (req, res) => {
  const b = req.body;
  let user = new User(b.email,b.name,b.pass);

  if (user.checkFields()){
    console.log('campos correctos');
    user.createUser();
    user.getUid();
    user.crearRegistro();
    res.send({respuesta:'creado correctamente'})
  } else {
    console.log('campos incorrectos')
    res.send({respuesta:'Error en la creacion del usuario'})
  } 

});

module.exports = router; 