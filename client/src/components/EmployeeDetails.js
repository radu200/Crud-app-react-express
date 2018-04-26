import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as moment from 'moment'
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';


export default class EmployeeDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      details:[]
    }

    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    let employeeId = this.props.match.params.id;
    fetch(`/employee/${employeeId}`,{
      method:'GET',

    })
      .then(res => res.json())
      .then(data => this.setState({details:data}, () => console.log('employeesdetails fetched...',this.state)))
      .catch(err => {
        console.log(err)
      })
    }
    

    ///delete employee
    onDelete(){
      let employeeId = this.state.details[0].id
      fetch(`/employee/delete/${employeeId}`, {
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
     const date = this.state.details.map((employee )=> {
          console.log('date',employee.date_hired)
          var date = employee.date_hired;
          var newdate =  moment(date ).format('MMMM Do YYYY')
         console.log('momemt',newdate)
         return newdate;
     } );
      return (
        <div className="container">
           <h1>Employee Details</h1>
           <RaisedButton label="Back" containerElement={<Link to="/"/>}/>
           <br/>
           <br/>
           {this.state.details.map(employee => 

            
           <div key={employee.id} >
           <Paper   zDepth={2}>
           <List>
            <ListItem  primaryText='ID'  secondaryText={employee.id}/>
            <Divider/>
            <ListItem primaryText="First Name" secondaryText={employee.first_name} />
            <Divider/>
            <ListItem primaryText="Last Name" secondaryText={employee.last_name}  />
            <Divider/>
            <ListItem primaryText="Position" secondaryText={employee.position} />
            <Divider/>
            <ListItem primaryText="Email"  secondaryText={employee.email} />
            <Divider/>
            <ListItem primaryText="Phone" secondaryText={employee.phone_number} />
            <Divider/>
            <ListItem primaryText="Date Hired" secondaryText={employee.date_hired}/>
           </List>
         </Paper>
              <br/>
              <RaisedButton label="Edit" primary={true} containerElement={<Link to={`/employee/edit/${employee.id}`}/>}/>
              <RaisedButton className="DeleteBtn" label="Delete" secondary={true} onClick={this.onDelete} />
            </div>
            )}
      </div>
    
    )
  }
}

