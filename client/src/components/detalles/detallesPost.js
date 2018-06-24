'use strict';
import React, { Component } from 'react';
import MapComponent from '../home/mapsapi';
import { database, auth } from 'firebase';
import Asistente from './asistente';

class Detalles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: props.match.params.postid,
      user: '',
      localizacion: {},
      data: '',
      currUser: {},
      asistentes: {}
    }

    this.getMap = this.getMap.bind(this);
    this.genericIncrement = this.genericIncrement.bind(this);
    this.getAsistentes = this.getAsistentes.bind(this);
    this.getPositivos = this.getPositivos.bind(this);

    auth().onAuthStateChanged(user => this.setState({ currUser: user }));
  }

  componentWillMount() {
    database()
      .ref('posts')
      .child(this.state.key)
      .once('value', data => {
        this.setState({
          titulo: data.val().titulo,
          cuerpo: data.val().cuerpo,
          localizacion: data.val().localizacion,
          inicio: data.val().inicio,
          final: data.val().final
        })
      })

    database()
      .ref('posts')
      .child(this.state.key)
      .on('value', data => {
        this.setState({
          positivos: data.val().positivos,
          asistentes: data.val().asistentes
        })
      })
  }

  //compensar delay map 
  getMap() {
    if (this.state.localizacion.lng) return (
      <MapComponent
        initialLocation={this.state.localizacion}
        initialZoom={5}
        isMarkerShown
      />
    )
  }

  //compensa delay render
  getAsistentes() {
    const aist = Object.keys(this.state.asistentes || {});
    return (
      <div id="asistentes">
        {aist.map(val => {
          return <Asistente uid={val} key={val} />
        })}
      </div>
    )
  }

  getPositivos() {
    const aist = Object.keys(this.state.positivos || {});
    return (
      <div id="positivos">
        {aist.map(val => {
          return <Asistente uid={val} key={val} />
        })}
      </div>
    )
  }



  /**
  * Funcion que inserta un usuario en un campo si no esta previamente
  * Depende del nombre del boton en el que se ejecute
  * @param {Event} e 
  */
  genericIncrement(e) {
    let element = e.target.name;
    var field = {};

    //previene nulos
    if (this.state[element] !== undefined) {
      field = this.state[element]
    }

    if (field[this.state.currUser.uid] === undefined) {

      let post = database().ref('/posts').child(this.state.key).child(element);
      post.update({ [this.state.currUser.uid]: true })
    } else {

      let post = database().ref('/posts').child(this.state.key).child(element).child(this.state.currUser.uid);
      post.remove()
    }
  }


  /**
   * permitir editar
   */
  render() {
    return (
      <div className="detalles block">
        <h3>{this.state.titulo}</h3>
        <hr />
        {this.getMap()}
        <a href={`https://www.google.com/maps/search/?api=1&query=${this.state.localizacion.lat},${this.state.localizacion.lng}`} target="_blank">Abrir en maps</a>
        <hr />

        <p>{this.state.cuerpo}</p>
        <hr />
        <p>El evento empezara el dia: {this.state.inicio}</p>
        <p>Y terminara el dia: {this.state.final}</p>
        <p></p>
        <div className="buttonContainer">
          <button name="positivos" className='button' onClick={this.genericIncrement}>{Object.keys(this.state.positivos || {}).length} me gusta</button>
          <button name="asistentes" className='button' onClick={this.genericIncrement}>{Object.keys(this.state.asistentes || {}).length} voy a ir</button>
          <button name="compartir" className='button'>Compartir</button>
        </div>
        <hr />

        <div className="detalles_datos">
          <div>
            <h3>Asistentes 🏃‍</h3>
            <div className="asistentes">
              {this.getAsistentes()}

            </div>
          </div>
          <div>
            <h3>Megustas 👍</h3>
            <div className="asistentes">
              {this.getPositivos()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Detalles;