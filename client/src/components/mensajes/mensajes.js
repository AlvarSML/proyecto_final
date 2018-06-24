import React, { Component } from "react";
import firebase from 'firebase';
import Chat from './chat'

class Mensajes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: {},
      chatData: {},
      user: ''
    }
  }


  componentWillMount() {
    firebase.auth()
      .onAuthStateChanged(user => {
        if (user){
          firebase.database()
            .ref('usuarios')
            .child(user.uid)
            .on('value', data => this.setState({ chats: data.val().chats }))
        } else {
          this.setState({chats: []})
        }
      })
  }

  render() {
    return (
      <div id="mensajes" className="fixed bottom">
        {
          //chapucilla
          Object.keys(this.state.chats || {}).map(key =>
            <Chat
              key={key}
              chatKey={key}
            />
          )
        }
      </div>
    )
  }
}

export default Mensajes;