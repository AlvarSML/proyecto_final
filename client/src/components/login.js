import React from "react";
import firebase from "./firebase";
import { withRouter } from 'react-router-dom';


/**
 * @class Login
 * @description Componente del login de la aplicacion, comprueba los datos en 
 * lado cliente y los envia usando la API de firebase
 * @constructor
 * @param props
 */
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userid: '',
      pass: '',
      error: ' '  
    }

    // Si estas autenticado se te redirije a Home
    firebase.auth().onAuthStateChanged(user=>{if(user) return this.props.history.push('/home')});

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  }

  //refactorizar
  /**
   * Gestiona el envio de datos en el submit
   * @param {Event} e 
   */
  handleSubmit(e) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
    .then(()=>{
      this.props.history.push('/home');      
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      //var errorMessage = error.message;
      this.setState({error:errorCode});
    });    
  }

  /**
  * Renderiza el elemento JSX -> HTML
  */
  render() {
    return (
      <form id='login' onSubmit={this.handleSubmit} method='post'>
        <h3>Log In</h3>
        <label htmlFor="user">
          <p>E-Mail:</p>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} pattern="^(\w+\W{1}){2}(\w+){1}" required/>
        </label>
        <label htmlFor="pass">
          <p>Contraseña:</p>
          <input type="password" name="pass" value={this.state.pass} onChange={this.handleChange} required/>
        </label>
        <input type="submit" value="Submit" />
        <p>{this.state.error}</p>
      </form>
    );
  }
}

export default  withRouter(Login);