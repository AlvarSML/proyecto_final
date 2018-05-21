import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import firebase from 'firebase';

//componentes
import User from './user';
import Config from './config';
import Navigation from './navigation';
import Posts from './posts'


/**
 * @class Home
 * @description Elemento principal de la pagina
 * @constructor
 * @param props
 */
class Home extends Component {

  constructor(props) {
    super(props);

    firebase.auth().onAuthStateChanged((user) => {
      if(!user)this.props.history.push('/');
    });
  }

  /**
  * Renderiza el elemento JSX -> HTML
  */
  render() {
    return (
      <div id="home">
        <User />
        <Navigation />
        <Route path="*/config" component={Config} />
        <Posts />
      </div>
    )
  }
}

export default Home;