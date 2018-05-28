import React from "react";

/**
 * @class Registro
 * @description Elemento con el formulario para registrarse 
 * @constructor
 * @param props
 * @todo pasar al lado servidor para comprobar datos de forma mas fiable
 */
class Registro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      username: "",
      pass: "",
      passr: "",
      email: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPasswords = this.checkPasswords.bind(this);

  }

  /**
   * Control del submit del formulario
   * @param {Event} e 
   */
  handleSubmit(e) {
    e.preventDefault();
    const data = this.state

    if(this.checkPasswords())fetch('/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        pass: data.pass,
        name: data.user
      })
    }).then(resp => resp.json())
      .then(data => this.setState({ error: data.respuesta }))

  }

  /**
   * Control de los datos introducidos en el formulario
   * @param {Event} e 
   */
  handleChange(e) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  }

  checkPasswords(){
    let res = (this.state.pass === this.state.passr)
    if(!res)this.setState({error:'las contraseñas son diferentes'});
    else this.setState({error:''});
    return res;
  }

  /**
  * Renderiza el elemento JSX -> HTML
  */
  render() {
    return (
      <form onSubmit={this.handleSubmit} method='post'>
        <h3>Registro</h3>
        <label>
          <p>Email:</p>
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} pattern="^(\w+\W{1}){2}(\w+){1}" required />
        </label>
        <label>
          <p>Usuario:</p>
          <input type="text" name="user" value={this.state.user} onChange={this.handleChange} />
        </label>
        <label>
          <p>Contraseña:</p>
          <input type="password" name="pass" value={this.state.pass} onChange={this.handleChange} pattern="^[\d\w ]{8,}$" />
        </label>
        <label>
          <p>Repite la contraseña:</p>
          <input type="password" name="passr" value={this.state.passr} onChange={this.handleChange}/>
        </label>
        <i>La contraseña tiene que tener al menos 8 caracteres</i>
        <p style={{color:"red"}}>{this.state.error}</p>
        <input type="submit" value="Submit" />        
      </form>
    );
  }
}

export default Registro;