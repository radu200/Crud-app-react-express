import React, { Component } from 'react';
import './App.css';
import Routes from './components/routes';
import Navbar from './components/NavBar';

import { Link } from 'react-router-dom';


const App = () => (
  <div>
    <Navbar />
    <div className="container">
      <Routes />
    </div>
    <div className="fixed-action-btn">
      <Link to="/posts/add" className="btn-floating btn-large red">
        <i className="fa fa-plus"></i>
      </Link>
    </div>
  </div>
)

export default App;