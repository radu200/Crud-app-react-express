
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import  Employees from '../Employees'
import RaisedButton from 'material-ui/RaisedButton';
import  Results from './Results'

class Search extends Component {
 constructor(props){
     super(props)
     this.state = {
       searchText: '',
    
     
     };
     this.onTextChange = this.onTextChange.bind(this)
 }

  onTextChange = (e) => {
    // get input value
    const val = e.target.value;
    this.setState({searchText:val})
  }
  



  render() {
    let filterEmployees = this.props.employee.filter((employee) => {
        return employee.first_name.toLowerCase().indexOf(this.state.searchText.toLowerCase()) !== -1;
       
    })

    return (
      <div className="container">
      <form onSubmit={this.handleSubmitForm}>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search For Employees"
          fullWidth={true}
          />
         </form>
        <h1>Employees</h1>
        <Results results={filterEmployees}/>
        
      </div>
    );
  }
}

export default Search;


