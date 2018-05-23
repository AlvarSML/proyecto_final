import React, { Component } from "react";
import firebase from 'firebase';
import Post from './post';
/**
 * @class Posts
 * @description Genera un bloque posts para mostrar cada post
 * @extends Component
 * @constructor
 * @param props (from Component)
 */

class Posts extends Component {
  constructor(p) {
    super(p);
    this.state = {};
    this.db = firebase.database().ref('posts');
    this.db.once('value', data => this.setState({ posts: data.val() }));
    this.db.on('value', data => this.setState({ posts: data.val() }));

  }

  /**
   * Pasa los datos de JSON -> JSX para mostrarlos en pantalla
   * cada post se identifica con una key para poder interactuar con ellos
   */
  toHtml() {
    if (this.state.posts) return Object.keys(this.state.posts).map(
      (key, index) => {
        const obj = this.state.posts[key];
        return (
          <Post            
            titulo={obj.titulo}
            cuerpo={obj.cuerpo}
            user={obj.user}
            keyValue={key}
            key={key}
            likes={obj.positivos}
          />
        )
      })
  }

  /**
   * Renderiza el elemento JSX -> HTML
   */
  render() {
    return (
      <div className="block flex" id="posts">
        <p>Ultimos Posts</p>
        {this.toHtml()}
      </div>
    )
  }
}

export default Posts;