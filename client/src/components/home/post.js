import React, { Component } from "react";

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: props.keyValue,
      likes: props.likes || 0,
      dislikes: props.dislikes || 0,
      user: props.user,
      titulo: props.titulo || '[error]',
      cuerpo: props.cuerpo || '[error cuerpo]'
    }

    this.like = this.like.bind(this);
  }

  like(e) {
    this.setState({
      likes: this.state.likes + 1
    })
  }

  render() {
    return (
      <section key={this.state.key} className="post">
        <p>{this.state.titulo}</p>
        <p>{this.state.cuerpo}</p>
        <p>{this.state.user}</p>
        <div>
          <p>{this.state.likes - this.state.dislikes}</p>
          <button name="like" className='button' onClick={this.like}>like</button>
          <button className='button'>dislike</button>
          <button className='button'>go</button>
        </div>
      </section>
    )
  }
}

export default Post;