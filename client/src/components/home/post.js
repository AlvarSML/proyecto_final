import React, { Component } from "react";
import firebase from 'firebase';
import MapComponent from './mapsapi';
import { Link } from 'react-router-dom';

/**
 * @TODO :
 *  - paso al servidor de la gestion de likes y asistentes
 *  - generacion de mapas para eventos
 *  - boton de compartir
 *  - link en el nombre del evento y del usuario
 *  - imagen del usuario
 */

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: props.keyValue,
      location: props.location,
      positivos: props.positivos,
      inicio: props.inicio,
      final: props.final,
      user: props.user,
      name: props.user.displayName || '[Usuario]',
      titulo: props.titulo || '[error]',
      cuerpo: props.cuerpo || '[error cuerpo]',
      asistentes: props.asistentes,
      currUser: props.currUser
    }

    this.genericIncrement = this.genericIncrement.bind(this);

  }


  // TODO: optimizar
  componentWillMount() {
    const db = firebase.database().ref('/posts').child(this.state.key);
    //escuchar likes
    let post = db.child('positivos');
    post.on('value', data => this.setState({ likes: data.val() }))

    //escuchar asistentes
    let assist = db.child('asistentes');
    assist.on('value', data => { this.setState({ asistentes: data.val() }) })

    //cargar datos del usuario creador
    let item = firebase.database()
      .ref('/usuarios')
      .orderByChild('userid')
      .equalTo(this.state.user)
      .limitToFirst(1)

    item.once('value', data => this.setState({ name: (data.val()[Object.keys(data.val())[0]].nombre) }))

  }


  /**
   * Funcion que inserta un usuario en un campo si no esta previamente
   * Depende del nombre del boton en el que se ejecute
   * @param {Event} e 
   */
  genericIncrement(e) {
    let element = e.target.name;
    let field = {};

    //previene nulos
    if (!this.state[element] === 0 || !this.state[element] === null) {
      field = this.state[element]
    }

    if (!field[this.state.currUser.uid]) {
      let post = firebase.database().ref('/posts').child(this.state.key).child(element);
      post.update({ [this.state.currUser.uid]: true })
    }
  }

  render() {
    return (
      <section key={this.state.key} className="post">
          <div>
            <p className="titulo">{this.state.titulo}</p>
            <hr />
            <p>{this.state.cuerpo}</p>
            <p>El evento empezara el dia: {this.state.inicio}</p>
            <p>Y terminara el dia: {this.state.final}</p>
            <p></p>
            <hr />
            <p>Creado por:</p>
            <Link to={`/users/${this.state.user}`}>{this.state.name}</Link>
            <hr />
            <div className="buttonContainer">
              <button name="positivos" className='button' onClick={this.genericIncrement}>{Object.keys(this.state.likes || {}).length} me gusta</button>
              <button name="asistentes" className='button' onClick={this.genericIncrement}>{Object.keys(this.state.asistentes || {}).length} voy a ir</button>
              <button name="compartir" className='button'>Compartir</button>
            </div>
          </div>
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.location.lat},${this.state.location.lng}&zoom=11&size=400x400\
              &markers=color:red%7C${this.state.location.lat},${this.state.location.lng}
              &key=AIzaSyACjVIcxYixmV3QHW8PFjUvlcUtxyZQHlY`}
            alt='map'
          />
      </section>
    )
  }
}

export default Post;