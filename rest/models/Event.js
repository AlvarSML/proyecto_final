const Admin = require('../models/Admin');

/**
 * @class Evento
 * 
 */
class Evento {
  constructor(titulo,cuerpo,inicio,final,localizacion,user){
    this.titulo = titulo;
    this.cuerpo = cuerpo;
    this.inicio = inicio;
    this.final = final;
    this.localizacion = localizacion;
    this.positivos = 0;
    this.negativos = 0;
    this.usuarios = [];
    this.user = user;
  }

  uploadEvent(){
    if(this.checkdata()){
      let db = Admin.database().ref('posts/');
      let newE = db.push(this.getData());
      return true
    } else {
      console.warn("empty field in event");
      this.fillDefault();
      console.log(this)
      return false
    }    
  }

  //comprobacion fecha
  checkdata(){
    return (this.titulo && this.cuerpo && this.inicio && this.localizacion && this.user);
  }

  //hardcodeado
  fillDefault(){
    this.titulo || (this.titulo = "Titulo desconocido");
    this.cuerpo || (this.cuerpo = "Cuerpo no definido");
    this.inicio || (this.inicio = "01-01-2000");
    this.final || (this.final = "02-01-2000");
    this.localizacion || (this.localizacion = {lat:"0",lng:"0"});
    this.user || (this.user = "Usuario Anonimo");
  }

  //doble check
  //hardcodeado
  getData(){
    if(this.checkdata()) return ({
      "titulo":this.titulo,
      "cuerpo":this.cuerpo,
      "inicio":this.inicio,
      "final":this.final,
      "localizacion":this.localizacion,
      "positivos":this.positivos,
      "negativos":this.negativos,
      "usuarios":this.usuarios,
      "user":this.user
    })
    else return false
  }
}

module.exports = Evento;