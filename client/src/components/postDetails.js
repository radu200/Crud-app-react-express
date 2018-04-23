import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class postDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      details:[]
    }
  }

  componentDidMount() {
    let postId = this.props.match.params.id;
    fetch(`http://localhost:3000/posts/${postId}`,{
      method:'GET',
    })
      .then(res => res.json())
      .then(data => this.setState({details:data}, () => console.log('postsdetails fetched...',this.state)))
      .catch(err => {
        console.log(err)
      })
    }
    
    onDelete(){
      
      let postId = this.state.details[0].id
      fetch(`/posts/delete/${postId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    }).then(res => {
        this.props.history.push('/');
   
    }).catch(function(err) {
        console.log(err)
    });
   //console.log(this.state.details[0].id)
    }
    render(){
      return (
        <div>
          <br />
           <Link className="btn grey" to="/">Back </Link> 
           {this.state.details.map(post =>     
          <div key={post.id}>
            <div className="collection">
            <li className="collection-item">ID: {post.id}</li>
            <li className="collection-item">title: {post.title}</li>
            <li className="collection-item">Description: {post.description}</li>
            <li className="collection-item">Date: {post.date}
            </li>
            </div>
            <Link className="btn" to={`/posts/edit/${post.id}`}> Edit</Link>
            <button onClick={this.onDelete.bind(this)} className="btn red right">Delete</button>

          </div>
           )}
      </div>
    
    )
  }
}

export default postDetails;