import React, { Component } from 'react';
import firebase from 'firebase';

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      img: ''
    }
  }

  componentWillMount() {
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


  render() {
    return (
      <div id="perfil" className="block">
        <h2>{this.state.user.nombre}</h2>
        <img src={this.state.img} alt='foto de perfil' />
        <button className="button">Enviar mensaje</button>
      </div>
    )
  }
}

export default Profile;