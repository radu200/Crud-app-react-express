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
           errors:[],
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
              body: data
          }).then((res) => {  
              
            console.log(res.status)
            if (res.status !== 200) {
                
             return res.json().then((data) => {
             //    console.log('data', data.errors[0].msg)
                const errors = data.errors ? data.errors : {};
                this.setState({
                  errors
                });
             });   
            } else{
            //   this.props.history.push('/')
            //         // change the component-container state
            //         this.setState({
            //           errors: {}
            //         });
                  }   
            
          }).catch((err) => {
              console.log(err)
          })
       
    }


//     fetch('/signup',{
//         method:'POST',
//         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//         body: formData 
//     }).then((res) => {   
//       if (res.status !== 200) {
//        return res.json().then((data) => {
//           const errors = data.errors ? data.errors : {};
//           this.setState({
//             errors
//           });
//        });   
//       }else{
//         this.props.history.push('/')
//               // change the component-container state
//               this.setState({
//                 errors: {}
//               });
//             }   
//        }).catch((err) => {
//         console.log('err',err)
//      })
//   }

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
            type="text"  name="FirstName"  onChange={this.handleInputChange} minLength="1" maxLength="150" 

            /><br />
         <TextField
            hintText=" Last Name"
            floatingLabelText=" Last Name"
            fullWidth={true}
            type="text"  name="LastName"  onChange={this.handleInputChange} minLength="1" maxLength="150" 
            //errorText={this.state.errors[0].msg}

             /><br />

                     <TextField
            hintText="Position"
            floatingLabelText="Position"
            fullWidth={true}
            type="text"  name="Position"  onChange={this.handleInputChange} minLength="1" maxLength="150" 
             /><br />
                     <TextField
            hintText=" Email"
            floatingLabelText="Email"
            fullWidth={true}
            type="email"  name="Email"  onChange={this.handleInputChange} minLength="1" maxLength="150"  
             /><br />
           <TextField
            hintText="Phone Number"
            floatingLabelText="Phone Number"
            fullWidth={true}
            type="tel"  name="Phone"  onChange={this.handleInputChange} minLength="1" maxLength="20"  pattern="^[0-9-+s()]*$"  />
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
