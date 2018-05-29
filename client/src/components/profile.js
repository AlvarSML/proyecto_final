/**
 * TODO : posible carga directa desde el servidor, al menos de los datos
 */

import React, { Component } from 'react';
import firebase from 'firebase';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      img: '',
      id: props.match.params.uid,
      posts: []
    }

    firebase.database()
      .ref('/posts')
      .orderByChild('user')
      .equalTo(this.state.id)
      .on('value',snap=>{this.setState({posts:snap.val()})})
  }

  /**
   * Obtencion de datos
   * Posible paso a peticion GET
   */
  componentWillMount() {
    const { match: { params } } = this.props;
    firebase.database()
      .ref('/usuarios')
      .orderByChild('userid')
      .equalTo(params.uid)
      .once('value', data => {
        if (data.val() !== null) this.setState({ user: data.val()[Object.keys(data.val())[0]] })
        firebase.storage()
          .ref('profiles/' + data.val()[Object.keys(data.val())[0]].imagen)
          .getDownloadURL()
          .then(url => this.setState({ img: url }))
          .catch(error => console.log(error))
      })
  }

  render() {
    return (
      <div id="perfil" className="block">
        <section>
          <h2>{this.state.user.nombre}</h2>
          <img src={this.state.img} alt='foto de perfil' />
          <button className="button">Enviar mensaje</button>
        </section>
        <section>
          {}
        </section>
      </div>
    )
  }
}

export default Profile;