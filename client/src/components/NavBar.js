import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import PeopleIcon from 'material-ui/svg-icons/social/people';
import PersonAddIcon from 'material-ui/svg-icons/social/person-add'
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';


class Navbar extends Component{
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false})
 
 
 
  render(){
    return (
      <div>
          <AppBar title="Title"
          onLeftIconButtonClick={this.handleToggle}
          iconElementRight={ 
          <FlatButton label="Add New Employee" containerElement={<Link to="/employee/add"/>} />
           } />
         <Drawer
          docked={false}
          width={250}
          open={this.state.open}
         
          onRequestChange={(open) => this.setState({open})} >
          <ListItem primaryText="Employees" onClick={this.handleClose}  containerElement={<Link to="/" />} leftIcon={<PeopleIcon />} />
          
          <Divider />
          <List>
            <ListItem primaryText="Add Employee"  onClick={this.handleClose}   containerElement={<Link to="/employee/add" />}leftIcon={<PersonAddIcon />}  />
            <ListItem primaryText="About Us" onClick={this.handleClose}   containerElement={<Link to="/about" />} leftIcon={<ContentInbox />} />
            <ListItem primaryText="LogIn" onClick={this.handleClose}   containerElement={<Link to="/login" />} leftIcon={<ContentInbox />} />
            <ListItem primaryText="SignUp" onClick={this.handleClose}   containerElement={<Link to="/signup" />} leftIcon={<ContentInbox />} />
         </List>
        </Drawer>
        </div>
    )
  }
}

export default Navbar;

