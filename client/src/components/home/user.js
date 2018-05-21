import React, { Component } from 'react';
//import { Redirect, browserHistory } from 'react-router-dom';
import firebase from 'firebase';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      img: '',
      status: ''
    }
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      const storage = firebase.storage().ref(`profiles/${user.email}.jpg`);
      storage.getDownloadURL().then(url=>{
        this.setState({
          img:url
        });
      });

      if (user) {
        this.setState({
          userName:user.displayName
        });
      } else {
        console.error('error de usuario');        
      }
    });
  }

  render() {
    return (
      <div id='user' className="block">
      <h1>{this.state.userName}</h1>
      <img src={this.state.img} alt="perfil"/>
      </div>
    )
  }
}

export default User;