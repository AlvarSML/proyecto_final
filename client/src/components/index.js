import React from "react";
//import ReactDOM from "react-dom";
import Login from "./login";
import Header from "./header";
import Registro from "./registro";
import Home from "./home/home";
import { Route, withRouter } from 'react-router-dom';
import NewPost from './home/newpost';


/**
 * @class Index
 * @description elemento contenedor de la aplicacion, almacena las rutas
 */
class Index extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div id="container">
          <Route exact path='/' component={() => <div><Login /><Registro /></div>} />
          <Route path='/home*' component={Home} />
          <Route path="*/nevento" component={NewPost} />
        </div>
      </div>
    );
  }
};


export default withRouter(Index);
