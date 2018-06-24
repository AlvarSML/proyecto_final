'use strict';

import React, { Component } from 'react';
import { database, auth } from 'firebase';


class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {nombre:'[error]'},
      key: props.chatKey,
      message: '',
      mensajes: {},
      collapse: true,
      usuario: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.collapse = this.collapse.bind(this);

    auth().onAuthStateChanged(user=>{
      this.setState({usuario:user.uid})
    })
  }

  componentWillMount() {
    database()
      .ref('chats')
      .child(this.state.key)
      .on('value', data => {
        if (data) this.setState({
          data: data.val()
        })
      })

    database()
      .ref('chats')
      .child(this.state.key)
      .child('mensajes')
      .on('value', data => {
        if (data.val()) this.setState({ mensajes: data.val() })
      })
  }

  handleSubmit(e) {
    e.preventDefault();
    database()
      .ref('chats')
      .child(this.state.key)
      .child('mensajes')
      .push({
        msg: this.state.message,
        usuario: auth().currentUser.uid,
        date: new Date().getTime()
      })

    this.setState({ message: '' })
  }

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  }

  collapse() {
    this.setState({ collapse: !this.state.collapse })
  }

  render() {
    return (
      <div className="chat">
        <div className="chatHeader">
          <p>{this.state.data.nombre}</p>
          <input type="checkbox" name="open" onChange={this.collapse} />
        </div>
        <div className={(this.state.collapse) ? 'msgArea collapse' : 'msgArea'}>
          {
            Object.keys(this.state.mensajes).map((key, index) => {
              let mensaje = this.state.mensajes[key];
              //asd
              let userMsg = mensaje.usuario === this.state.usuario;
              return <p key={key} className={(userMsg) ? 'host' : 'otherUser'}>{mensaje.msg}</p>
            })
          }
        </div>
        <form id="chatInput" onSubmit={this.handleSubmit} className={(this.state.collapse) ? 'collapse' : ''}>
          <input type="text" name="message" value={this.state.message} onChange={this.handleChange} />
          <input type="submit" name="subChat" value=">" />
        </form>

      </div>
    )
  }

}

export default Chat;