import React,{ Component } from "react";
import firebase from 'firebase';
import Chat from './chat'

class Mensajes extends Component {
  constructor(props){
    super(props);
    this.state={
      chats:{},
      chatData:{},
      user:''
    }
    this.getChats = this.getChats.bind(this)
  }

  /*
  componentWillMount(){
    firebase.auth()
    .onAuthStateChanged(user=>{
      if (user)
      firebase.database()
      .ref('usuarios')
      .orderByChild('userid')
      .equalTo(user.uid)
      .on('value',data=>this.setState({chats:data.val()[Object.keys(data.val())[0]].chats}))
    })    
  }
  */
  getChats(){
  }

  render(){
    return(
      <div id="mensajes" className="fixed bottom">
        {
          //chapucilla
          Object.keys(this.state.chats || {}).map(key=>
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