import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import * as moment from 'moment'

class postDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
       id:'',
       FirstName:'',
       LastName:'',
       Position:'',
       Email:'',
       Phone:'',
       Date:'',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this)
  }
 ///get information from database  and pass values to state
  componentDidMount() {
    let employeeId = this.props.match.params.id;
    fetch(`/employee/edit/${employeeId}`,{
      method:'GET',
    })
      .then(res => res.json())
      .then((data) => {
          this.setState({
            id:data[0].id,
            FirstName:data[0].first_name,
            LastName:data[0].last_name,
            Position:data[0].position,
            Email:data[0].email,
            Phone:data[0].phone_number,
            Date:data[0].date_hired,

         }, () => console.log('employee details',this.state))
      })

      .catch(err => {
        console.log(err)
      })
    }
    
    //post form to database
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

       fetch(`/employee/edit/${this.state.id}`,{
           method:'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify(data)
       }).then((res) => {
           if(res.status >= 400){
               throw new Error("Bad response from server");
            }else{
              this.props.history.push('/');     
           }
       })
       .catch((err) => {
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
        <div key={this.state.id} className="container">
          <br />
          <h1>Edit Employee Information</h1>
          <form onSubmit={this.handleSubmit} method="POST">
          <div >
              <br /> 
          <RaisedButton label="Back"containerElement={<Link to="/"/>}/>
           <br/>
         <TextField
            hintText=" First Name"
            floatingLabelText=" First Name"
            fullWidth={true}
            type="text"  name="FirstName"  value={this.state.FirstName} onChange={this.handleInputChange} minLength="1" maxLength="150" required="true"
            /><br />
         <TextField
            hintText=" Last Name"
            floatingLabelText=" Last Name"
            fullWidth={true}
            type="text"  name="LastName" value={this.state.LastName}   onChange={this.handleInputChange} minLength="1" maxLength="150" required
             /><br />

                     <TextField
            hintText="Position"
            floatingLabelText="Position"
            fullWidth={true}
            type="text"  name="Position" value={this.state.Position}  onChange={this.handleInputChange} minLength="1" maxLength="150" required
             /><br />
                     <TextField
            hintText=" Email"
            floatingLabelText="Email"
            fullWidth={true}
            type="email"  name="Email" value={this.state.Email}  onChange={this.handleInputChange} minLength="1" maxLength="150"  required
             /><br />
           <TextField
            hintText="Phone Number"
            floatingLabelText="Phone Number"
            fullWidth={true}
            type="tel"  name="Phone" value={this.state.Phone} onChange={this.handleInputChange} minLength="1" maxLength="150" pattern="^[0-9-+s()]*$"  required/>
            <br />
            <br/>
           <DatePicker   hintText="Select  date when employee was hired"
           fullWidth={true} name="Date" onChange={this.handleDateChange}
           
           />
           
           <br/>
           <RaisedButton  label="Save" primary={true}  type="submit"/>
          </div>
        </form>
      </div>
    
    )
  }
}

export default postDetails;