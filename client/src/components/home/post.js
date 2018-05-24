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
      cuerpo: props.cuerpo || '[error cuerpo]',
      asistentes: 0
    }

    this.like = this.like.bind(this);
    this.go = this.go.bind(this);

  }

  componentWillMount(){
    const db = firebase.database().ref('/posts').child(this.state.key);
    //cargar likes
    let post = db.child('positivos');
    post.once('value',data=>this.setState({likes:data.val()}));
    post.on('value',data=>this.setState({likes:data.val()}))

    //cargar asistentes
    let assist = db.child('asistentes');
    assist.once('value',data=>{this.setState({asistentes:data.val()})})
    assist.on('value',data=>{this.setState({asistentes:data.val()})})
   
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


  // !!! repite patron
  go(){
    let going = false;
    let asistentes;

    if (this.state.asistentes === 0) {
      asistentes = {};
    } else {
      asistentes = this.state.asistentes;
    }

    for (let key in asistentes) {
      if (asistentes[key][this.state.user]) going = true
    }

    if (!going) {
  
      this.setState({
        asistentes: asistentes
      })

      let post = firebase.database().ref('/posts').child(this.state.key).child('asistentes');
      post.push({[this.state.user]:true})
    }

  }

  render() {
    return (
      <section key={this.state.key} className="post">
        <p>{this.state.titulo}</p>
        <p>{this.state.cuerpo}</p>
        <p>{this.state.user}</p>
        <div>
          <button name="like" className='button' onClick={this.like}>{Object.keys(this.state.likes||{}).length} like</button>
          <button className='button' onClick={this.go}>{Object.keys(this.state.asistentes||{}).length} go</button>
        </div>
      </section>
    )
  }
}

export default Post;