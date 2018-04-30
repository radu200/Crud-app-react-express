import React, { Component } from 'react';
import './Employees.css';
import Search from './search/Search';
import PropTypes from 'prop-types'

export default class Employees extends Component {
  constructor(props) {
    super(props);
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
        <Search  employee={this.state.employees}/>
      </div>

    );
  }
}

