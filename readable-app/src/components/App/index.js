import React from 'react';
import Dashboard from '../Dashboard'
import AppBar from 'material-ui/AppBar'
import AppFooter from '../AppFooter'

function App(props) { 
  return (
    <div className="App">
      <AppBar title="Readable" />
      <Dashboard />
      <AppFooter />
    </div>
  );
}

export default App
