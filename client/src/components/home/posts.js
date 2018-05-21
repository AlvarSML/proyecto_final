import React, { Component } from "react";
import firebase from 'firebase';

class Posts extends Component {
  constructor(p) {
    super(p);
    this.state = {};
    const db = firebase.database().ref('posts');
    db.once('value', data => this.setState({ posts: data.val() }));
    db.on('value', data => this.setState({ posts: data.val() }));
  }

  toHtml() {
    if (this.state.posts) return Object.keys(this.state.posts).map(
      (key, index) => {
        let obj = this.state.posts[key];
        return (
          <section key={key} className="post">
            <p>{obj.title}</p>
            <p>{obj.body}</p>
            <p>{obj.user}</p>
            <button className='button'>like</button>
            <button className='button'>dislike</button>
            <button className='button'>go</button>
          </section>
        )
      })
  }

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