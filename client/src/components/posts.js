import React, { Component } from 'react';
import './posts.css';
import { Link } from 'react-router-dom';

class Posts extends Component {
  constructor() {
    super();
    this.state = {
     posts: []
    };
  }

  componentDidMount() {
    fetch('/posts')
      .then(res => res.json())
      .then(posts => this.setState({posts}, () => console.log('posts fetched...', posts)))
      .catch(err => {
        console.log(err)
      })
  }

  render() {
  
    return (
      <div>
        <h1>Posts</h1>
        <div className="collection">
         {this.state.posts.map(post => 
           <Link  className="collection-item" to={`/posts/${post.id}`}>{post.title}</Link>
         )}
   </div>
  </div>

    );
  }
}

export default Posts;
