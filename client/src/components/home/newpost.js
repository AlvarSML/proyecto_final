import React, { Component } from 'react';
import firebase from 'firebase';
import MapComponent from './mapsapi';

class NewPost extends Component {
  constructor(p) {
    super(p);

    this.state = {
      titulo: "",
      cuerpo: "",
      inicio: "",
      final: "123",
      localizacion: { lat: 40.4, lng: -3.7 },
      user: "hi"
    }

    this.updateLocation = this.updateLocation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    firebase.auth().onAuthStateChanged(user => this.setState({user:user.uid}));

    console.log(this.state.user);
  }

  updateLocation(lat, lng) {
    this.setState({
      localizacion: { lat: lat, lng: lng }
    })
  }

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = this.state
    fetch('/home/nevento', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        titulo: data.titulo,
        cuerpo: data.cuerpo,
        inicio: data.inicio,
        final: data.final,
        localizacion: data.localizacion,
        user: this.state.user
      })
    })
  }


  render() {
    return (
      <form onSubmit={this.onSubmit} autoComplete="on" onChange={this.handleChange}>
        <p><b>Nuevo Evento</b></p>
        <label htmlFor="titulo">
          <p>Titulo:</p>
          <input type="text" name="titulo" placeholder="Escribe un titulo"  value={this.state.titulo}/>
        </label>
        <label htmlFor="cuerpo">
          <p>Cuerpo:</p>
          <textarea name="cuerpo" placeholder="Escribe una breve descripcion del evento" />
        </label>

          <label htmlFor="inicio">
            <p>Inicio:</p>
            <input type="date" name="inicio" />
          </label>
          <label htmlFor="final">
            <p>Final:</p>
            <input type="date" name="final" />
          </label>

        <label htmlFor="map">
          Ubicacion: {'{'+this.state.localizacion.lat + "," + this.state.localizacion.lng+'}'}
        </label>
        <label>
          {`Usuario: ${this.state.user}`}
        </label>
        <MapComponent
          initialLocation={this.state.localizacion}
          initialZoom={5}
          isMarkerShown
          updateLocation={this.updateLocation}
        />
        <input type="submit" value="Crear" />
      </form>
    )
  }
}

export default NewPost;