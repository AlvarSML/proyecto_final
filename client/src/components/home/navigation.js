import React, { Component } from 'react';
import firebase from 'firebase';
import { withRouter } from 'react-router-dom';

class navigation extends Component {
  constructor(props) {
    super(props);

    this.config = this.config.bind(this);
    this.exit = this.exit.bind(this);
    this.nevento = this.nevento.bind(this);
    this.inicio = this.inicio.bind(this);

  }

  config() {
    if (this.props.location.pathname !== "/home/config") this.props.history.push("/home/config")
    else this.props.history.push("/home")
  }

  exit() {
    firebase.auth().signOut().then(() => {
      console.log("ouscessfull out");
    }, () => {
      // An error happened.
    });
  }

  nevento() {
    if (this.props.location.pathname !== "/home/nevento") this.props.history.push("/home/nevento")
    else this.props.history.push("/home")
  }

  inicio() {
    this.props.history.push("/home");
  }

  render() {
    return (
      <nav className="block flex">
        <button className="button" onClick={this.inicio}>Inicio</button>
        <button className="button" onClick={this.config}>Editar perfil</button>
        <button className="button" onClick={this.nevento}>Nuevo Evento</button>
        <button className="button" onClick={this.exit}>Cerrar sesion</button>
      </nav>
    )
  }
}

export default withRouter(navigation);