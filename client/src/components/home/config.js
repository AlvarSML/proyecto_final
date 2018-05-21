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
   */
  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      email: this.state.user.email
    });


    const file = e.target.image.files[0];
    const storageRef = firebase.storage().ref(`profiles/${this.state.user.email}.jpg`);
    const task = storageRef.put(file);

    console.log(task);

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