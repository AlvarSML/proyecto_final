import React,{Component} from 'react';
import { database } from 'firebase';


class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {
      mensajes:{},
      key:props.chatKey
    }
  }

  componentWillMount(){
    database()
    .ref('chats')
    .child(this.state.key)
    .on('value',data=>{
      this.setState({
        mensajes:data.val()
      })
    })
  }

  render(){
    return(
      <div className="chat">
        <p className="titulo"></p>
        <div className="msgArea">
          {console.log(this.state.mensajes)}
        </div>
      </div>
    )
  }

}

export default Chat;