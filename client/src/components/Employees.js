import React, { Component } from 'react';
import './Employees.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText } from 'material-ui/List';; 
export default class Employees extends Component {
  constructor() {
    super();
    this.state = {
     employees: []
    };
  }

  componentDidMount() {
    fetch('/employees',{
      method:'GET'
    })
      .then(res => res.json())
      .then(employees => this.setState({employees}, () => console.log('employees fetched...', employees)))
      .catch(err => {
        console.log(err)
      })
  }

  render() {
  
    return (
      <div className="container">
        <h1>Employees</h1>
        {this.state.employees.map(employee => 
        <Paper key={employee.id}>
        <ListItem 
        primaryText={employee.first_name}
        secondaryText={employee.position}
        containerElement={<Link to={`/employee/${employee.id}`} />}
         />
       </Paper>
    )}
      
  </div>

    );
  }
}

