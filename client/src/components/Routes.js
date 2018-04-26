import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Employees from './Employees';
import AddEmployee from './AddEmployee';
import EmployeeDetails from './EmployeeDetails';
import EditEmployee from './EditEmployee';
import About from './About';


const Routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Employees} />
      <Route exact path='/employee/add' component={AddEmployee} />
      <Route exact path='/about' component={About} />
      <Route exact path='/employee/:id' component={EmployeeDetails} />
      <Route exact path='/employee/edit/:id' component={EditEmployee} />
    </Switch>
  </main>
)

export default Routes;