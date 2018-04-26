import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';
import Routes from './components/Routes';
import NavBar from './components/NavBar';
import { Link } from 'react-router-dom';




class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavBar />
          <Routes/>
         
        </div>
      </MuiThemeProvider>
    );
  }
}


export default App;