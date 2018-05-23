import React, { Component } from 'react';
//import { Redirect, browserHistory } from 'react-router-dom';
import firebase from 'firebase';


/**
 * @class User
 * @description Genera el perfil del usuario
 * @constructor
 * @param props
 */
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      img: '',
      status: ''
    }
    firebase.auth().onAuthStateChanged(user => this.setState({userName: user.displayName}));
  }

  /**
   * Comportamiento del componente una vez se ha montado
   * Se obtienen los datos del usuario y se guardan en el estado
   */
  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      const storage = firebase.storage().ref(`profiles/${user.uid}.jpg`);
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

   /**
   * Renderiza el elemento JSX -> HTML
   */
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