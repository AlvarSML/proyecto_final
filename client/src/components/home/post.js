import React, { Component } from "react";
import firebase from 'firebase';

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: props.keyValue,
      likes: 0,
      user: props.user,
      titulo: props.titulo || '[error]',
      cuerpo: props.cuerpo || '[error cuerpo]'
    }

    this.like = this.like.bind(this);

  }

  componentWillMount(){    
    let post = firebase.database().ref('/posts').child(this.state.key).child('positivos');
    post.once('value',data=>this.setState({likes:data.val()}));
    post.on('value',data=>this.setState({likes:data.val()}))
    console.log(this.state.likes)
  }

  /**
   * @todo posible paso al servidor 
   */
  like(e) {
    let liked = false;
    let likes;

    if (this.state.likes === 0) {
      likes = {};
    } else {
      likes = this.state.likes;
    }

    for (let key in likes) {
      console.log(this.state.likes[key][this.state.user])
      if (this.state.likes[key][this.state.user]) liked = true
    }

    if (!liked) {
  
      this.setState({
        likes: likes
      })

      let post = firebase.database().ref('/posts').child(this.state.key).child('positivos');
      post.push({[this.state.user]:true})
      this.setState({[this.state.user]:true});
    }
  }

  render() {
    return (
      <section key={this.state.key} className="post">
        <p>{this.state.titulo}</p>
        <p>{this.state.cuerpo}</p>
        <p>{this.state.user}</p>
        <div>
          <p>{Object.keys(this.state.likes||{}).length}</p>
          <button name="like" className='button' onClick={this.like}>like</button>
          <button className='button'>dislike</button>
          <button className='button'>go</button>
        </div>
      </section>
    )
  }
}

export default Post;