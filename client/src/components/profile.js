/**
* TODO : posible carga directa desde el servidor, al menos de los datos
*/
'use strict';

import React, { Component } from 'react';
import firebase, { database, auth } from 'firebase';
import Post from './home/post'
import { create } from 'domain';
import { ENGINE_METHOD_DIGESTS } from 'constants';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      img: '',
      id: props.match.params.uid,
      posts: {},
      usuario: '',
      nomUsuario: '',
      chatsUser: null,
      chatsProfile: null,
      coincidencia: true
    }


    this.startChat = this.startChat.bind(this)
    this.existsChat = this.existsChat.bind(this)

    //no deberia existir
    auth().onAuthStateChanged(user => {
      this.setState({
        usuario: user.uid,
      })

      firebase.database()
      .ref('usuarios')
      .child(user.uid)
      .child('nombre')
      .on('value', data => this.setState({
        nomUsuario: data.val()
      }))

    })

   
  }

  /**
   * Obtencion de datos
   * Posible paso a peticion GET al server
   */
  componentWillMount() {
    firebase.database()
      .ref('/posts')
      .orderByChild('user')
      .equalTo(this.state.id)
      .on('value', snap => { if (snap.val()) this.setState({ posts: snap.val() }) })

    const { match: { params } } = this.props;
    firebase.database()
      .ref('/usuarios')
      .child(params.uid)
      .once('value', data => {
        if (data.val() !== null) {
          this.setState({ user: data.val() });
          firebase.storage()
            .ref('profiles/' + data.val().imagen)
            .getDownloadURL()
            .then(url => this.setState({ img: url }))
            .catch(error => console.log(error))
        }
      })

    console.log(this.state.nomUsuario);

  }

  componentDidMount() {
    this.forceUpdate();
  }

  startChat() {
    this.existsChat();
    console.log(this.state.coincidencia);
    const usuarios = database().ref('usuarios');
    const chats = database().ref('chats');

    if (!this.state.coincidencia) chats
      .push({
        mensajes: {},
        nombre: 'chat de ' + this.state.user.nombre + ' y ' + this.state.nomUsuario
      })
      .then(obj => {
        usuarios
          .child(auth().currentUser.uid)
          .update({ chats: { [obj.key]: true } })

        database()
          .ref('usuarios')
          .child(this.state.id)
          .update({ chats: { [obj.key]: true } })
      })

  }

  //tarda en cargar
  existsChat() {
    database()
      .ref('usuarios')
      .child(this.state.usuario)
      .child('chats')
      .once('value', data => {
        this.setState({ chatsUser: Object.keys(data.val() || {}) });
      });

    database()
      .ref('usuarios')
      .child(this.state.id)
      .child('chats')
      .once('value', data => {
        this.setState({ chatsProfile: Object.keys(data.val() || {}) });
      });

    if (this.state.chatsProfile) {
      console.log('lol')
      this.state.chatsProfile.forEach(val => {
        if (this.state.chatsUser.find(a => a == val)) {
          this.setState({ coincidencia: true })
        } else {
          console.log('chat');
          this.setState({ coincidencia: false })
        }
      })

      if (this.state.chatsProfile.length === 0 && this.state.chatsUser.length === 0) {
        this.setState({ coincidencia: false });

      }
    }


  }

  render() {
    return (
      <div id="user" className="block">

        <h2>{this.state.user.nombre}</h2>
        <img src={this.state.img} alt='foto de perfil' />
        <button className="button" onClick={this.startChat}>Enviar mensaje</button>
        <hr />
        <p>Eventos creados</p>
        <section>
          {Object.keys(this.state.posts).map(
            (key, index) => {
              const obj = this.state.posts[key];
              return (
                <Post
                  titulo={obj.titulo}
                  inicio={obj.inicio}
                  final={obj.final}
                  cuerpo={obj.cuerpo}
                  user={obj.user}
                  keyValue={key}
                  key={key}
                  likes={obj.positivos}
                  currUser={this.state.id}
                  positivos={obj.positivos}
                  asistentes={obj.asistentes}
                  location={obj.localizacion}
                />
              )
            })}
        </section>
      </div>
    )
  }
}

export default Profile;