import React, { Component } from "react";
import firebase from 'firebase';

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
    const db = firebase.database().ref('posts');
    db.once('value', data => this.setState({ posts: data.val() }));
    db.on('value', data => this.setState({ posts: data.val() }));
  }

  /**
   * Pasa los datos de JSON -> JSX para mostrarlos en pantalla
   * cada post se identifica con una key para poder interactuar con ellos
   */
  toHtml() {
    if (this.state.posts) return Object.keys(this.state.posts).map(
      (key, index) => {
        let obj = this.state.posts[key];
        return (
          <section key={key} className="post">
            <p>{obj.titulo}</p>
            <p>{obj.cuerpo}</p>
            <p>{obj.user}</p>
            <button className='button'>like</button>
            <button className='button'>dislike</button>
            <button className='button'>go</button>
          </section>
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