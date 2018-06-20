import React, { Component } from 'react';
import firebase from 'firebase';

/// TODO: cambiar la configuracion individualmente

/**
 * @class Config
 * @description Modifica el perfil del usuario
 */
class Config extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newName: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    firebase.auth().onAuthStateChanged(user => this.setState({user: user}));
  }

  /**
   * Modificacion del estado con los cambios en los input
   * @param {Event} e 
   */
  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  }

  // Pasar al servidor, actualizar al enviar
  /**
   * Manejo del submit del formulario
   * @param {Event} e 
   * @todo datos individuales, actualizar pagina
   */
  handleSubmit(e) {
    e.preventDefault()

    //envio de datos con post
    fetch('/home/config',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        img: `profiles/${this.state.user.uid}.jpg`,
        name: this.state.newName,
        user: firebase.auth().currentUser.uid
      })
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        error: data.respuesta
      })
    })

    // Subida de imagen, mas rapido desde el cliente
    const file = e.target.image.files[0];
    const storageRef = firebase.storage().ref(`profiles/${this.state.user.uid}.jpg`);
    storageRef.put(file);

    /*
    this.setState({
      email: this.state.user.email
    });

    firebase.auth().onAuthStateChanged(user => {
      return user.updateProfile({
        displayName: this.state.newName,
        photoURL: this.state.img
      }).then(function () {
        console.log('OK');
      }).catch(function (error) {
        console.log('error')
      });

    });

    */

  }

  /**
   * Paso de JSX -> HTML
   */
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <p>Nuevo nombre</p>
        <input type="text" name="newName" onChange={this.handleChange} />
        </label>
        <label htmlFor="image">
          <p>Nueva <br /> imagen</p>
          <input type="file" name="image" onChange={this.handleChange} />
        </label>
        <input type="submit" value="Intro" />
      </form>

    )
  }
}

export default Config;