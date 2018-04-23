import React, { Component } from 'react';
import './posts.css';
import { Link } from 'react-router-dom';


class addPosts extends Component {
   constructor(props){
         super(props)
         this.state = {
           title: '',
           description:'',
           msg:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);

    }

   
    handleSubmit(event){
        event.preventDefault()
        const data = {
            title:this.state.title,
            description:this.state.description
        }
          fetch('/posts/add',{
              method:'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(data)
          }).then((res) => {
              if(res.status >= 400){
                throw new Error("Bad response from server");
              }
              return res.json();
          }).then( (data) => {
              if(data ){
                 this.setState({msg:'Posted'})
                 this.props.history.push('/');
                
              }
          }).catch((err) => {
              console.log(err)
          })
       
    }


    handleTitleChange(event){
      this.setState({title:event.target.value})

    }


    handleDescriptionChange(event){
        this.setState({description:event.target.value})

    }
    render(){
        return (
            <form onSubmit={this.handleSubmit} method="POST">
                <div>
                    <br />
                <Link className="btn grey" to="/">Back</Link>
                <h1>Add Post</h1>
                 <p>{this.state.msg}</p>
                    <div className="input-field">
                        <input type="text"  name="title" value={this.state.title} onChange={this.handleTitleChange} />
                        <label htmlFor="name">Title</label>
                    </div>
                    <div className="input-field">
                        <input type="text"  name="description" value={this.state.description} onChange={this.handleDescriptionChange} />
                        <label htmlFor="city">description</label>
                    </div>
                    <input type="submit" value="Save" className="btn" />  
                </div>
          </form>
        
        );
    }

}

export default addPosts;