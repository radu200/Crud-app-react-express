import React, { Component } from 'react';
import './Employees';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import * as moment from 'moment'



export default class AddEmployee extends Component {
   constructor(){
         super()
         this.state = {
           FirstName: '',
           LastName:'',
           Position:'',
           Email:'',
           Phone:'',
           Date:'',
           
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this)
    }

   
    handleSubmit(event){
        event.preventDefault()
        const data = {
            FirstName:this.state.FirstName,
            LastName:this.state.LastName,
            Position:this.state.Position,
            Email:this.state.Email,
            Phone:this.state.Phone,
            Date:this.state.Date
       
        }
        
          console.log('state', this.state.Date)
          fetch('/employee/add',{
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
                 this.props.history.push('/');
                
              }
          }).catch((err) => {
              console.log(err)
          })
       
    }


    handleInputChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
    
    
        this.setState({
            [name]:value
        })
       }
   handleDateChange(e, date){
     let formatDate = moment(date ).format('MMMM Do YYYY')
       this.setState({
         Date:formatDate
       })
    }
  
    render(){
    
        return (
        <div className="container">
         <h1>Add Employee</h1>
          <form  onSubmit={this.handleSubmit} method="POST">
         
          <RaisedButton label="Back"   containerElement={<Link to="/"/>}/>
           <br/>
         <TextField
            hintText=" First Name"
            floatingLabelText=" First Name"
            fullWidth={true}
            type="text"  name="FirstName"  onChange={this.handleInputChange} minLength="1" maxLength="150" required="true"
            /><br />
         <TextField
            hintText=" Last Name"
            floatingLabelText=" Last Name"
            fullWidth={true}
            type="text"  name="LastName"  onChange={this.handleInputChange} minLength="1" maxLength="150" required
             /><br />

                     <TextField
            hintText="Position"
            floatingLabelText="Position"
            fullWidth={true}
            type="text"  name="Position"  onChange={this.handleInputChange} minLength="1" maxLength="150" required
             /><br />
                     <TextField
            hintText=" Email"
            floatingLabelText="Email"
            fullWidth={true}
            type="email"  name="Email"  onChange={this.handleInputChange} minLength="1" maxLength="150"  required
             /><br />
           <TextField
            hintText="Phone Number"
            floatingLabelText="Phone Number"
            fullWidth={true}
            type="tel"  name="Phone"  onChange={this.handleInputChange} minLength="1" maxLength="20"  pattern="^[0-9-+s()]*$"  required/>
            <br />
            <br/>
    
           <DatePicker   hintText="Select  date when employee was hired"
           fullWidth={true} name="Date" onChange={this.handleDateChange}
           />
           <br/>
           <RaisedButton  label="Save" primary={true}  type="submit"/>
          </form>
           
        </div>
        
        );
    }    
}
