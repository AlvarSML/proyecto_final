const Admin = require('../models/Admin');

class User {
  constructor(email, nombre, pass) {
    this.email = email;
    this.nombre = nombre;
    this.pass = pass;
    this.uid = null;
  }

  checkFields() {
    return this.validateEmail(this.email) && this.validatePass(this.pass)
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let mail = re.test(String(email).toLowerCase());

    if (!mail) console.log('email incorrecto'); 

    return mail
  }

  validatePass(pass) {
    const re =/^[\d\w ]{8,}$/;
    let passw = re.test(pass);
    console.log(pass);
    if (!passw) console.log('pass incorrecto');
    return passw;
  }

  validateUser(user) {
    return !(user == null || user == "" || user == " ")
  }

  getUid(){
    Admin.auth().getUserByEmail(this.email).then(user=>this.uid=user.uid);
  }

  createUser() {
    console.log(this.name)
    Admin.auth().createUser({
      email: this.email,
      emailVerified: false,
      password: this.pass,
      displayName: this.nombre,
      disabled: false
    }).then(userRecord => this.uid = userRecord.uid)

    console.log(this.uid);
  }
}

module.exports = User;