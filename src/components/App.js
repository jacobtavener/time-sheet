import React from 'react';

import Header from '../components/Header'
import Timesheet from '../components/Timesheet'

import '../styling/App.css';

function App() {
  return (
    <div className="App">
        <Header />
        <br/>
        <Timesheet />
    </div>
  );
}

export default App;
