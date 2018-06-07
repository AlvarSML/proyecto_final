import React, { Component } from 'react';
import { getDisplayName } from 'recompose';
import { database } from 'firebase';
import { Link } from 'react-router-dom';

class Asistente extends Component {
  constructor(p) {
    super(p);
    this.state = {
      nombre: ''
    }

  }

  componentWillMount() {

    database()
      .ref('usuarios')
      .child(this.props.uid)
      .child('nombre')
      .on('value', data => this.setState({ nombre: data.val() }))

  }

  render() {
    return (
      <div className='asistente'>
        <Link to={`/users/${this.props.uid}`}> {this.state.nombre}</Link>
      </div>
    )
  }
}

export default Asistente;