const Admin = require('../models/Admin');

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
    } else {
      return "error"
    }
    
  }

  checkdata(){
    return (this.titulo && this.cuerpo && this.inicio && this.localizacion && this.user);
  }

  fillDefault(){
    for (let data in this) {
      if (!data) data = "default" 
    }
  }

  //doble check
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