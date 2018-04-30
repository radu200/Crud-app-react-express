import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import List, { ListItem, ListItemText } from 'material-ui/List';

const Result = ({results}) => {
  return results.map(employee => 
     <div  key={employee.id}>
      
        <Paper key={employee.id}>
        <ListItem 
        primaryText={`${employee.first_name} ${employee.last_name}`}
        secondaryText={employee.position}
        containerElement={<Link to={`/employee/${employee.id}`} />}
         />
       </Paper>
      
  </div>);

}


export default Result;