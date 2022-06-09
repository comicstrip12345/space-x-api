import React from 'react';
import './App.css';
import './apps.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from './components/Navbar';
import SearchFunction from './SearchFunction';

const App=()=> {
    return( 
      <>
      <Navbar/>
      <SearchFunction/>
      </>
    );
}

export default App;
