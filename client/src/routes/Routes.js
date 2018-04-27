import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Employees from '../components/Employees';
import AddEmployee from '../components/AddEmployee';
import EmployeeDetails from '../components/EmployeeDetails';
import EditEmployee from '../components/EditEmployee';
import About from '../components/About';
//authentication
import SignUpPage from '../containers/authentication/SignUpPage';
import LoginPage from '../containers/authentication/LoginPage';

const Routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Employees} />
      <Route exact path='/employee/add' component={AddEmployee} />
      <Route exact path='/about' component={About} />
      <Route exact path='/signup' component={SignUpPage} />
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/employee/:id' component={EmployeeDetails} />
      <Route exact path='/employee/edit/:id' component={EditEmployee} />
    </Switch>
  </main>
)

export default Routes;