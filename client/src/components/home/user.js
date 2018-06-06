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
      user: {}
    }

  }

  /**
   * Comportamiento del componente una vez se ha montado
   * Se obtienen los datos del usuario y se guardan en el estado
   */
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {

      this.setState({
        user: user
      });


      firebase.database()
        .ref('usuarios')
        .child(this.state.user.uid)
        .once('value', data => {
          let img = data.val().imagen;
          firebase.storage()
            .ref('profiles/' + img)
            .getDownloadURL().then(url => {
              console.log(url);
              return this.setState({ img: url })
            });
        })

    });
  }

  /**
  * Renderiza el elemento JSX -> HTML
  */
  render() {
    return (
      <div id='user' className="block">
        <h1>{this.state.user.displayName}</h1>
        <img src={this.state.img} alt="perfil" />
      </div>
    )
  }
}

export default User;