/**
* TODO : posible carga directa desde el servidor, al menos de los datos
*/

import React, { Component } from 'react';
import firebase, { database, auth } from 'firebase';
import Post from './home/post'
import { create } from 'domain';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      img: '',
      id: props.match.params.uid,
      posts: []
    }
    this.chatsUser;
    this.chatsProfile;

    this.startChat = this.startChat.bind(this)
    this.newChat = this.newChat.bind(this)
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
      .on('value', snap => { this.setState({ posts: snap.val() }) })

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

  componentDidMount() {
    this.forceUpdate();
  }

  startChat() {
    let chats1, chats2;
    const usuarios = database().ref('usuarios');
    const chats = database().ref('chats');

    chats
      .push({
        mensajes: {},
        nombre: 'chat de ' + this.state.user.nombre
      })
      .then(obj => {
        const usr = usuarios
          .orderByChild('userid')
          .equalTo(auth().currentUser.uid)

          console.log(usr)
          /*
          .child('chats')
          .push({chat:'asd'})
          .then(obj=>console.log(obj))
          */
      })





    this.newChat();
  }

  newChat() {
    database()
      .ref('/')
      .child('chats')
      .push({ titulo: 'Chat' })
  }

  render() {
    return (
      <div id="user" className="block">

        <h2>{this.state.user.nombre}</h2>
        <img src={this.state.img} alt='foto de perfil' />
        <button className="button" onClick={this.startChat}>Enviar mensaje</button>
        <hr />
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