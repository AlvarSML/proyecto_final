import React, { Component } from 'react';
import { database, auth } from 'firebase';


class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      key: props.chatKey,
      message: '',
      mensajes: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    database()
      .ref('chats')
      .child(this.state.key)
      .on('value', data => {
        this.setState({
          data: data.val()
        })
      })
    
      database()
        .ref('chats')
        .child(this.state.key)
        .child('mensajes')
        .on('value',data=>{
          this.setState({mensajes:data.val()})
        })
  }

  handleSubmit(e){
    e.preventDefault();
    database()
      .ref('chats')
      .child(this.state.key)
      .child('mensajes')
      .push({
        msg:this.state.message,
        usuario:auth().currentUser.uid,
        date: new Date().getTime()
      })
    }

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="chat">
        <div className="chatHeader">
          <p className="titulo">{this.state.data.nombre}</p>
          <input type="checkbox" name="open" />
        </div>
        <div className="msgArea">
          {
            Object.keys(this.state.mensajes).map((key,index)=>{
              return <p key={key}>{this.state.mensajes[key].msg}</p>
            })
          }
          <form id="chatInput" onSubmit={this.handleSubmit}>
            <input type="text" name="message" onChange={this.handleChange}/>
            <input type="submit" name="subChat" value=">" />
          </form>
        </div>
      </div>
    )
  }

}

export default Chat;