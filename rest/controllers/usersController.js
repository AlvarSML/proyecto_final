// home controller routes
const express = require('express');
const router = express.Router();
const admin = require('../models/Admin');
const User = require('../models/User');


router.post('/home/config', (req, res, next) => {
  const b = req.body;

  if (b.name) {
    admin.auth().updateUser(b.user, {
      displayName: b.name
    })
      .then(
        res.send({ respuesta: 'Bien' })
      )
      .catch(
        res.send({ respuesta: 'Mal' })
      )

    admin.database()
      .ref('usuarios')
      .child(b.name)
      .update({
        nombre:b.name
      })
  }

})

/**
 * Router de las peticiones post a /home/nevento
 * devuelve true/false segun si se ha podido subir
 */
router.post('/home', (req, res, next) => {
  const b = req.body;
  console.log('email ' + b.email);
  let user = new User(b.email, b.name, b.pass);

  if (user.checkFields()) {
    console.log('campos correctos');
    user.createUser();
    res.send({ respuesta: 'creado correctamente' })
  } else {
    console.log('campos incorrectos')
    res.send({ respuesta: 'Error en la creacion del usuario' })
  }

  next();
});

/**
 * Router de las peticiones a /
 * permite crear usuarios comprobado los datos
 */
router.post('/', (req, res) => {
  const b = req.body;
  console.log(b.email);
  let user = new User(b.email,b.name,b.pass);

  if (user.checkFields()){
    console.log('campos correctos');
    user.createUser();
    res.send({respuesta:'creado correctamente'})
  } else {
    console.log('campos incorrectos')
    res.send({respuesta:'Error en la creacion del usuario'})
  } 

});

module.exports = router; 