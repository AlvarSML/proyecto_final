import React from "react";
import firebase from "firebase";

class Registro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      username:"",
      pass: "",
      passr: "",
      email: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log(this.state);
  }

  handleSubmit(e) {
    e.preventDefault();

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass).then(user=>{
      return user.updateProfile({displayName:this.state.user})
    }).catch(error => {
      // Handle Errors here.
      // var errorCode = error.code;
      var errorMessage = error.message;
      this.setState({error:errorMessage});
      // ...
    });

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
      <form onSubmit={this.handleSubmit} method='post'>
      <h3>Registro</h3>
      <label>
      <p>Email:</p>
        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} pattern="^(\w+\W{1}){2}(\w+){1}" required/>
      </label>
      <label>
      <p>Usuario:</p>
        <input type="text" name="user"  value={this.state.user} onChange={this.handleChange}/>
      </label>
      <label>
      <p>Contraseña:</p>
        <input type="password" name="pass"  value={this.state.pass} onChange={this.handleChange}/>
      </label>
      <label>
      <p>Repite la contraseña:</p>
        <input type="password" name="passr" />
      </label>
      <input type="submit" value="Submit" />
      <p>{this.state.error}</p>
    </form>
    );
  }
}

export default Registro;